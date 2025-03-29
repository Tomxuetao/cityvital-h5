<script setup>
import CommonTitle from '@/views/common/common-title.vue'
import ReserveProcess from '@/views/modules/run-dynamic/comp/reserve-process.vue'
import { reactive, ref } from 'vue'
import { commonBackEndApi } from '@/api/common-api'

const props = defineProps({
  line: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  jobNumber: {
    type: String,
    required: true
  }
})

const imgList = ref([])

const processList = ref([])

let detailData = reactive({})

const dataLoading = ref(true)
const getDetailHandler = () => {
  commonBackEndApi('dailyReport/app/event/operation/eventDetaailInfo', {
    line: props.line,
    searchType: '3',
    item_name: props.itemName,
    jobNumber: props.jobNumber
  }, 'post').then((data) => {
    const tempData = data['保护区报警处理信息（智能识别）']
    if (Array.isArray(tempData)) {
      detailData = Object.assign(detailData, tempData[0] || {})
      imgList.value = detailData.alarmPictureUrl?.split(',').map(item => '/cv_data/api/v1/img/metro?i=' + (item.replaceAll('+', '%2B')))
    }
    processList.value = data['保护区报警处理流程（智能识别）']
    dataLoading.value = false
  }).catch(() => {
    dataLoading.value = false
  })
}

getDetailHandler()
</script>

<template>
  <div class="reserve-detail">
    <van-loading v-if="dataLoading" color="#0094ff" vertical>
      加载中...
    </van-loading>
    <div v-else class="detail-inner">
      <div class="inner-ctx">
        <div class="ctx-wrap">
          <common-title :text="detailData.point_name"></common-title>
          <div class="card-wrap">
            <div class="card-title">基本信息</div>
            <div class="card-inner">
              <div class="inner-item">
                <div class="item-label">告警类别：</div>
                <div class="item-text">{{ detailData.alarm_type }}</div>
              </div>
              <div class="inner-item">
                <div class="item-label">告警设备：</div>
                <div class="item-text">{{ detailData.point_name }}</div>
              </div>
              <div class="inner-item">
                <div class="item-label">告警时间：</div>
                <div class="item-text">{{ detailData.create_time }}</div>
              </div>
              <div class="inner-item">
                <div class="item-label">所属城区：</div>
                <div class="item-text">{{ detailData.district_name }}</div>
              </div>
              <div class="inner-item">
                <div class="item-label">机械类型：</div>
                <div class="item-text">{{ detailData.item_name }}</div>
              </div>
              <div class="inner-item">
                <div class="item-label">所在线路：</div>
                <div class="item-text">{{ detailData.line }}</div>
              </div>
            </div>
          </div>
          <div class="card-wrap">
            <div class="card-title">操作记录</div>
            <reserve-process :list="processList"></reserve-process>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reserve-detail {

  .detail-inner {

    .inner-header {
      height: 168px;

      :deep(.van-swipe) {
        height: 168px;

        .img-item {
          object-fit: cover;
        }
      }
    }

    .inner-ctx {
      padding: 12px 12px 0 12px;

      .ctx-wrap {
        border-radius: 12px;
        background-color: #ffffff;
        min-height: calc(100vh - 28px);
        box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

        .card-wrap {
          padding: 0 16px;
          position: relative;
          margin-bottom: 12px;

          .card-title {
            height: 22px;
            font-size: 14px;
            color: #0482ff;
            line-height: 22px;
            margin-bottom: 8px;
          }

          .card-inner {
            display: grid;
            grid-gap: 8px 0;
            padding-bottom: 12px;
            flex-direction: column;

            .inner-item {
              display: flex;

              .item-label {
                height: 22px;
                font-size: 14px;
                color: #666666;
                line-height: 22px;
                white-space: nowrap;
              }

              .item-text {
                font-size: 14px;
                color: #666666;
                line-height: 22px;
              }
            }
          }

          &:nth-child(2n) {
            &:after {
              position: absolute;
              content: "";
              bottom: 0;
              height: 0.5px;
              width: calc(100% - 32px);
              background-color: #eeeeee;
            }
          }
        }
      }
    }
  }
}
</style>
