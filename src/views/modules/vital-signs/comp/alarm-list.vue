<script setup>
import { useRoute } from 'vue-router'

import CommonList from '@/views/common/common-list.vue'
import CommonTitle from '@/views/common/common-title.vue'
import CommonInput from '@/views/common/common-input.vue'

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
</script>

<template>
  <div class="alarm-list">
    <div class="header-wrap">
      <common-title text="报警信息"></common-title>
      <div class="header-inner">
        <common-input></common-input>
      </div>
    </div>
    <div class="alarm-ctx">
      <common-list :config="listConfig">
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
    }
  }

  .alarm-ctx {
    padding: 0 16px;
  }
}
</style>
