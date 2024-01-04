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
import WaterCard from '@/views/modules/vital-signs/comp/water-card.vue'

import { mapToList, eventStatusMap, deviceStatusMap, vitalSignsTabs } from '@/config'

const props = defineProps({
  index: {
    type: String,
    required: false
  }
})

const cardCompsMap = new Map([
  [2, CityCard],
  [0, WaterCard]
])

const commonState = useCommonStore()
const tabConfigList = vitalSignsTabs

const activeIndex = ref(props.index ? Number(props.index) : 0)

const areaDataList = ref([])
const thirdTypeList = ref([])

const curDate = dayjs().format('YYYY-MM-DD')
const nextDate = dayjs().add(1, 'day').format('YYYY-MM-DD')

let searchForm = reactive({
  alarming: 'true',
  thirdType: undefined,
  eventStatus: undefined,
  sortTimeFiled: 'latestCheckTime',
  latestCheckEndTime: `${nextDate} 00:00:00`,
  latestCheckStartTime: `${curDate} 00:00:00`
})

const defaultDateRange = ref([
  new Date(searchForm.latestCheckStartTime),
  new Date(searchForm.latestCheckEndTime)
])

const customListRef = ref()
const isTabChange = ref(false)
const tabChangeHandler = (index, level) => {
  isTabChange.value = true
  searchForm = Object.assign(searchForm, {
    alarming: 'true',
    thirdType: undefined,
    eventStatus: undefined,
    latestCheckEndTime: `${nextDate} 00:00:00`,
    latestCheckStartTime: `${curDate} 00:00:00`
  })
  const tempList =
    tabConfigList[level === 1 ? index : activeIndex.value].children
  if (tempList.length) {
    const { title } = tempList[level === 1 ? 0 : index]
    thirdTypeList.value = areaDataList.value.filter(
      (item) => item.model === title
    )
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
  () => defaultDateRange.value,
  (dateRange) => {
    const [start, end] = dateRange
    searchForm.latestCheckStartTime = `${dayjs(start).format(
      'YYYY-MM-DD'
    )} 00:00:00`
    searchForm.latestCheckEndTime = `${dayjs(end).format(
      'YYYY-MM-DD'
    )} 00:00:00`
  }
)

watch(
  () => searchForm,
  () => {
    if (!isTabChange.value) {
      customListRef.value.getDataList(searchForm)
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
          @change="(index) => tabChangeHandler(index, 1)"
        >
        </common-tabs>
      </div>
      <div class="ctx-wrap">
        <div class="ctx-inner">
          <custom-list
            v-if="tabConfigList[activeIndex].children?.length"
            ref="customListRef"
            :key="activeIndex"
            :default-search-form="searchForm"
            :tab-config-list="tabConfigList[activeIndex].children"
            @inner-tab-change="(index) => tabChangeHandler(index, 2)"
          >
            <template #card-item="{ data, index }">
              <div class="card-wrap">
                <component
                  :is="cardCompsMap.get(activeIndex)"
                  :data="data"
                  :origin-type="tabConfigList[activeIndex].title"
                  :second-type="
                    tabConfigList[activeIndex].children[index].title
                  "
                >
                </component>
              </div>
            </template>
            <template #search>
              <div class="search-wrap">
                <third-filter
                  v-model="searchForm.thirdType"
                  :list="thirdTypeList"
                ></third-filter>
                <common-search>
                  <template #custom-select>
                    <div class="select-wrap">
                      <common-calendar
                        v-model="defaultDateRange"
                        label="时间选择"
                        :default-date="defaultDateRange"
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
                        :list="mapToList(eventStatusMap)"
                        label="处置状态"
                      >
                      </common-sheet>
                    </div>
                  </template>
                </common-search>
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
