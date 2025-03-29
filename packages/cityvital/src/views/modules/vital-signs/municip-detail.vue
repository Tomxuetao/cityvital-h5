<script setup>
import { reactive, ref } from 'vue'
import { commonGatewayApi } from '@/api/common-api'
import CommonTitle from '../../common/common-title.vue'
import AlarmList from './comp/alarm-list.vue'
import MunicipMonitor from './comp/municip-monitor.vue'

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

const hasImg = ref(false)

/**
 * 获取设施的详情信息
 * @returns {Promise<void>}
 */
const dataLoading = ref(true)
let detailData = reactive({})
const getDetailData = () => {
  dataLoading.value = true
  commonGatewayApi('21447146b7', { factory_id: props.id })
    .then((dataList) => {
      if (Array.isArray(dataList)) {
        const [data] = dataList
        detailData = Object.assign({}, data || {})
        if (detailData.pic_url) {
          hasImg.value = true
        }
      }
    })
    .finally(() => {
      dataLoading.value = false
    })
}
getDetailData()

const tabList = [{ text: '监测信息' }, { text: '报警信息' }]

const activeTabIndex = ref(0)

const changeTabHandler = (index) => {
  if (activeTabIndex.value !== index) {
    activeTabIndex.value = index
  }
}
</script>

<template>
  <div class="road-detail">
    <van-loading v-if="dataLoading" color="#0094ff" vertical>
      加载中...
    </van-loading>
    <div v-else :class="['detail-inner', hasImg ? 'has-img' : '']">
      <img
        v-if="hasImg"
        class="inner-img"
        :src="detailData.pic_url"
        alt=""
        @error.once="() => (hasImg = false)"
      />
      <div class="inner-ctx">
        <div class="ctx-header">
          <common-title :text="name"></common-title>
          <div class="header-inner">
            <div class="inner-item">
              <div class="item-label">负责人：</div>
              <div class="item-text">{{ detailData.contacts }}</div>
            </div>
            <div class="inner-item">
              <div class="item-label">所属城区：</div>
              <div class="item-text">{{ detailData.address }}</div>
            </div>
            <div class="inner-item">
              <div class="item-label">联系方式：</div>
              <div class="item-text">{{ detailData.phone }}</div>
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
          <municip-monitor
            v-if="activeTabIndex === 0"
            :detail="detailData"
            :second-type="secondType"
          >
          </municip-monitor>
          <alarm-list v-if="activeTabIndex === 1" :detail="detailData"></alarm-list>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.road-detail {
  min-height: calc(100vh - 18px);

  .detail-inner {
    .inner-ctx {
      padding: 12px 12px 0 12px;

      .ctx-header {
        position: relative;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

        .header-inner {
          display: grid;
          padding: 0 16px;
          grid-gap: 8px 0;
          grid-template-columns: repeat(2, 1fr);

          .inner-item {
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
          background-image: url("img/img-title-bg.webp");
        }
      }

      .ctx-tabs {
        display: grid;
        padding-top: 12px;
        align-items: center;
        grid-template-columns: repeat(2, 1fr);

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
