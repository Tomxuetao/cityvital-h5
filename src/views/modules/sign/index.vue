<script setup>
import { commonGatewayApi } from '@/api/gateway-api'
import CommonTitle from '@/views/common/common-title.vue'
import SignCard from '@/views/modules/sign/comp/sign-card.vue'
import SignTitle from '@/views/modules/sign/comp/sign-title.vue'

import { ref } from 'vue'
import { getImgUrlFn } from '@/utils'

const props = defineProps({
  num: {
    type: String
  }
})

const getImgUrl = getImgUrlFn('../views/modules/sign/img')

const coreSignList = ref([
  {
    title: '水设施河道',
    score: 100,
    icon: getImgUrl('icon-1'),
    records: [
      { title: '一级报警', num: '', alarmLevel: '1', deductScore: '' },
      { title: '二级报警', num: '', alarmLevel: '2', deductScore: '' },
      { title: '三级报警', num: '', alarmLevel: '3', deductScore: '' }
    ]
  },
  {
    title: '固废处置',
    score: 100,
    icon: getImgUrl('icon-2'),
    records: [
      { title: '一级报警', num: '', alarmLevel: '1', deductScore: '' },
      { title: '二级报警', num: '', alarmLevel: '2', deductScore: '' },
      { title: '三级报警', num: '', alarmLevel: '3', deductScore: '' }
    ]
  },
  {
    title: '市容景观',
    score: 100,
    icon: getImgUrl('icon-3'),
    records: [
      { title: '一级报警', num: '', alarmLevel: '1', deductScore: '' },
      { title: '二级报警', num: '', alarmLevel: '2', deductScore: '' },
      { title: '三级报警', num: '', alarmLevel: '3', deductScore: '' }
    ]
  },
  {
    title: '市政设施',
    score: 100,
    icon: getImgUrl('icon-4'),
    records: [
      { title: '一级报警', num: '', alarmLevel: '1', deductScore: '' },
      { title: '二级报警', num: '', alarmLevel: '2', deductScore: '' },
      { title: '三级报警', num: '', alarmLevel: '3', deductScore: '' }
    ]
  },
  {
    title: '城镇燃气',
    score: 100,
    icon: getImgUrl('icon-5'),
    records: [
      { title: '一级报警', num: '', alarmLevel: '1', deductScore: '' },
      { title: '二级报警', num: '', alarmLevel: '2', deductScore: '' },
      { title: '三级报警', num: '', alarmLevel: '3', deductScore: '' }
    ]
  },
  {
    title: '地铁保护区',
    score: 100,
    icon: getImgUrl('icon-6'),
    records: [
      { title: '一级报警', num: '', alarmLevel: '1', deductScore: '' },
      { title: '二级报警', num: '', alarmLevel: '2', deductScore: '' },
      { title: '三级报警', num: '', alarmLevel: '3', deductScore: '' }
    ]
  }
])

const getSignDetailList = async () => {
  const dataList = await commonGatewayApi('22013cbebb', { org_name: '全市' })
  if (Array.isArray(dataList)) {
    coreSignList.value.forEach(signData => {
      const tempList = dataList.filter(item => item.page === signData.title)
      tempList.forEach(temp => {
        signData.score = temp.score < signData.score ? temp.score: signData.score
        const record = signData.records.find(record => record.alarmLevel === temp.alarm_level)
        if (record) {
          Object.assign(record, { num: +temp.total_num, deductScore: +temp.delete_score})
        }
      })
    })
  }
}

getSignDetailList()

const otherSignList = ref([
  {
    title: '安全用电',
    score: 100,
    icon: getImgUrl('icon-7'),
    records: [
      {
        title: '高危及重点用户',
        text: '0个隐患电力用户报警扣0分'
      },
      {
        title: '停电信息',
        text: '0个停电信息扣0分'
      }
    ]
  }
])
</script>

<template>
  <div class="sign-wrap">
    <div class="sign-header">
      <div class="header-inner">
        <div class="inner-num">{{ num }}</div>
        <div class="inner-text">城市体征指数</div>
      </div>
    </div>
    <div class="sign-ctx">
      <div class="ctx-item">
        <common-title text="六大领域"></common-title>
        <div class="ctx-inner">
          <div class="item-ctx" v-for="(item, index) in coreSignList" :key="index">
            <sign-title :item="item"></sign-title>
            <sign-card :list="item.records"></sign-card>
          </div>
        </div>
      </div>
      <div class="ctx-item">
        <common-title text="扩展领域"></common-title>
        <div class="ctx-inner">
          <div class="item-ctx" v-for="(item, index) in otherSignList" :key="index">
            <sign-title :item="item"></sign-title>
            <div class="other-wrap">
              <div class="other-item" v-for="(record, index) in item.records" :key="index">
                <div class="item-label">{{ record.title }}</div>
                <div class="item-text">{{ record.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sign-wrap {
  .sign-header {
    height: 122px;
    width: 375px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("@/views/modules/sign/img/img-sign-bg.webp");

    .header-inner {
      padding: 32px 0 0 20px;

      .inner-num {
        height: 36px;
        font-size: 36px;
        font-weight: Bold;
        color: #0482ff;
        line-height: 36px;
      }

      .inner-text {
        height: 28px;
        font-size: 20px;
        color: #333333;
        line-height: 28px;
      }
    }
  }

  .sign-ctx {
    display: grid;
    grid-gap: 12px 0;
    padding: 0 12px;
    margin-top: -12px;

    .ctx-item {
      border-radius: 12px;
      padding-bottom: 16px;
      background-color: #ffffff;
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.50);

      .ctx-inner {
        display: grid;
        grid-gap: 12px 0;
        padding: 0 12px;

        .item-ctx {
          .other-wrap {
            display: grid;
            grid-gap: 8px 0;
            padding: 6px 16px 0 32px;
            .other-item {
              height: 20px;
              font-size: 12px;
              line-height: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .item-label {
                color: #999999;
              }

              .item-text {
                color: #555555;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
