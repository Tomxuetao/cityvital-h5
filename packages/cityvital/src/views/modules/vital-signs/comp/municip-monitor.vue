<script setup>
import dayjs from 'dayjs'
import LineChart from './line-chart.vue'
import { commonGatewayApi } from '@/api/common-api'

const props = defineProps({
  detail: {
    type: Object,
    required: true
  },
  secondType: {
    type: String,
    required: true
  }
})

/**
 * 获取监测信息
 * @returns {Promise<void>}
 */
const expandId = ref()
const dataListMap = ref(new Map())
const getMonitorList = async () => {
  const tempDataList = await commonGatewayApi('214ee2cf10', {
    factory_id: props.detail.factory_id,
    model: props.secondType,
    type: props.detail.type
  })

  if (Array.isArray(tempDataList)) {
    const dataList = tempDataList.filter(item => item.num !== '-')
    const tempDataMap = new Map()
    dataList.reduce((acc, cur) => {
      const tempData = acc.get(cur.check_item)
      if (tempData) {
        tempData.push(cur)
      } else {
        acc.set(cur.check_item, [cur])
      }
      return acc
    }, tempDataMap)

    dataListMap.value = tempDataMap
  }
}

getMonitorList()

const activeIndex = ref(0)
const expandItem = (data) => {
  activeIndex.value = 0
  const { factory_id, item_name, point_name, sub_check_item } = data
  const tempId = factory_id + point_name + item_name + sub_check_item
  if (expandId.value !== tempId) {
    expandId.value = tempId
    getChartData(tabConfigList[0], data)
  } else {
    expandId.value = undefined
  }
}

const tabConfigList = [
  { key: '_todayData', text: '今日', code: '21725e8d34' },
  { key: '_weekData', text: '近7日', code: '2173366459', customForm: { date_flag: '1' } },
  { key: '_monthData', text: '近30日', code: '2173366459' }
]

const chartDataList = ref([])

/**
 * 获取图表数据
 * @param config
 * @param data
 * @returns {Promise<void>}
 */
const getChartData = async (config, data) => {
  chartDataList.value = []
  const { key, code, customForm } = config
  const { factory_id, point_name } = data
  if (data[key]) {
    chartDataList.value = data[key]
  } else {
    const dataList = await commonGatewayApi(code, Object.assign(customForm || {}, {
      factory_id: factory_id,
      point_name: point_name
    }))
    if (Array.isArray(dataList) && dataList.length) {
      const len = dataList.length
      const { standard_value } = data
      Object.assign(data, { unit: dataList[0].unit })
      if (standard_value && standard_value !== '-') {
        chartDataList.value.push({
          name: '阀值',
          list: new Array(len).fill(standard_value, 0, len)
        })
      }
      chartDataList.value.unshift({
        name: '监测值',
        list: dataList.map((item) => {
          const tempDate = dayjs(item.create_time).format(activeIndex.value === 0 ? 'HH:MM' : 'MM-DD')
          const value = Number(item.check_result)
          return {
            name: tempDate,
            value: Number.isNaN(value) ? 0 : value
          }
        })
      })
      data[key] = chartDataList.value
    } else {
      chartDataList.value = []
      data[key] = chartDataList.value
    }
  }
}
const changeTab = (index, data) => {
  if (activeIndex.value !== index) {
    activeIndex.value = index
    getChartData(tabConfigList[index], data)
  }
}
/**
 * 获取巡查记录
 */

let patrolData = reactive({})
const getPatrolRecords = async () => {
  if (['桥梁'].includes(props.secondType)) {
    const tempDataList = await commonGatewayApi('24541bc552', { facility_uuid: props.detail.factory_id })
    if (Array.isArray(tempDataList)) {
      patrolData = Object.assign({}, patrolData, tempDataList[0] || {})
    }
  }
}

getPatrolRecords()
</script>

<template>
  <div class="municip-monitor">
    <div class="info-header">
      <common-title text="监测信息"></common-title>
      <div class="header-inner">
        <div class="inner-item">
          <div class="item-label">监测时间：</div>
          <div class="item-text">{{ detail.create_time }}</div>
        </div>
        <div class="inner-item">
          <div class="item-label">更新频率：</div>
          <div class="item-text">{{ detail.period }}</div>
        </div>
      </div>
    </div>
    <!--  巡查记录（只有桥梁、隧道有巡查记录）  -->
    <div v-if="['桥梁'].includes(secondType)" class="patrol-wrap">
      <div class="patrol-title">巡查记录</div>
      <div class="patrol-inner">
        <div class="inner-item">
          <div class="item-label">巡查情况：</div>
          <div class="item-text">{{ patrolData.nowColour }}</div>
        </div>
        <div class="inner-item">
          <div class="item-label">三级阈值：</div>
          <div class="item-text">{{ patrolData.threealarm }}</div>
        </div>
        <div class="inner-item item-special">
          <div class="item-label">巡查周期：</div>
          <div class="item-text">{{ `${patrolData.patrol_cycle}小时` }}</div>
        </div>
        <div class="inner-item item-special">
          <div class="item-label">最新完成时间：</div>
          <div class="item-text">{{ patrolData.doneTime }}</div>
        </div>
      </div>
    </div>

    <div class="monitor-wrap">
      <template v-if="dataListMap.size">
        <div
          class="monitor-item"
          v-for="(key, index) in dataListMap.keys()"
          :key="index"
        >
          <div class="item-header">{{ key }}</div>
          <div
            class="item-inner"
            v-for="(item, index) in dataListMap.get(key)"
            :key="index"
          >
            <div class="inner-header" @click="expandItem(item)">
              <div class="header-text">{{ item.point_name || item.sub_check_item || item.item_name }}</div>
              <div class="header-num">
                <div class="num-text">{{ item.num }}</div>
                <img
                  :class="['num-img', expandId === item.factory_id + item.point_name + item.item_name + item.sub_check_item ? 'img-active' : '' ]"
                  src="../img/icon-arrow.webp"
                  alt=""
                />
              </div>
            </div>
            <div
              v-if="expandId === item.factory_id + item.point_name + item.item_name + item.sub_check_item"
              class="inner-ctx"
            >
              <div class="value-wrap">
                <div class="value-item">
                  <div class="item-label">阈值</div>
                  <div class="item-text">{{ item.standard_value }}</div>
                </div>
              </div>
              <div class="chart-wrap">
                <div class="chart-title">
                  <div class="title-text">
                    {{
                      (item.sub_check_item || item.item_name) + `${item.unit ? `趋势分析(${item.unit})` : '趋势分析'}`
                    }}
                  </div>
                  <div class="title-tabs">
                    <div
                      v-for="(tab, index) in tabConfigList"
                      :key="index"
                      :class="[
                      'tab-item',
                      activeIndex === index ? 'tab-active' : '',
                    ]"
                      @click="changeTab(index, item)"
                    >
                      {{ tab.text }}
                    </div>
                  </div>
                </div>
                <line-chart class="chart-inner" :data-list="chartDataList"></line-chart>
              </div>
            </div>
          </div>
        </div>
      </template>
      <empty-page v-else desc="暂无监测数据"></empty-page>
    </div>
  </div>
</template>

<style scoped lang="scss">
.municip-monitor {
  .info-header {
    border-bottom: 0.5px solid #eeeeee;

    .header-inner {
      padding: 0 16px;

      .inner-item {
        display: flex;
        height: 22px;
        align-items: center;
        line-height: 22px;
        color: #666666;
        margin-bottom: 8px;
      }
    }
  }

  .patrol-wrap {
    position: relative;
    padding: 12px 16px;

    .patrol-title {
      height: 22px;
      font-size: 16px;
      color: #0482ff;
      line-height: 22px;
      margin-bottom: 8px;
    }

    .patrol-inner {
      display: grid;
      grid-gap: 8px 12px;
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

      .item-special {
        grid-column-end: 3;
        grid-column-start: 1;
      }
    }

    &:after {
      position: absolute;
      content: "";
      left: 16px;
      right: 16px;
      bottom: 0;
      height: 0.5px;
      width: calc(100% - 32px);
      background-color: #eeeeee;
    }
  }

  .monitor-wrap {
    position: relative;
    min-height: 400px;
    padding: 12px 16px;

    .monitor-item {
      .item-header {
        height: 22px;
        font-size: 16px;
        color: #0482ff;
        line-height: 22px;
      }

      .item-inner {
        position: relative;

        .inner-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 36px;
          padding: 0 2px;
          line-height: 36px;

          .header-text {
            height: 22px;
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            line-height: 22px;
          }

          .header-num {
            display: flex;
            align-items: center;

            .num-text {
              height: 22px;
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 22px;
              margin-right: 8px;
            }

            .num-img {
              width: 14px;
              height: 14px;
              object-fit: cover;
              transform: rotate(90deg);
            }

            .img-active {
              transform: rotate(270deg);
            }
          }
        }

        .inner-ctx {
          padding-bottom: 12px;

          .value-wrap {
            display: grid;
            grid-gap: 4px 0;

            .value-item {
              height: 20px;
              line-height: 20px;
              color: #666666;
              font-size: 12px;
              padding-right: 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          }

          .chart-wrap {
            .chart-title {
              height: 22px;
              line-height: 22px;
              margin-top: 8px;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .title-text {
                font-size: 12px;
                font-weight: 600;
                color: #333333;
              }

              .title-tabs {
                display: grid;
                align-items: center;
                grid-template-columns: repeat(3, 1fr);

                .tab-item {
                  width: 48px;
                  height: 22px;
                  color: #666666;
                  font-size: 12px;
                  line-height: 22px;
                  text-align: center;
                  border: 0.5px solid #d9d9d9;
                  background-color: #ffffff;

                  &:nth-child(2) {
                    border-left: 0;
                    border-right: 0;
                  }

                  &:nth-child(1) {
                    border-radius: 4px 0 0 4px;
                  }

                  &:nth-child(3) {
                    border-radius: 0 4px 4px 0;
                  }
                }

                .tab-active {
                  color: #ffffff;
                  background-color: #0482ff;
                  border: 0.5px solid transparent;
                }
              }
            }

            .chart-inner {
              height: 228px;
            }
          }
        }

        &:after {
          position: absolute;
          content: "";
          left: 0;
          bottom: 0;
          width: 100%;
          border-bottom: 0.5px dashed #eeeeee;
        }

        &:nth-last-child(1) {
          &:after {
            border-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
