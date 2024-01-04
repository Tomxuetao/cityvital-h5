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
const activeTabIndex = ref(0)
const innerCloums = [
  { label:'使用状态：', value: '' }, 
  { label:'类型：', value: '' }, 
  { label:'所属区域：', value: '' }, 
  { label:'一把闸刀控制状态：', value: '' }, 
  { label:'安装地址：', value: '', width:'100%'}]
      
const tabList = [{ text: '监测信息' }, { text: '报警信息' }, { text: '关联灯杆' }]

/**
 * 获取设施的详情信息
 * @returns {Promise<void>}
 */
const getDetailData = async () => {
  dataLoading.value = true
  commonGatewayApi('20f1be3f1d', { factory_id: props.id })
    .then((dataList) => {
      if (Array.isArray(dataList)) {
        const [data] = dataList
        detailData = Object.assign({}, data || {})
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
      <img
        class="inner-img"
        :src="`/water-img/cv_res/img/zscqj/${name}.jpg`"
        alt=""
        @error.once="() => (hasImg = false)"
      />
      <div class="inner-ctx">
        <div class="ctx-header">
          <common-title :text="name"></common-title>
          <div class="header-tags">
            <div class="tag-item warn-level">报警</div>
            <div class="tag-item status">断电</div>
          </div>
          <div class="header-inner">
            <div class="inner-item" v-for="(item, index) in innerCloums" :key="index">
              <div class="item-label">{{ item.label }}</div>
              <div class="item-text">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="ctx-tabs">
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
            <switchbox-monitor v-if="activeTabIndex === 0" :detail="detailData"></switchbox-monitor>
            <alarm-list v-if="activeTabIndex === 1" :detail="detailData"></alarm-list>
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
        padding-top: 12px;
        align-items: center;
        grid-template-columns: repeat(3, 1fr);

        .tab-item {
          height: 32px;
          color: #666666;
          font-size: 14px;
          line-height: 32px;
          text-align: center;
          border: 0.5px solid #d9d9d9;
          background-color: #ffffff;

          &:nth-child(1) {
            border-right: 0;
            border-radius: 8px 0 0 8px;
          }

          &:nth-child(2) {
            border-left: 0;
            border-radius: 0 0px 0px 0;
          }

          &:nth-child(3) {
            border-left: 0;
            border-radius: 0 8px 8px 0;
          }
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
