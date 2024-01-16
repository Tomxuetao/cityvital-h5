<script setup>
import dayjs from 'dayjs'
import { nextTick, reactive, ref, watch } from 'vue'

import { useCommonStore } from '@/store'
import EmptyPage from '@/views/common/empty-page.vue'
import CustomList from '@/views/common/custom-list.vue'
import CommonTabs from '@/views/common/common-tabs.vue'
import CommonSheet from '@/views/common/common-sheet.vue'
import ThirdFilter from '@/views/common/third-filter.vue'
import CommonSearch from '@/views/common/common-search.vue'
import CommonCalendar from '@/views/common/common-calendar.vue'
import CityCard from '@/views/modules/vital-signs/comp/city-card.vue'
import MetroCard from '@/views/modules/vital-signs/comp/metro-card.vue'
import WaterCard from '@/views/modules/vital-signs/comp/water-card.vue'
import MunicipCard from '@/views/modules/vital-signs/comp/municip-card.vue'
import ReserveCard from '@/views/modules/vital-signs/comp/reserve-card.vue'

import { mapToList, eventStatusMap, deviceStatusMap, reserveStatusMap, vitalSignsTabs } from '@/config'

const props = defineProps({
  index: {
    type: String,
    required: false
  }
})

const cardCompsMap = new Map([
  [2, CityCard],
  [5, MetroCard],
  [0, WaterCard],
  [3, MunicipCard]
])

const commonState = useCommonStore()
const tabConfigList = vitalSignsTabs

const activeIndex = ref(props.index ? Number(props.index) : 0)
const activeSecondIndex = ref(0)

const areaDataList = ref([])
const thirdTypeList = ref([])

const curDate = dayjs().format('YYYY-MM-DD')
const nextDate = dayjs().add(1, 'day').format('YYYY-MM-DD')

let searchForm = reactive({
  alarming: 'true',
  itemName: undefined,
  thirdType: undefined,
  eventStatus: undefined,
  sortTimeFiled: 'latestCheckTime',
  latestCheckEndTime: `${nextDate} 00:00:00`,
  latestCheckStartTime: `${curDate} 00:00:00`
})

const computeSearchForm = (index = activeIndex.value, secondIndex = activeSecondIndex.value) => {
  let tempSearch
  if (index === 5) {
    if (secondIndex === 0) {
      tempSearch = {
        item_name: undefined,
        end_time: `${nextDate} 00:00:00`,
        start_time: `${curDate} 00:00:00`
      }
    }
  } else {
    tempSearch = {
      alarming: 'true',
      thirdType: undefined,
      eventStatus: undefined,
      sortTimeFiled: 'latestCheckTime',
      latestCheckEndTime: `${nextDate} 00:00:00`,
      latestCheckStartTime: `${curDate} 00:00:00`
    }
  }
  return tempSearch
}

const dateRange = ref([new Date(searchForm.latestCheckStartTime), new Date(searchForm.latestCheckEndTime)])

const customListRef = ref()
const isTabChange = ref(false)
const tabChangeHandler = (index, level) => {
  activeSecondIndex.value = level === 2 ? index : 0

  isTabChange.value = true

  searchForm = Object.assign(searchForm, {
    alarming: 'true',
    itemName: undefined,
    thirdType: undefined,
    eventStatus: undefined,
    sortTimeFiled: 'latestCheckTime',
    latestCheckEndTime: `${nextDate} 00:00:00`,
    latestCheckStartTime: `${curDate} 00:00:00`
  })

  dateRange.value = [new Date(searchForm.latestCheckStartTime), new Date(searchForm.latestCheckEndTime)]

  const tempList = tabConfigList[level === 1 ? index : activeIndex.value].children
  if (tempList.length) {
    const { title } = tempList[level === 1 ? 0 : index]
    thirdTypeList.value = areaDataList.value.filter((item) => item.model === title)
  }

  nextTick(() => {
    isTabChange.value = false
  })
}

const getAreaDataList = async () => {
  areaDataList.value = await commonState.initAreaListAction()
  tabChangeHandler(activeIndex.value, 1)
}
getAreaDataList()

watch(
  () => dateRange.value,
  (dateRange) => {
    const [start, end] = dateRange
    searchForm.latestCheckEndTime = end ? `${dayjs(end).format('YYYY-MM-DD')} 00:00:00` : undefined
    searchForm.latestCheckStartTime = start ? `${dayjs(start).format('YYYY-MM-DD')} 00:00:00` : undefined
  }
)

watch(
  () => searchForm,
  () => {
    if (!isTabChange.value) {
      const tempSearch = activeIndex.value === 5 ?
        {
          item_name: searchForm.itemName,
          alarm_status: searchForm.eventStatus,
          end_time: searchForm.latestCheckEndTime,
          start_time: searchForm.latestCheckStartTime
        } : searchForm
      customListRef.value.getDataList(tempSearch)
    }
  },
  { deep: true, immediate: false }
)
</script>

<template>
  <div class="vital-signs">
    <div class="signs-inner">
      <div class="tabs-wrap">
        <common-tabs
          v-model:active="activeIndex"
          :tab-config-list="tabConfigList"
          color="#0482FF"
          :swipe-threshold="4"
          title-active-color="#0482FF"
          @change="index => tabChangeHandler(index, 1)"
        >
        </common-tabs>
      </div>
      <div class="ctx-wrap">
        <div class="ctx-inner">
          <custom-list
            v-if="tabConfigList[activeIndex].children?.length"
            ref="customListRef"
            :key="activeIndex"
            :tab-config-list="tabConfigList[activeIndex].children"
            :default-search-form="computeSearchForm(activeIndex, activeSecondIndex)"
            @inner-tab-change="index => tabChangeHandler(index, 2)"
          >
            <template #search>
              <div v-if="activeIndex !== 5" class="search-wrap">
                <third-filter v-model="searchForm.thirdType" :list="thirdTypeList"></third-filter>
                <common-search>
                  <template #custom-select>
                    <div class="select-wrap">
                      <common-calendar
                        v-model="dateRange"
                        label="时间选择"
                        :default-date="dateRange"
                      >
                      </common-calendar>
                      <common-sheet
                        v-model="searchForm.alarming"
                        :list="mapToList(deviceStatusMap)"
                        label="设施状态"
                      >
                      </common-sheet>
                      <common-sheet
                        v-model="searchForm.eventStatus"
                        :list="mapToList( eventStatusMap)"
                        label="处置状态"
                      >
                      </common-sheet>
                    </div>
                  </template>
                </common-search>
              </div>
              <div v-else class="search-wrap">
                <template v-if="activeSecondIndex === 0">
                  <common-search>
                    <template #custom-select>
                      <div class="select-wrap">
                        <common-calendar
                          v-model="dateRange"
                          label="时间选择"
                          :default-date="dateRange"
                        >
                        </common-calendar>
                        <common-sheet
                          v-model="searchForm.eventStatus"
                          :list="mapToList(reserveStatusMap)"
                          label="处置状态"
                        >
                        </common-sheet>
                      </div>
                    </template>
                  </common-search>
                </template>
              </div>
            </template>
            <template #special v-if="activeIndex === 5 && activeSecondIndex === 0">
              <div class="reserve-wrap">
                <reserve-card
                  v-model="searchForm.itemName"
                  :date-range="dateRange"
                  :status="searchForm.eventStatus"
                >
                </reserve-card>
              </div>
            </template>
            <template #card-item="{ data, index }">
              <div class="card-wrap">
                <component
                  :is="cardCompsMap.get(activeIndex)"
                  :data="data"
                  :second-index="activeSecondIndex"
                  :origin-type="tabConfigList[activeIndex].title"
                  :second-type="tabConfigList[activeIndex].children[index].title"
                >
                </component>
              </div>
            </template>
          </custom-list>
          <empty-page v-else :empty-type="2" desc="内容建设中"></empty-page>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vital-signs {
  .signs-inner {
    .tabs-wrap {
      position: relative;

      &:before {
        position: absolute;
        content: "";
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 0.5px;
        background-color: #f0f2f5;
      }

      :deep(.van-tabs--line) {
        .van-tabs__wrap {
          height: 34px;

          .van-tabs__nav {
            align-items: center;
            padding-bottom: 0;

            .van-tabs__line {
              display: none;
            }

            .van-tab--grow {
              align-items: center;

              .van-tab__text {
                height: 20px;
                line-height: 20px;
              }
            }
          }
        }
      }
    }

    .ctx-wrap {
      padding: 12px 12px 0 12px;
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

      .ctx-inner {
        position: relative;
        border-radius: 12px;
        background-color: #ffffff;
        min-height: calc(100vh - 199px);

        .reserve-wrap {
          padding: 12px 16px 0 16px;
        }

        .card-wrap {
          padding: 0 16px;
        }

        .search-wrap {
          padding: 12px 16px 0 16px;

          .select-wrap {
            display: flex;
          }
        }
      }
    }
  }
}
</style>
