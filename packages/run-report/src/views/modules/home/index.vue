<script setup>
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import { useCommonStore } from '@/store'

import { commonBackEndApi } from '@/api/common-api'

import CommonBar from '@/views/common/common-bar.vue'
import CommonRing from '@/views/common/common-ring.vue'
import CommonTitle from '@/views/common/common-title.vue'
import RunDynamic from '@/views/modules/run-dynamic/index.vue'
import CommonCalendar from '@/views/common/common-calendar.vue'


const commonStore = useCommonStore()

commonStore.updateActiveIndex(0)

const curDate = dayjs().format('YYYY-MM-DD')
const prevDate = dayjs().add(-1, 'day').format('YYYY-MM-DD')

const showMore = ref(false)

const viewList = ref([
  {
    text: '总访问人数',
    key: '访问总数',
    num: '0',
    unit: '人'
  },
  {
    text: '总访问次数',
    key: '',
    num: '-',
    unit: '次'
  }
])

const viewDateRange = ref([prevDate, curDate])

/**
 * 获取平台访问情况
 * @returns {Promise<void>}
 */
const viewDataMap = ref(new Map())
const getViewDataList = async () => {
  const [start, end] = viewDateRange.value
  const dataList = await commonBackEndApi('dailyReport/app/viewCountInfo', {
    timeEndSearch: `${end} 00:00:00`,
    timeStartSearch: `${start} 00:00:00`
  }, 'post')

  if (Array.isArray(dataList)) {
    const tempMap = new Map()
    dataList.reduce((acc, cur) => {
      const tempData = acc.get(cur.count)
      const {
        name,
        special
      } = cur
      const value = Number(special)
      const item = {
        name: name.replace('城镇燃气领域和地铁运营期保护区领域', '城镇燃气和地铁').replace('领域', ''),
        value: Number.isNaN(value) ? 0 : value
      }
      if (tempData) {
        tempData.push(item)
      } else {
        acc.set(cur.count, [item])
      }
      return acc
    }, tempMap)
    viewDataMap.value = tempMap
    const tempList = tempMap.get(1)
    viewList.value.forEach(item => {
      const { value } = tempList.find(temp => temp.name === item.key) || { value: '-' }
      Object.assign(item, { num: value })
    })
  }
}
getViewDataList()

const boxList = ref([
  {
    text: '当前告警数',
    num: 0,
    key: 'todayAlarmNum',
    config: {
      showTypeMap: new Map([
        ['todayNum', '当前告警数']
      ]),
      url: 'dailyReport/app/event/todayAlarmMore'
    }
  },
  {
    text: '处置中',
    num: 0,
    key: 'disposeNum',
    config: {
      showTypeMap: new Map([
        ['handleNum', '处置中']
      ]),
      url: 'dailyReport/app/event/disposeCountMore'
    }
  },
  {
    text: '已办结',
    num: 0,
    key: 'todayAlarmNum',
    config: {
      showTypeMap: new Map([
        ['todayNum', '今日告警数']
      ]),
      url: 'dailyReport/app/event/todayAlarmMore'
    }
  },
  {
    text: '累计告警',
    num: 0,
    key: 'totleNum',
    config: {
      showTypeMap: new Map([
        ['todayNum', '累计告警数']
      ]),
      url: 'dailyReport/app/event/disposeCountMore'
    }
  },
  {
    text: '累计办结',
    num: 0,
    key: 'totleSettle',
    config: {
      showTypeMap: new Map([
        ['settleNum', '已完成']
      ]),
      url: 'dailyReport/app/event/disposeCountMore'
    }
  },
  {
    text: '超期数',
    num: 0,
    key: 'todayAlarmNum',
    config: {
      showTypeMap: new Map([
        ['todayNum', '超期数']
      ]),
      url: 'dailyReport/app/event/todayAlarmMore'
    }
  }
])

const activeIndex = ref(0)

const eventDateRange = ref([prevDate, curDate])

/**
 * 获取事件处置情况总量
 * @returns {Promise<void>}
 */
const getDisposeCount = async () => {
  const [start, end] = eventDateRange.value
  const data = await commonBackEndApi('dailyReport/app/event/disposeCount', {
    timeEndSearch: `${end} 00:00:00`,
    timeStartSearch: `${start} 00:00:00`
  }, 'post') || {}

  boxList.value.forEach(item => {
    Object.assign(item, { num: data[item.key] })
  })
}

getDisposeCount()

const eventChartList = ref([])

/**
 * 获取事件处置数据
 * @param index
 * @returns {Promise<void>}
 */
const getEventDataList = async (index = activeIndex.value) => {
  eventChartList.value = []
  const { config } = boxList.value[index]
  const {
    url,
    showTypeMap
  } = config
  const [start, end] = eventDateRange.value
  const dataList = await commonBackEndApi(url, {
    timeEndSearch: `${end} 00:00:00`,
    timeStartSearch: `${start} 00:00:00`
  }, 'post')
  if (Array.isArray(dataList)) {
    const tempList = []
    dataList.forEach((item) => {
      showTypeMap.forEach((value, key) => {
        tempList.push({
          type: value,
          value: item[key],
          name: item.domainName
        })
      })
    })
    eventChartList.value = tempList
  }
}

getEventDataList()

const boxIndexChange = (index) => {
  if (index !== activeIndex.value) {
    activeIndex.value = index
    getEventDataList(index)
  }
}

watch(() => eventDateRange.value, () => {
  getDisposeCount()
  getEventDataList()
})

watch(() => viewDateRange.value, () => {
  getViewDataList()
})
</script>

<template>
  <div class="home-wrap">
    <div class="home-inner">
      <div class="inner-item">
        <common-title text="平台访问情况">
          <common-calendar v-model="viewDateRange"></common-calendar>
        </common-title>
        <div class="item-ctx">
          <div class="view-wrap">
            <div class="view-item" v-for="(item, index) in viewList" :key="index">
              <div class="item-text">{{ item.text }}</div>
              <div class="item-num">
                <div class="num-text">{{ item.num }}</div>
                <div class="num-unit">{{ item.unit }}</div>
              </div>
            </div>
          </div>
          <div class="expand-wrap" @click="showMore = !showMore">
            <div class="expand-text">{{ `点击${!showMore ? '展开' : '收起'}平台访问详情` }}</div>
            <img :class="['expand-img', showMore ? 'expand-up' : '']" src="@/assets/img/icon-arrow.webp" alt=""/>
          </div>
          <div v-if="showMore" class="chart-wrap">
            <div class="chart-item">
              <div class="item-title">领域访问 (人)</div>
              <common-ring
                class="chart-ctx"
                :data-list="viewDataMap.get(2)"
                :extendConfig="{ unit: '人' }"
              >
              </common-ring>
            </div>
            <div class="chart-item">
              <div class="item-title">城区访问 (人)</div>
              <common-bar
                class="chart-ctx"
                :data-list="viewDataMap.get(3)"
                :extend-config="{ barWidth: 12 }"
              >
              </common-bar>
            </div>
          </div>
        </div>
      </div>
      <div class="inner-item">
        <common-title text="事件处置情况"></common-title>
        <div class="item-ctx">
          <div class="box-wrap">
            <div
              v-for="(item, index) in boxList"
              :key="index"
              :class="['box-item', activeIndex === index ? 'item-active' : '']"
              @click="boxIndexChange(index)"
            >
              <div class="item-text">{{ item.text }}</div>
              <div class="item-num">{{ item.num }}</div>
            </div>
          </div>
          <div class="chart-wrap">
            <div class="chart-item">
              <div class="item-title">
                <div class="title-text">{{ `${boxList[activeIndex].text}(件)` }}</div>
              </div>
              <common-bar
                class="deal-chart"
                :data-list="eventChartList"
                :extend-config="{ vertical: true }"
              >
              </common-bar>
            </div>
          </div>
        </div>
      </div>
      <run-dynamic></run-dynamic>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-wrap {
  position: relative;
  padding: 0 12px;
  margin-top: -12px;

  .home-inner {
    display: grid;
    grid-gap: 12px 0;

    .inner-item {
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

      .item-ctx {
        padding: 0 16px;

        .view-wrap {
          display: grid;
          grid-gap: 0 24px;
          padding-top: 8px;
          grid-auto-flow: column;

          .view-item {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

            .item-text {
              height: 20px;
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              text-align: center;
              margin-bottom: 2px;
            }

            .item-num {
              display: flex;
              align-items: flex-end;

              .num-text {
                height: 32px;
                font-size: 24px;
                color: #333333;
                line-height: 32px;
                font-weight: Bold;
                font-family: Alternate-Bold, serif;
              }

              .num-unit {
                height: 20px;
                font-size: 12px;
                color: #999999;
                line-height: 20px;
                margin-left: 2px;
              }
            }
          }
        }

        .expand-wrap {
          height: 30px;
          display: flex;
          margin: 14px 0;
          border-radius: 6px;
          align-items: center;
          justify-content: center;
          background-color: #f7faff;

          .expand-text {
            color: #0482ff;
            font-size: 14px;
            margin-right: 4px;
          }

          .expand-img {
            width: 10px;
            height: 10px;
            object-fit: cover;
          }

          .expand-up {
            transform: rotate(180deg);
          }
        }

        .box-wrap {
          display: grid;
          grid-gap: 12px 12px;
          padding: 4px 0 14px 0;
          grid-template-rows: repeat(2, 1fr);
          grid-template-columns: repeat(2, 1fr);

          .box-item {
            height: 74px;
            padding: 10px 0;
            text-align: center;
            border-radius: 2px;
            border: 0.5px solid #e5e5e5;

            .item-text {
              height: 20px;
              font-size: 14px;
              color: #666666;
              line-height: 20px;
              margin-bottom: 2px;
            }

            .item-num {
              height: 32px;
              font-size: 24px;
              color: #333333;
              line-height: 32px;
              font-weight: Bold;
              font-family: Alternate-Bold, serif;
            }
          }

          .item-active {
            border-radius: 2px;
            border: 0.5px solid transparent;
            background-repeat: no-repeat;
            background-image: linear-gradient(180deg, rgba(4, 130, 255, 0.3), rgba(4, 130, 255, 0) 100%);

            .item-text {
              color: #0482FF;
            }

            .item-num {
              color: #0482FF;
            }
          }
        }

        .chart-wrap {
          padding-bottom: 16px;

          .chart-item {
            .item-title {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 22px;
              color: #333333;
              font-size: 16px;
              line-height: 22px;
              font-weight: 500;

              .title-img {
                display: flex;
                align-items: center;

                .img-desc {
                  font-size: 14px;
                  color: #666666;
                  margin-left: 4px;
                  font-weight: 400;
                }

                .img-icon {
                  width: 14px;
                  height: 14px;
                  object-fit: cover;
                }
              }
            }

            .chart-ctx {
              height: 168px;
            }

            .deal-chart {
              height: 168px;
            }
          }
        }
      }
    }
  }
}
</style>
