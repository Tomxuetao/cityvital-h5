<script setup>
import dayjs from 'dayjs'
import { useCommonStore } from '@/store'
import { vitalSignsTabs } from '@/config'
import { commonBackEndApi } from '@/api/common-api'
import {
 nextTick, reactive, ref, watch 
} from 'vue'

import CommonList from '@/views/common/common-list.vue'
import CommonRing from '@/views/common/common-ring.vue'
import CommonTabs from '@/views/common/common-tabs.vue'
import CommonTitle from '@/views/common/common-title.vue'
import CommonCalendar from '@/views/common/common-calendar.vue'
import MetroCard from '@/views/modules/run-dynamic/comp/metro-card.vue'
import SearchPage from '@/views/modules/run-dynamic/comp/search-page.vue'
import CommonCard from '@/views/modules/run-dynamic/comp/common-card.vue'

const commonStore = useCommonStore()

const curDate = dayjs().format('YYYY-MM-DD')
const nextDate = dayjs().add(1, 'day').format('YYYY-MM-DD')

const dateRange = ref([curDate, nextDate])

const chartDataList = ref([])

const activeIndex = ref(commonStore.curActiveIndex)

const cardCompsMap = new Map([
  [0, CommonCard],
  [1, CommonCard],
  [2, CommonCard],
  [3, CommonCard],
  [4, CommonCard],
  [5, MetroCard]
])

let searchForm = reactive({
  type: undefined,
  searchKey: undefined,
  eventStatus: undefined,
  streetCode: undefined,
  districtCode: undefined,
  emergencyDegree: undefined,
  timeEndSearch: `${nextDate} 00:00:00`,
  timeStartSearch: `${curDate} 00:00:00`,
  domainName: vitalSignsTabs[activeIndex.value].title,
  searchType: vitalSignsTabs[activeIndex.value].searchType
})

const computeSearchForm = (index = activeIndex.value) => {
  let tempSearch
  if (index === 5) {
    tempSearch = {
      is_bj: '1',
      end_time: `${nextDate} 00:00:00`,
      start_time: `${curDate} 00:00:00`,
      searchType: vitalSignsTabs[activeIndex.value].searchType
    }
  } else {
    tempSearch = {
      type: undefined,
      searchKey: undefined,
      eventStatus: undefined,
      streetCode: undefined,
      districtCode: undefined,
      emergencyDegree: undefined,
      timeEndSearch: `${nextDate} 00:00:00`,
      timeStartSearch: `${curDate} 00:00:00`,
      domainName: vitalSignsTabs[activeIndex.value].title,
      searchType: vitalSignsTabs[activeIndex.value].searchType
    }
  }
  Object.keys(searchForm).forEach(key => {
    if (!(key in tempSearch)) {
      tempSearch[key] = undefined
    }
  })
  return tempSearch
}


/**
 * 获取告警分析数据
 * @returns {Promise<void>}
 */
const getDomainAlarmCount = async (dateRange) => {
  chartDataList.value = []
  const {
    title,
    searchType
  } = vitalSignsTabs[activeIndex.value]
  const [start, end] = dateRange
  const dataList = await commonBackEndApi(
    'dailyReport/app/event/eventAlarmAnalyse',
    {
      domainName: title,
      searchType: searchType,
      timeEndSearch: `${end} 00:00:00`,
      timeStartSearch: `${start} 00:00:00`
    },
    'post')
  if (Array.isArray(dataList)) {
    chartDataList.value = dataList.map(item => {
      return {
        name: item.name,
        value: item.count
      }
    })
  }
}

getDomainAlarmCount(dateRange.value)

const listConfig = {
  method: 'post',
  code: 'dailyReport/app/event/operation/eventListCity'
}

const showSearch = ref(false)

const isTabChange = ref(false)

/**
 * 获取事件状态列表
 * @returns {Promise<void>}
 */
const getEventTypeList = async () => {
  const key = vitalSignsTabs[activeIndex.value].title
  const tempList = commonStore.eventTypeMap.get(key)
  if (!tempList) {
    const eventTypeList = await commonBackEndApi('dailyReport/app/event/operation/eventTypeCity', {
      domainName: key
    }, 'post')
    commonStore.updateEventType(key, eventTypeList || [])
  }
}

getEventTypeList()

/**
 * 获取所属城区列表
 * @returns {Promise<void>}
 */
const getRegionList = async () => {
  const key = 'top-level'
  const tempList = commonStore.regionListMap.get(key)
  if (!tempList) {
    const regionList = await commonBackEndApi('dailyReport/app/event/operation/eventDistrictCity',
      {
        pid: undefined,
        poltype: '3'
      },
      'post'
    )
    commonStore.updateRegionList(key, regionList || [])
  }
}

getRegionList()

const tabChangeHandler = (index) => {
  commonStore.updateActiveIndex(index)
  isTabChange.value = true
  dateRange.value = [curDate, nextDate]
  searchForm = Object.assign(searchForm, computeSearchForm(activeIndex.value))
  getEventTypeList()
  nextTick(() => {
    isTabChange.value = false
  })
}

const receiveSearchForm = (dataForm = {}) => {
  showSearch.value = false
  searchForm = Object.assign(searchForm, dataForm)
}

watch(() => dateRange.value, (dateRange) => {
  const [start, end] = dateRange
  getDomainAlarmCount(dateRange)
  searchForm.timeEndSearch = `${end} 00:00:00`
  searchForm.timeStartSearch = `${start} 00:00:00`
}, { deep: true })


const commonListRef = ref()
watch(() => searchForm, (searchForm) => {
  if (!isTabChange.value) {
    const tempSearch = activeIndex.value === 5 ? {
      is_bj: '1',
      end_time: searchForm.timeEndSearch,
      start_time: searchForm.timeStartSearch,
      searchType: vitalSignsTabs[activeIndex.value].searchType
    } : searchForm
    commonListRef.value.getDataList(tempSearch)
  }
}, { deep: true })
</script>

<template>
  <div v-show="!showSearch" class="run-dynamic">
    <common-tabs
      v-model:active="activeIndex"
      :tab-config-list="vitalSignsTabs"
      @change="(index) => tabChangeHandler(index)"
    >
    </common-tabs>
    <div class="dynamic-inner">
      <div class="inner-item">
        <common-title text="告警分析">
          <common-calendar v-model="dateRange"></common-calendar>
        </common-title>
        <div class="item-ctx">
          <div class="chart-wrap">
            <common-ring
              class="chart-ctx"
              :data-list="chartDataList"
              :extend-config="{ title: '告警次数' }"
            >
            </common-ring>
          </div>
        </div>
      </div>
      <div class="inner-item">
        <common-title text="告警事件明细">
          <div v-if="activeIndex !== 5" class="filler-wrap" @click="showSearch = true">
            <div class="filler-text">筛选</div>
            <img class="filler-img" src="@/views/common/img/icon-filter.webp" alt=""/>
          </div>
        </common-title>
        <div class="event-ctx">
          <form
            v-if="activeIndex !== 5"
            class="ctx-search" action=""
          >
            <van-search
              v-model="searchForm.searchKey"
              placeholder="请输入搜索关键词"
            >
            </van-search>
          </form>
          <div class="common-wrap">
            <common-list
              ref="commonListRef"
              :key="activeIndex"
              :config="listConfig"
              :default-search-form="computeSearchForm(activeIndex)"
            >
              <template #card-item="{ data }">
                <component
                  :data="data"
                  :is="cardCompsMap.get(activeIndex)"
                  :type="vitalSignsTabs[activeIndex].searchType"
                >
                </component>
              </template>
            </common-list>
          </div>
        </div>
      </div>
    </div>
  </div>
  <search-page
    v-show="showSearch"
    :name="vitalSignsTabs[activeIndex].title"
    @expose-form="receiveSearchForm"
  >
  </search-page>
</template>

<style scoped lang="scss">
.run-dynamic {

  .dynamic-inner {
    position: relative;
    padding: 12px 0;
    display: grid;
    grid-gap: 12px 0;
    min-height: 400px;

    .inner-item {
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

      .filler-wrap {
        display: flex;
        align-items: center;

        .filler-text {
          height: 14px;
          font-size: 14px;
          color: #0482ff;
          line-height: 14px;
        }

        .filler-img {
          width: 16px;
          height: 16px;
          object-fit: cover;
        }
      }

      .item-ctx {
        padding: 4px 16px;

        .chart-wrap {
          .chart-ctx {
            height: 168px;
          }
        }
      }

      .event-ctx {
        .ctx-search {
          padding: 4px 16px 0 16px;

          :deep(.van-search) {
            .van-search__content {
              border-radius: 6px;
            }
          }
        }

        .common-wrap {
          min-height: 462px;
          position: relative;

          :deep(.list-wrap) {
            .list-item {
              position: relative;

              &:after {
                position: absolute;
                content: "";
                left: 16px;
                height: 0.5px;
                width: calc(100% - 32px);
                bottom: 0;
                background-color: #eeeeee;
              }
            }
          }
        }
      }
    }
  }

  :deep(.van-tabs) {
    .van-tabs__wrap {
      .van-tabs__nav {
        border-radius: 12px;
      }
    }
  }
}
</style>
