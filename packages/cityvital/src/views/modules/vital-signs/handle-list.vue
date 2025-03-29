<script setup>
import { ref, watch } from 'vue'

import CommonList from '../../common/common-list.vue'
import CommonTitle from '../../common/common-title.vue'
import CommonCalendar from '../../common/common-calendar.vue'
import HandleCard from './comp/handle-card.vue'

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

const dateRange = ref([])

watch(() => dateRange.value, (dateRange) => {
  const tempSearchForm = {
    endtime: undefined,
    begintime: undefined
  }
  if (dateRange.length > 1) {
    const [start, end] = dateRange
    tempSearchForm.endtime = end
    tempSearchForm.begintime = start
  }
  commonListRef.value.getDataList(tempSearchForm)
}, { deep: true })

</script>

<template>
  <div class="handle-list">
    <div class="list-inner">
      <div class="inner-header">
        <common-title text="报警处置">
          <common-calendar v-model="dateRange" :show-label="true" label="请选择起始日期" format="YYYY-MM-DD"></common-calendar>
        </common-title>
      </div>
      <div class="inner-ctx">
        <common-list :config="listConfig" ref="commonListRef">
          <template #card-item="{ data }">
            <handle-card :item-data="data"></handle-card>
          </template>
        </common-list>
      </div>
    </div>
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
