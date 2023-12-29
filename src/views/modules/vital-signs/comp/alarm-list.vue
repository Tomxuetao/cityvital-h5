<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import { deviceStatusMap, eventStatusMap, mapToList } from '@/config'

import CommonList from '@/views/common/common-list.vue'
import CommonTitle from '@/views/common/common-title.vue'
import CommonSheet from '@/views/common/common-sheet.vue'
import CommonSearch from '@/views/common/common-search.vue'
import CommonCalendar from '@/views/common/common-calendar.vue'
import AlarmCard from '@/views/modules/vital-signs/comp/alarm-card.vue'

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})

const route = useRoute()

const listConfig = {
  code: 'event/listAlarms',
  prefix: '',
  method: 'post',
  isIndexServer: false,
  customForm: {
    extraList: props.detail.factory_name + '%',
    sortTimeFiled: 'latestCheckTime',
    originType: route.query.originType,
    secondType: route.query.secondType
  }
}

let searchForm = reactive({
  alarming: undefined,
  thirdType: undefined,
  eventStatus: undefined,
  sortTimeFiled: 'latestCheckTime',
  latestCheckEndTime: undefined,
  latestCheckStartTime: undefined
})

const defaultDateRange = ref([])
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
    </div>
    <div class="alarm-ctx">
      <common-list :config="listConfig" :default-search-form="searchForm">
        <template #card-item="{ data }">
          <alarm-card :item-data="data"></alarm-card>
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
    padding: 0 16px;
  }
}
</style>
