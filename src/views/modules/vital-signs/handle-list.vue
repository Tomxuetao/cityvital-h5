<script setup>
import dayjs from 'dayjs'
import { ref, watch } from 'vue'

import CommonList from '@/views/common/common-list.vue'
import CommonTitle from '@/views/common/common-title.vue'
import CommonCalendar from '@/views/common/common-calendar.vue'
import HandleCard from '@/views/modules/vital-signs/comp/handle-card.vue'

const props = defineProps({
  eventId: {
    type: String,
    required: true
  }
})

const listConfig = {
  code: '22686c6b78',
  isIndexServer: true,
  customForm: {
    event_id: props.eventId
  }
}

const commonListRef = ref()
const cellValue = ref('')
const showCalendar = ref(false)

const selectDateRange = ref([])

const formatDate = (date, format = 'YYYY-MM-DD') => dayjs(date).format(format)

watch(() => selectDateRange.value, (dateRange) => {
  const tempSearchForm = {
    endtime: undefined,
    begintime: undefined
  }
  if (dateRange.length > 1) {
    const [start, end] = dateRange
    tempSearchForm.endtime = formatDate(end)
    tempSearchForm.begintime = formatDate(start)
    cellValue.value = `${tempSearchForm.begintime} - ${tempSearchForm.endtime}`
  } else {
    cellValue.value = ''
  }
  commonListRef.value.getDataList(tempSearchForm)
}, { deep: true })

</script>

<template>
  <div class="handle-list">
    <div class="list-inner">
      <div class="inner-header">
        <common-title text="报警处置"></common-title>
        <van-cell title="请选择开始结束日期" is-link :value="cellValue" @click="showCalendar = true"/>
      </div>
      <div class="inner-ctx">
        <common-list :config="listConfig" ref="commonListRef">
          <template #card-item="{ data }">
            <handle-card :item-data="data"></handle-card>
          </template>
        </common-list>
      </div>
    </div>
    <common-calendar :show-label="false" v-model="selectDateRange" v-model:show="showCalendar"/>
  </div>
</template>

<style scoped lang="scss">
.handle-list {
  padding: 12px 12px 0 12px;

  .list-inner {
    background: #ffffff;
    border-radius: 12px;
    min-height: calc(100vh - 24px);
    box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

    .inner-header {
      :deep(.van-cell) {
        .van-cell__title {
          white-space: nowrap;
        }

        .van-cell__value {
          flex: 2;
          white-space: nowrap;
        }
      }
    }

    .inner-ctx {
      padding: 0 16px;
    }
  }
}
</style>
