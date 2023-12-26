<script setup>
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'

import CommonList from '@/views/common/common-list.vue'
import CommonTitle from '@/views/common/common-title.vue'
import CommonInput from '@/views/common/common-input.vue'

const route = useRoute()

const curDate = dayjs().format('YYYY-MM-DD')
const nextDate = dayjs().add(1, 'day').format('YYYY-MM-DD')

const listConfig = {
  code: 'event/listAlarms',
  prefix: '',
  method: 'post',
  isIndexServer: false,
  customForm: {
    sortTimeFiled: 'latestCheckTime',
    originType: route.query.originType,
    secondType: route.query.secondType,
    latestCheckEndTime: `${nextDate} 00:00:00`,
    latestCheckStartTime: `${curDate} 00:00:00`
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
      <common-list :config="listConfig"></common-list>
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
  }
}
</style>
