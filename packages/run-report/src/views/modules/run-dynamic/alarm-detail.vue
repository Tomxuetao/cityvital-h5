<script setup>
import { reactive, ref } from 'vue'
import { commonBackEndApi } from '@/api/common-api'
import { alarmLevelMap, dealStatusMap } from '@/config'

import CommonTitle from '@/views/common/common-title.vue'
import ProcessCard from '@/views/modules/run-dynamic/comp/process-card.vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    required: true
  }
})

const processList = ref([])

let detailData = reactive({})

const dataLoading = ref(true)

const getDetailHandler = () => {
  commonBackEndApi('dailyReport/app/event/operation/eventDetaailInfo', {
    searchType: props.type,
    eventId: props.eventId
  }, 'post').then((data) => {
    detailData = Object.assign(detailData, data['事件信息'] || {})
    const tempList = data['流程信息'] || []
    processList.value = tempList.map(item => {
      const { handleProcedure, OPERATOR: operator } = item
      const extraList = JSON.parse(item.extraList || '[]')
      const extraMap = {}
      extraList.forEach(({ field, value }) => {
        extraMap[field] = value
      })
      Object.assign(item, { extraList: extraList, operator: operator, procedure: handleProcedure, extraMap: extraMap })

      return item
    })
    dataLoading.value = false
  }).catch(() => {
    dataLoading.value = false
  })
}

getDetailHandler()
</script>

<template>
  <div class="alarm-detail">
    <div class="detail-inner">
      <van-loading v-if="dataLoading" color="#0094ff" vertical>
        加载中...
      </van-loading>
      <template v-else>
        <common-title :text="detailData?.TITLE.replace('报警', '告警')"></common-title>
        <div class="card-wrap">
          <div class="card-title">基本信息</div>
          <div class="card-inner">
            <div class="inner-item">
              <div class="item-label">事件编号：</div>
              <div class="item-text">{{ detailData.eventId }}</div>
            </div>
            <div class="inner-item">
              <div class="item-label">事件状态：</div>
              <div class="item-text">
                {{ dealStatusMap.get(detailData.handleType) }}
              </div>
            </div>
            <div class="inner-item">
              <div class="item-label">生成时间：</div>
              <div class="item-text">{{ detailData.latestCheckTime }}</div>
            </div>
            <div class="inner-item">
              <div class="item-label">告警等级：</div>
              <div class="item-text">
                {{ alarmLevelMap.get(detailData.emergencyDegree) }}
              </div>
            </div>
            <div class="inner-item">
              <div class="item-label">事件描述：</div>
              <div class="item-text">{{ detailData.CONTENT }}</div>
            </div>
          </div>
        </div>
        <div class="card-wrap">
          <div class="card-title">处置流程</div>
          <process-card
            :list="processList"
            :emergency-degree="detailData.emergencyDegree"
          >
          </process-card>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.alarm-detail {
  padding: 12px 12px 0 12px;

  .detail-inner {
    border-radius: 12px;
    background-color: #ffffff;
    min-height: calc(100vh - 28px);
    box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

    .card-wrap {
      position: relative;
      margin-bottom: 12px;
      padding: 0 16px 12px 16px;

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
          width: calc(100% - 32px);
          bottom: 0;
          height: 0.5px;
          background-color: #eeeeee;
        }
      }
    }
  }
}
</style>
