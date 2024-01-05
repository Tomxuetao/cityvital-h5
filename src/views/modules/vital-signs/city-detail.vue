<script setup>
import { reactive, ref } from 'vue'
import { commonGatewayApi } from '@/api/common-api'

import CommonTitle from '@/views/common/common-title.vue'
import AlarmList from '@/views/modules/vital-signs/comp/alarm-list.vue'
import SwitchboxMonitor from '@/views/modules/vital-signs/comp/switchbox-monitor.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  originType: {
    type: String,
    required: true
  },
  secondType: {
    type: String,
    required: true
  }
})
// 初始化data
const hasImg = ref(true)
const dataLoading = ref(true)
let detailData = reactive({})
let images = ref([])
let tabList = ref([])
const activeTabIndex = ref(0)
let innerCloums = []

const setInnerCloums = (item) => {
  if(props.secondType === '开关箱') {
    innerCloums = [
      { label:'使用状态：', value: item?.box_status }, 
      { label:'类型：', value: item.remark }, 
      { label:'所属区域：', value: item.district_name }, 
      { label:'一把闸刀控制状态：', value: item.is_knife }, 
      { label:'安装地址：', value: item.address, width:'100%'}
    ]
    hasImg 
  }
  if(props.secondType === '户外广告') {
    innerCloums = [
      { label:'广告面积：', value: item.area }, 
      { label:'广告性质：', value: item.ggxz }, 
      { label:'广告形式：', value: item.is_knife }, 
      { label:'审批日期：', value: item.sprq }, 
      { label:'安全检测有效期：', value: item.setup_time, width:'100%'},
      { label:'安全检测报告：', value: item.is_on, width:'100%'},
      { label:'地址：', value: item.address, width:'100%'},
      { label:'设置单位：', value: item.szdw, width:'100%'},
      { label:'联系人：', value: item.contacts },
      { label:'联系电话：', value: item.phone }
    ]
  }
  if(props.secondType === '户外电子屏') {
    innerCloums = [
      { label:'大屏面积：', value: item.area }, 
      { label:'广告厂商：', value: item.dept }, 
      { label:'所属区划：', value: item.district_name }, 
      { label:'地址：', value: item.address, width:'100%'}
    ]
  }
}
const setTabLists = () => {
  switch(props.secondType) {
    case '开关箱': tabList.value = [{ text: '监测信息' }, { text: '报警信息' }, { text: '关联灯杆' }];break
    case '户外广告': tabList.value = [ { text: '报警信息' }, { text: '处置信息' } ];break
    case '户外广告': tabList.value = [{ text: '监测信息' }, { text: '报警信息' }];break
  }
  if(props.secondType === '开关箱') {
    innerCloums = [
      { label:'使用状态：', value: '' }, 
      { label:'类型：', value: '' }, 
      { label:'所属区域：', value: '' }, 
      { label:'一把闸刀控制状态：', value: '' }, 
      { label:'安装地址：', value: '', width:'100%'}
    ]
  }
}
     
setTabLists()
/**
 * 获取设施的详情信息
 * @returns {Promise<void>}
 */
const getDetailData = async () => {
  dataLoading.value = true
  commonGatewayApi('21f3d137dd', { factory_id: props.id })
    .then((dataList) => {
      if (Array.isArray(dataList)) {
        const [data] = dataList
        detailData = Object.assign({}, data || {})
        let PIC_URLS = ''
        try {
          PIC_URLS = detailData.PIC_URL
          ? JSON.parse(detailData.PIC_URL)
          : []
        }catch {
          PIC_URLS = detailData.PIC_URL ? [detailData.PIC_URL] : []
        }
        images.value = PIC_URLS.map(img => {
          return 'https://ywtg.citybrain.hangzhou.gov.cn/cv_data/api/v1/img/cityAppearance?path=' + img.replaceAll('http://172.18.6.65:8090/pic', '') + '&accessToken=' + sessionStorage.getItem('accessToken')
        })
        setInnerCloums(dataList[0])
      }
    })
    .finally(() => {
      dataLoading.value = false
    })
}
const changeTabHandler = (index) => {
  if (activeTabIndex.value !== index) {
    activeTabIndex.value = index
  }
}
getDetailData()

</script>

<template>
  <div class="switchbox-detail">
    <div :class="['detail-inner', hasImg ? 'has-img' : '']">
      <img class="inner-img"
        :src="images[0]"
        alt=""
      />
      <!-- <van-swipe class="inner-img" :autoplay="3000">
        <van-swipe-item v-for="image in images" :key="image">
          1
        </van-swipe-item>
      </van-swipe> -->
      <div class="inner-ctx">
        <div class="ctx-header">
          <common-title :text="name"></common-title>
          <div class="header-tags" v-if="secondType==='开关箱'">
            <div class="tag-item warn-level">报警</div>
            <div class="tag-item status">断电</div>
          </div>
          <div class="header-inner">
            <div class="inner-item" v-for="(item, index) in innerCloums" :key="index" :style="{'width': item.width || '' }">
              <div class="item-label">{{ item.label }}</div>
              <div class="item-text">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="ctx-tabs" :style="`grid-template-columns: repeat(${tabList.length}, 1fr);`">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="['tab-item', activeTabIndex === index ? 'tab-active' : '']"
            @click="changeTabHandler(index)"
          >
            {{ item.text }}
          </div>
        </div>
        <div class="ctx-cxt">
          <van-loading v-if="dataLoading" color="#0094ff" vertical>
            加载中...
          </van-loading>
          <template v-else>
            <switchbox-monitor v-if="secondType==='开关箱' && activeTabIndex===0" :detail="detailData"></switchbox-monitor>
            <alarm-list v-if="tabList[activeTabIndex]?.text === '报警信息'" :detail="detailData"></alarm-list>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.switchbox-detail {
  min-height: calc(100vh - 18px);

  .detail-inner {
    .inner-ctx {
      padding: 12px 12px 0 12px;

      .ctx-header {
        position: relative;
        min-height: 114px;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);
        padding-bottom: 10px;
        .header-tags {
          width: 100%;
          display: flex;
          padding: 0 16px;
          margin-bottom: 8px;
          .tag-item {
            width: 40px;
            height: 24px;
            background: #999999;
            border-radius: 4px;
            text-align: center;
            line-height: 24px;
            margin-right: 8px;
          }
        }

        .header-inner {
          padding: 0 16px;
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .inner-item {
            width: 50%;
            display: flex;
            height: 22px;
            align-items: center;
            line-height: 22px;
            color: #666666;
            margin-bottom: 8px;

            .item-text {
              flex: 1;
              @include ellipsis(1);
            }
          }
        }

        &:before {
          position: absolute;
          top: 12px;
          right: 4px;
          height: 96px;
          width: 105px;
          content: "";
          background-size: cover;
          background-repeat: no-repeat;
          background-image: url("@/views/modules/vital-signs/img/img-title-bg.webp");
        }
      }

      .ctx-tabs {
        display: grid;
        margin-top: 12px;
        align-items: center;
        border-radius: 8px;
        overflow: hidden;
        .tab-item {
          height: 32px;
          color: #666666;
          font-size: 14px;
          line-height: 32px;
          text-align: center;
          border: 0.5px solid #d9d9d9;
          background-color: #ffffff;
        }

        .tab-active {
          color: #ffffff;
          background-color: #0482ff;
          border: 0.5px solid transparent;
        }
      }

      .ctx-cxt {
        margin-top: 12px;
        border-radius: 12px;
        background-color: #ffffff;
        min-height: calc(100vh - 198px);
        box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);
      }
    }
  }

  .has-img {
    .inner-img {
      width: 375px;
      height: 186px;
      object-fit: cover;
    }

    .inner-ctx {
      padding: 0 12px;
      margin-top: -12px;
    }
  }
}
</style>
