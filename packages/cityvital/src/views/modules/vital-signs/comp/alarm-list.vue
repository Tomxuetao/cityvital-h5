<script setup>
import dayjs from 'dayjs'
import {
 reactive, ref, watch
} from 'vue'
import { useRoute } from 'vue-router'

import {
 deviceStatusMap, eventStatusMap, mapToList 
} from '@/config'

import AlarmCard from './alarm-card.vue'
import ElectronicscreensCard from './electronicscreens-card.vue'

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})

const route = useRoute()

const listConfig = {
  code: 'api/v1/event/listAlarms',
  prefix: '',
  method: 'post',
  isIndexServer: false,
  customForm: {
    sortTimeFiled: 'latestCheckTime',
    originType: route.query.originType,
    secondType: route.query.secondType,
    thirdType: route.query.thirdType,
    factory_id: route.query.id,
    extraList: props.detail.factory_name + '%'
  }
}

let searchForm = reactive({
  alarming: undefined,
  eventStatus: undefined,
  latestCheckEndTime: undefined,
  latestCheckStartTime: undefined,
  sortTimeFiled: 'latestCheckTime'
})

const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(date).format(format)

const commonListRef = ref()
const dateRange = ref([])

watch(() => dateRange.value, (dateRange) => {
  const tempDate = {
    latestCheckEndTime: undefined,
    latestCheckStartTime: undefined
  }
  if (dateRange.length > 1) {
    const [start, end] = dateRange
    tempDate.latestCheckEndTime = formatDate(end)
    tempDate.latestCheckStartTime = formatDate(start)
  }
  searchForm = Object.assign(searchForm, tempDate)
})

watch(() => searchForm, () => {
  commonListRef.value.getDataList(searchForm)
}, { deep: true })
</script>

<template>
  <div class="alarm-list">
    <div class="header-wrap">
      <common-title text="报警信息"></common-title>
      <div class="header-inner">
        <common-search>
          <template #custom-select>
            <div class="select-wrap">
              <common-calendar
                v-model="dateRange"
                label="时间选择"
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
    </div>
    <div class="alarm-ctx">
      <common-list ref="commonListRef" :config="listConfig" :default-search-form="searchForm">
        <template #card-item="{ data }">
          <alarm-card :item-data="data" v-if="detail.model != '户外电子屏'"></alarm-card>
          <electronicscreens-card :item-data="data" v-else></electronicscreens-card>
        </template>
      </common-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
.alarm-list {
  .header-wrap {
    .header-inner {
      padding: 0 16px;

      .select-wrap {
        display: flex;
      }
    }
  }

  .alarm-ctx {
    position: relative;
    padding: 0 16px;
    min-height: 320px;
  }
}
</style>
