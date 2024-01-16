<script setup>
import { commonGatewayApi } from '@/api/common-api'
import CommonTitle from '@/views/common/common-title.vue'
import { reactive, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})


let detailData = reactive({})
const getDetailData = async () => {
  const dataList = await commonGatewayApi('21b6592e46', { projectName: props.name })

  if (Array.isArray(dataList)) {
    const [data] = dataList
    detailData = Object.assign(detailData, data || {})
  }
}

getDetailData()

const headerList = [
  { text: '监测项' },
  { text: '单次变化量最大值' },
  { text: '累计变化量最大值' },
  { text: '预警等级' }
]
const dataList = ref([])

const getDataList = async () => {
  const tempDataList = await commonGatewayApi('21b98197ba', { projectName: props.name })

  dataList.value = tempDataList || []
}

getDataList()
</script>

<template>
  <div class="item-monitor">
    <common-title text="监测信息"></common-title>
    <div class="monitor-detail">
      <div class="header-inner">
        <div class="inner-item">
          <div class="item-label">更新时间：</div>
          <div class="item-text">{{ detailData.monitor_time }}</div>
        </div>
        <div class="inner-item">
          <div class="item-label">更新频率：</div>
          <div class="item-text">{{ detailData.update_frequence }}</div>
        </div>
        <div class="inner-item">
          <div class="item-label">监测次数：</div>
          <div class="item-text">{{ detailData.MonitorTime }}</div>
        </div>
      </div>
      <div class="alarm-wrap">
        <div class="alarm-item alarm-1">
          <div class="item-text">红色报警数</div>
          <div class="item-num">
            <div class="num-text">{{ detailData.overshoot_num }}</div>
            <div class="num-unit">个</div>
          </div>
        </div>
        <div class="alarm-item alarm-2">
          <div class="item-text">橙色报警数</div>
          <div class="item-num">
            <div class="num-text">{{ detailData.alarms_num }}</div>
            <div class="num-unit">个</div>
          </div>
        </div>
        <div class="alarm-item alarm-3">
          <div class="item-text">黄色报警数</div>
          <div class="item-num">
            <div class="num-text">{{ detailData.warning_num }}</div>
            <div class="num-unit">个</div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <van-grid :column-num="4">
        <van-grid-item v-for="(item, i) in headerList" :key="i">
          <div class="item-label">{{ item.text }}</div>
        </van-grid-item>
        <template v-for="(item, index) in dataList" :key="index">
          <van-grid-item>
            <div class="item-text">{{ item.item_name }}</div>
          </van-grid-item>
          <van-grid-item>
            <div class="item-text">{{ item.max_current_variance }}</div>
          </van-grid-item>
          <van-grid-item>
            <div class="item-text">{{ item.max_total_variance }}</div>
          </van-grid-item>
          <van-grid-item>
            <div :class="['item-status', 'status-' + item.status_new]">{{ item.status }}</div>
          </van-grid-item>
        </template>
      </van-grid>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-monitor {
  .monitor-detail {
    padding: 0 16px;

    .header-inner {
      display: grid;
      grid-gap: 8px 4px;
      grid-template-columns: repeat(2, 1fr);

      .inner-item {
        display: flex;
        height: 22px;
        color: #666666;
        line-height: 22px;
        align-items: center;

        .item-text {
          flex: 1;
          @include ellipsis(1);
        }
      }
    }

    .alarm-wrap {
      display: grid;
      grid-gap: 0 8px;
      margin: 14px 0;
      grid-template-columns: repeat(3, 1fr);

      .alarm-item {
        height: 74px;
        padding: 10px 0;
        border-radius: 2px;

        .item-text {
          height: 20px;
          font-size: 14px;
          text-align: center;
          color: #666666;
          line-height: 20px;
        }

        .item-num {
          margin-top: 2px;
          display: flex;
          align-items: flex-end;
          justify-content: center;

          .num-text {
            height: 32px;
            font-size: 24px;
            line-height: 32px;
            font-family: Alternate-Bold;
          }

          .num-unit {
            height: 20px;
            font-size: 12px;
            margin-left: 2px;
          }
        }
      }

      .alarm-1 {
        background-image: linear-gradient(180deg, rgba(255, 17, 0, 0.3), rgba(255, 17, 0, 0) 100%);

        .item-num {
          color: rgba(255, 81, 103, 1);
        }
      }

      .alarm-2 {
        background-image: linear-gradient(180deg, rgba(255, 122, 34, 0.3), rgba(255, 122, 34, 0) 100%);

        .item-num {
          color: rgba(255, 125, 62, 1);
        }
      }

      .alarm-3 {
        background-image: linear-gradient(180deg, rgba(255, 178, 81, 0.3), rgba(255, 178, 81, 0) 100%);

        .item-num {
          color: rgba(255, 178, 81, 1);
        }
      }
    }
  }

  .table-wrap {
    padding: 4px 16px;

    .item-text {
      font-size: 14px;
      color: #666666;
      line-height: 18px;
      text-align: center;
    }

    .item-label {
      font-size: 14px;
      color: #333333;
      line-height: 22px;
      text-align: center;
    }

    .item-status {
      color: #ffffff;
      padding: 0 4px;
      min-width: 40px;
      height: 24px;
      font-size: 12px;
      line-height: 24px;
      border-radius: 4px;
      text-align: center;
    }

    .status-1 {
      background-color: #FF5167;
    }

    .status-2 {
      background-color: #FF6837;
    }

    .status-3 {
      background-color: #FFB251;
    }

    .status-99 {
      background-color: #0482ff;
    }
  }
}
</style>
