<script setup>
import CommonTab from '@/views/common/common-tab.vue'
import CommonTitle from '@/views/common/common-title.vue'
import IndexCard from '@/views/modules/home/comp/index-card.vue'

import { ref } from 'vue'
import { getImgUrlFn } from '@/utils'
import { useRouter } from 'vue-router'

import { getSignNumApi } from '@/api/home-api'
import { commonGatewayApi } from '@/api/gateway-api'

const getImgUrl = getImgUrlFn('../views/modules/home/img')

const signIndexList = ref([
  { text: '关键设施', num: '0', routeName: '', unit: '个', icon: getImgUrl('icon-1') },
  { text: '运行指标', num: '36', routeName: 'run-index', unit: '个', icon: getImgUrl('icon-2') },
  { text: '当前报警', num: '0', routeName: 'alarm', unit: '个', icon: getImgUrl('icon-3') }
])

const getSignDataHandler = () => {
  Promise.all([
    // 关键设施
    commonGatewayApi('218b575c65', { mod_code: 'P01-T01', class_code: 'P01-T01-000' }),
    // 运行指标
    // commonGatewayApi('218b575c65', { mod_code: 'P01-T02', class_code: 'P01-T02-000' }),
    // 今日报警
    commonGatewayApi('2264e44971')]
  ).then(([data1List, data3List]) => {
    if (Array.isArray(data1List)) {
      const [data] = data1List
      const { NUM: num } = data || {}
      signIndexList.value[0].num = num
    }
    // if (Array.isArray(data2List)) {
    //   const [data] = data2List
    //   const { NUM: num } = data || {}
    //   signIndexList.value[1].num = 36
    // }
    if (Array.isArray(data3List)) {
      const [data] = data3List
      const { today_all } = data || {}
      signIndexList.value[2].num = today_all
    }
  })
}
getSignDataHandler()

const coreIndexList = ref([
  {
    text: '水设施河道',
    alias: '水设施河道',
    alarmNum: 0,
    iconName: 'icon-4',
    list: [
      { text: '供水总量', code: 'wscll_num', num: '', unit: '' },
      { text: '污水处理量', code: 'gszl_num', num: '', unit: '' }
    ]
  },
  {
    text: '固废处置',
    alias: '固废处置',
    alarmNum: 0,
    iconName: 'icon-5',
    list: [
      { text: '垃圾处理量', code: 'ljcll_num', num: '', unit: '' },
      { text: '渣土消纳量', code: 'gcljzt_alarm_num', num: '', unit: '' }
    ]
  },
  {
    text: '市容景观',
    alias: '市容景观',
    alarmNum: 0,
    iconName: 'icon-6',
    list: [
      { text: '昨日道路亮灯率', code: 'sgldldl_num', num: '', unit: '' },
      { text: '电子屏接入率', code: 'dzpjrl_num', num: '', unit: '' }
    ]
  },
  {
    text: '市政设施',
    alias: '市政设施',
    alarmNum: 0,
    iconName: 'icon-7',
    list: [
      { text: '平路指数', code: 'pjzs_num', num: '', unit: '' },
      { text: '地下隐患闭环处置率', code: 'dxyh_rate', num: '', unit: '' }
    ]
  },
  {
    text: '城镇燃气',
    alias: '城镇燃气',
    alarmNum: 0,
    iconName: 'icon-9',
    list: [
      { text: '管道燃气销售量', code: null, num: '', unit: '' },
      { text: '红码气瓶量', code: 'pzrqlzxx_alarm_num2', num: '31152', unit: '个' }
    ]
  },
  {
    text: '地铁保护区',
    alias: '地铁运营期保护区',
    alarmNum: 0,
    iconName: 'icon-8',
    list: [
      { text: '地铁作业项目', code: 'sgdw_num', num: '', unit: '' },
      { text: '违规作业数', code: 'dtbhq_alarm_num', num: '', unit: '' }
    ]
  }
])

const otherIndexList = ref([
  {
    text: '用电安全',
    alarmNum: 0,
    iconName: 'icon-10',
    list: [
      { text: '高危及重点用户', num: '658', unit: '个' },
      { text: '用电量', num: '658', unit: '个' }
    ]
  },
  {
    text: '十大关键变量',
    alarmNum: 0,
    iconName: 'icon-11',
    list: [
      { text: '已监控地铁出口', num: '658', unit: '个' },
      { text: '地铁运行情况', num: '658', unit: '个' }
    ]
  }
])

const signNum = ref(0)
/**
 * 获取城市体征指数数值
 * @returns {Promise<void>}
 */
const getSignNum = async () => {
  const data = await getSignNumApi({ org_name: '全市' })
  signNum.value = data || 0
}
getSignNum()

/**
 * 获取核心指标（六大领域）
 * @returns {Promise<void>}
 */
const getCoreIndex = async () => {
  const dataList = await commonGatewayApi('2180e0fc83', { org_name: '全市' })
  if (Array.isArray(dataList)) {
    coreIndexList.value.forEach(item => {
      const tempList = dataList.filter(temp => temp.sys_code === item.alias && temp.para_value !== '异常')
      if (tempList) {
        item.list.forEach(data => {
          const tempData = tempList.find(temp => data.code === temp.para_code)
          if (tempData) {
            const { para_value: value, unit } = tempData || {}
            data = Object.assign(data, { unit: unit, num: value.includes('.') ? Number(value).toFixed(2) : value })
          }
        })
      }
    })
  }
}

getCoreIndex()

const router = useRouter()

const gotoOther = (routeName, num) => {
  if (routeName) {
    router.push({
      name: routeName,
      query: num !== '0' ? { num: num } : {}
    })
  }
}
</script>

<template>
  <div class="home-wrap">
    <div class="header-wrap">
      <div class="home-header"></div>
      <common-tab></common-tab>
    </div>
    <div class="ctx-wrap">
      <div class="ctx-item">
        <div class="sign-wrap">
          <div class="sign-header">
            <div class="header-img" @click="gotoOther('sign', signNum)">
              <div class="sign-text">城市体征指数 {{ signNum }}</div>
            </div>
          </div>
          <div class="sign-inner">
            <div
              class="side-item"
              v-for="(item, index) in signIndexList"
              :key="index"
              @click="gotoOther(item.routeName, item.num)"
            >
              <div class="item-header">
                <img class="header-icon" :src="item.icon" alt=""/>
                <div class="header-text">{{ item.text }}</div>
              </div>
              <div class="item-num">
                <div class="num-text">{{ item.num }}</div>
                <div class="num-unit">{{ item.unit }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ctx-item">
        <common-title text="城市生命体征 - 六大领域城市生命体征"></common-title>
        <div class="core-wrap">
          <index-card
            v-for="(item, index) in coreIndexList"
            :item-data="item"
            :key="index"
          >
          </index-card>
        </div>
      </div>
      <div class="ctx-item">
        <common-title text="城市生命体征 - 扩展领域"></common-title>
        <div class="other-wrap">
          <index-card
            v-for="(item, index) in otherIndexList"
            :item-data="item"
            :key="index"
          >
          </index-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-wrap {

  .header-wrap {
    .home-header {
      height: 85px;
      width: 375px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url("@/views/modules/home/img/img-home-bg.webp");
    }
  }

  .ctx-wrap {
    display: grid;
    grid-gap: 12px 0;
    padding: 12px 12px 0 12px;

    .ctx-item {
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.50);

      .sign-wrap {
        padding-bottom: 16px;

        .sign-header {
          height: 124px;
          line-height: 100px;
          padding: 12px 16px;
          text-align: center;

          .header-img {
            display: flex;
            align-items: center;
            height: 100px;
            width: 319px;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url("@/views/modules/home/img/img-sign-1.webp");

            .sign-text {
              flex: 1;
              height: 28px;
              color: #ffffff;
              font-size: 20px;
              line-height: 28px;
              margin-left: 58px;
              text-shadow: 0 2px 6px 0 rgba(0, 50, 36, 0.24);
            }
          }
        }

        .sign-inner {
          display: grid;
          padding: 0 16px;
          grid-template-columns: repeat(3, 1fr);

          .side-item {
            .item-header {
              height: 22px;
              line-height: 22px;
              display: flex;
              align-items: center;
              justify-content: center;

              .header-icon {
                height: 16px;
                width: 16px;
                margin-left: 2px;
                object-fit: cover;
              }

              .header-text {
                margin-left: 6px;
                font-size: 14px;
                color: #666666;
              }
            }

            .item-num {
              margin-top: 2px;
              display: flex;
              align-items: flex-end;
              justify-content: center;

              .num-text {
                height: 32px;
                font-size: 24px;
                color: #333333;
                line-height: 32px;
                font-family: Alternate-Bold;
              }

              .num-unit {
                height: 20px;
                font-size: 12px;
                color: #666666;
                margin-left: 2px;
              }
            }
          }
        }
      }

      .core-wrap {
        display: grid;
        grid-gap: 12px;
        padding: 0 16px;
        margin-bottom: 16px;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(2, 1fr);
      }

      .other-wrap {
        display: grid;
        grid-gap: 12px;
        padding: 0 16px 16px 16px;
        grid-template-rows: repeat(1, 1fr);
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}
</style>
