<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

import { commonGatewayApi } from '@/api/common-api'
import CommonTitle from '@/views/common/common-title.vue'
import LineChart from '@/views/modules/vital-signs/comp/line-chart.vue'

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})

const dataMap = ref(new Map())
const getDataList = async () => {
  const { factory_id, type } = props.detail
  const dataList = await commonGatewayApi('210537c440', {
    factory_id: factory_id,
    type_name: type
  })
  if (Array.isArray(dataList)) {
    const tempDataMap = new Map()
    dataList.reduce((acc, cur) => {
      const { factory_name: name, alarm_flag: flag } = cur
      const tempData = acc.get(name)
      if (tempData) {
        tempData.list.push(cur)
        if (tempData.status !== '0') {
          tempData.status = !['-', '0'].includes(flag) ? '0' : '1'
        }
      } else {
        acc.set(name, {
          list: [cur],
          status: !['-', '0'].includes(flag) ? '0' : '1'
        })
      }
      return acc
    }, tempDataMap)

    dataMap.value = tempDataMap
  }
}

getDataList()

const activeIndex = ref(0)

const tabConfigList = [
  { text: '今日', code: '211b0a81c2' },
  { text: '近7日', code: '211ae2f909', customForm: { date_flag: '1' } },
  { text: '近30日', code: '211ae2f909' }
]

const chartDataList = ref([])
const getChartData = async (config, data) => {
  chartDataList.value = []
  const { code, customForm } = config
  const { factory_id, check_item } = data
  const dataList = await commonGatewayApi(
    code,
    Object.assign(customForm || {}, {
      factory_id: factory_id,
      check_item: check_item,
      type: props.detail.type
    })
  )
  if (Array.isArray(dataList) && dataList.length) {
    const len = dataList.length
    const {
      value_max_1,
      value_max_2,
      value_max_3,
      value_min_1,
      value_min_2,
      value_min_3
    } = data
    if (value_max_1) {
      chartDataList.value.push({
        name: '一级报警阀值(max)',
        list: new Array(len).fill(value_max_1, 0, len)
      })
    }
    if (value_max_2) {
      chartDataList.value.push({
        name: '二级报警阀值(max)',
        list: new Array(len).fill(value_max_2, 0, len)
      })
    }
    if (value_max_3) {
      chartDataList.value.push({
        name: '三级报警阀值(max)',
        list: new Array(len).fill(value_max_3, 0, len)
      })
    }
    if (value_min_1) {
      chartDataList.value.push({
        name: '一级报警阀值(min)',
        list: new Array(len).fill(value_min_1, 0, len)
      })
    }
    if (value_min_2) {
      chartDataList.value.push({
        name: '二级报警阀值(min)',
        list: new Array(len).fill(value_min_2, 0, len)
      })
    }
    if (value_min_3) {
      chartDataList.value.push({
        name: '三级报警阀值(min)',
        list: new Array(len).fill(value_min_3, 0, len)
      })
    }
    chartDataList.value.unshift({
      name: '监测值',
      list: dataList.map((item) => {
        const tempDate =
          activeIndex.value === 0
            ? dayjs(item.create_time).format('HH:MM')
            : dayjs(item.create_date).format('MM-DD')
        return {
          name: tempDate,
          value: item.check_result
        }
      })
    })
  } else {
    chartDataList.value = []
  }
}

const changeTab = (index, data) => {
  if (activeIndex.value !== index) {
    activeIndex.value = index
    getChartData(tabConfigList[index], data)
  }
}

const expandId = ref()
const expandItem = (data) => {
  const { factory_id, item_name } = data
  expandId.value = factory_id + item_name
  activeIndex.value = 0
  getChartData(tabConfigList[0], data)
}
</script>

<template>
  <div class="monitor-info">
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
    <div class="monitor-type">{{ detail.type_2 }}</div>
    <div class="info-ctx">
      <div class="ctx-item" v-for="(key, index) in dataMap.keys()" :key="index">
        <div class="item-header">
          <div class="header-text">
            <img
              class="text-img"
              src="@/views/modules/vital-signs/img/icon-1.webp"
              alt=""
            />
            <div class="text-text">{{ key }}</div>
          </div>
          <div :class="['header-status', 'status-' + dataMap.get(key).status]">
            {{ dataMap.get(key).status === "0" ? "异常" : "正常" }}
          </div>
        </div>
        <div
          class="item-inner"
          v-for="(item, index) in dataMap.get(key).list"
          :key="index"
        >
          <div class="inner-header" @click="expandItem(item)">
            <div class="header-text">{{ item.item_name }}</div>
            <div class="header-num">
              <div class="num-text">{{ item.check_result }}</div>
              <img
                class="num-img"
                src="@/views/modules/vital-signs/img/icon-arrow.webp"
                alt=""
              />
            </div>
          </div>
          <div
            class="inner-ctx"
            v-if="expandId === item.factory_id + item.item_name"
          >
            <div class="value-wrap">
              <div class="value-item">
                <div class="item-label">一级阈值</div>
                <div class="item-text">{{ item.alarm_standard_value_1 }}</div>
              </div>
              <div class="value-item">
                <div class="item-label">二级阈值</div>
                <div class="item-text">{{ item.alarm_standard_value_2 }}</div>
              </div>
              <div class="value-item">
                <div class="item-label">三级阈值</div>
                <div class="item-text">{{ item.alarm_standard_value_3 }}</div>
              </div>
            </div>
            <div class="chart-wrap">
              <div class="chart-title">
                <div class="title-text">{{ item.item_name + "趋势分析" }}</div>
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
              <line-chart
                class="chart-inner"
                :data-list="chartDataList"
              ></line-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.monitor-info {
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

  .monitor-type {
    padding: 12px 16px 0 16px;
    font-size: 14px;
    font-weight: 600;
    color: #0482ff;
    line-height: 22px;
  }

  .info-ctx {
    .ctx-item {
      position: relative;
      margin: 0 16px;
      padding: 12px 0 4px 0;

      .item-header {
        display: flex;
        height: 22px;
        line-height: 22px;
        align-items: center;
        justify-content: space-between;

        .header-text {
          display: flex;
          align-items: center;

          .text-img {
            height: 18px;
            width: 18px;
            margin-right: 4px;
            object-fit: cover;
          }

          .text-text {
            height: 22px;
            font-size: 14px;
            font-weight: 600;
            color: #333333;
            line-height: 22px;
          }
        }

        .header-status {
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          font-family: YouSheBiaoTiHei;
        }

        .status-0 {
          color: #ff4c63;
        }

        .status-1 {
          color: #00c1a2;
        }
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
            font-weight: 600;
            color: #333333;
            line-height: 22px;
          }

          .header-num {
            display: flex;
            align-items: center;

            .num-text {
              height: 22px;
              font-size: 14px;
              font-weight: 600;
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
          }
        }

        .inner-ctx {
          padding-bottom: 12px;

          .value-wrap {
            display: grid;
            grid-gap: 4px 0;
            grid-template-rows: repeat(3, 20px);

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

      &:after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.5px;
        background-color: #eeeeee;
      }

      &:nth-last-child(1) {
        &:after {
          height: 0;
        }
      }
    }
  }
}
</style>
