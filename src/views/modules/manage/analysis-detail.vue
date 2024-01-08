<script setup>
import CommonList from '@/views/common/common-list.vue'
import RelatedCard from '@/views/modules/manage/comp/related-card.vue'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { commonGatewayApi } from '@/api/common-api'
import { createInstance, createMarker } from '@/utils/amap-util'

import CommonTitle from '@/views/common/common-title.vue'
import markerImg from '@/views/modules/manage/img/img-marker.webp'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  index: {
    type: String,
    required: true
  }
})

let mapInstance

let data = reactive({})
const dataLoading = ref(true)

/**
 * 获取详情信息
 */
const getDataDetail = () => {
  dataLoading.value = true
  commonGatewayApi('212a8a32cf', { analyze_event_id: props.id })
    .then(dataList => {
      if (Array.isArray(dataList)) {
        data = Object.assign(data, dataList[0] || {})
        if (data.latitude && data.longitude) {
          mapInstance.add(createMarker({
            extData: data,
            image: markerImg,
            position: [data.longitude, data.latitude]
          }))
          mapInstance.setCenter([data.longitude, data.latitude])
        }
      }
    })
    .finally(() => {
      dataLoading.value = false
    })
}

const commonListConfig = {
  code: '212a885708',
  isIndexServer: true,
  customForm: {
    analyze_event_id: props.id
  }
}

onMounted(() => {
  nextTick(async () => {
    mapInstance = await createInstance('container', true)
    getDataDetail()
  })
})
</script>

<template>
  <div class="analysis-detail">
    <div class="detail-inner">
      <div id="container" class="inner-map"></div>
      <van-loading v-if="dataLoading" color="#0094ff" vertical>
        加载中...
      </van-loading>
      <div v-else class="inner-ctx">
        <div class="detail-card">
          <common-title :text="data.class_value_2 || data.analyze_title "></common-title>
          <div class="card-inner">
            <div class="inner-tags">
              <div class="tag-item item-1" v-if="data.data_source || data.analyze_title">
                {{ data.data_source || data.analyze_title }}
              </div>
              <div class="tag-item item-2" v-if="data.data_source">{{ data.data_source }}</div>
              <div class="tag-item item-3">{{ data.event_status }}</div>
            </div>
            <div class="card-ctx">
              <div class="ctx-item">
                <div class="item-label">研判时间：</div>
                <div class="item-text">{{ data.gmt_create }}</div>
              </div>
              <template v-if="index === '0'">
                <div class="ctx-item">
                  <div class="item-label">{{ data.class_key_1 }}：</div>
                  <div class="item-text">{{ data.class_value_1 }}</div>
                </div>
                <div class="ctx-item">
                  <div class="item-label">事件详情：</div>
                  <div class="item-text">{{ data.analyze_content }}</div>
                </div>
              </template>
              <template v-if="index === '1'">
                <div class="ctx-item">
                  <div class="item-label">出土次数：</div>
                  <div class="item-text">{{ data.rec_count }}</div>
                </div>
                <div class="ctx-item">
                  <div class="item-label">出土工地：</div>
                  <div class="item-text">{{ data.addr }}</div>
                </div>
              </template>
              <template v-if="index === '2'">

              </template>
            </div>
          </div>
        </div>
        <div class="related-wrap">
          <common-title text="关联事件"></common-title>
          <div class="related-list">
            <common-list :config="commonListConfig">
              <template #card-item="{data}">
                <related-card :data="data" :index="index"></related-card>
              </template>
            </common-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.analysis-detail {
  .detail-inner {
    .inner-map {
      height: 186px;
    }

    .inner-ctx {
      padding: 0 12px;
      margin-top: -12px;

      .detail-card {
        position: relative;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.50);

        .card-inner {
          padding: 0 16px 16px 16px;

          .inner-tags {
            display: grid;
            grid-gap: 0 8px;
            padding: 4px 0 8px 0;
            grid-template-columns: repeat(3, max-content);

            .tag-item {
              padding: 0 8px;
              height: 24px;
              font-size: 12px;
              color: #333333;
              text-align: center;
              line-height: 24px;
              border-radius: 4px;
            }

            .item-1 {
              color: #ffffff;
              background-color: #0482FF;
            }

            .item-2 {
              background-color: rgba(4, 130, 255, 0.08);
            }

            .item-3 {
              background-color: rgba(255, 81, 103, 0.08);
            }
          }

          .card-ctx {
            display: grid;
            grid-gap: 8px 0;

            .ctx-item {
              display: flex;
              line-height: 22px;
              align-items: flex-start;

              .item-label {
                font-size: 14px;
                color: #666666;
                white-space: nowrap;
              }

              .item-text {
                font-size: 14px;
                color: #666666;
                @include ellipsis(2);
              }
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

      .related-wrap {
        margin-top: 12px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.50);

        .related-list {
          position: relative;
          padding: 4px 12px;
          min-height: calc(100vh - 470px);
        }
      }
    }
  }
}
</style>
