<script setup>
import { reactive, ref } from 'vue'
import { alarmLevelMap } from '@/config'
import { commonGatewayApi } from '@/api/common-api'

import CommonTitle from '@/views/common/common-title.vue'
import ElectronicscreensProcessCard from '@/views/modules/alarm/comp/electronicscreens-process-card.vue'

const props = defineProps({
  eventId: {
    type: String,
    required: true
  }
})

const processList = ref([])

let detailData = reactive({})

const dataLoading = ref(true)
const alarmTemplateData =[
  {
    key: 'warning_no',
    label: '事件编号：',
    value: '-'
  },
  {
    key: 'warning_desc',
    label: '事件描述：',
    value: '-'
  },
  {
    key: 'alarm_status',
    label: '事件状态：',
    value: '-'
  },
  {
    key: 'warning_time',
    label: '报警时间：',
    value: '-'
  },
  {
    key: 'alarmNum',
    label: '报警次数：',
    value: '-'
  },
  {
    key: 'level',
    label: '报警等级：',
    value: '-'
  },
  {
    key: 'type',
    label: '报警类型：',
    value: '-'
  },
  {
    key: 'address',
    label: '报警地址：',
    value: '-'
  }
]

const getDetailHandler = () => {
  Promise.all([
    commonGatewayApi('244766bc03', { factory_id: props.eventId })
  ])
    .then((dataList) => {
      const [detail] = dataList
      detailData = Object.assign({}, detail[0])
      processList.value = [
        { title: '报警', content: detailData.bjnr },
        { title: '恢复', content: detailData.deal_time }
      ]
      // if (Array.isArray(list)) {
      //   processList.value = list
      // }
      dataLoading.value = false
    })
    .catch(() => {
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
        <common-title :text="detailData.factory_name"></common-title>
        <div class="card-wrap">
          <div class="card-title">基本信息</div>
          <div class="card-inner">
            <div class="inner-item" v-for="item in alarmTemplateData" :key="item.label">
              <div class="item-label">{{ item.label }}：</div>
              <div class="item-text" v-if="item.key === 'level'">
                {{ alarmLevelMap.get(detailData.level - 0) }}
              </div>
              <div class="item-text" v-else>{{ detailData[item.key] }}</div>
            </div>
          </div>
        </div>
        <div class="card-wrap">
          <div class="card-title">处置流程</div>
          <electronicscreens-process-card
            :processLists="processList"
          ></electronicscreens-process-card>
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
