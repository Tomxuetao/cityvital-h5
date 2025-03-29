<script setup>
import { commonBackEndApi } from '@/api/common-api'
import { reactive, watch } from 'vue'
import { useCommonStore } from '@/store'
import CommonTitle from '@/views/common/common-title.vue'
import CommonField from '@/views/common/common-field.vue'

import {
 alarmLevelMap, eventStatusMap, mapToList 
} from '@/config'

defineProps({
  name: {
    type: String,
    required: true
  }
})

const commonStore = useCommonStore()

const emit = defineEmits(['expose-form'])

let searchForm = reactive({
  type: undefined,
  streetCode: undefined,
  eventStatus: undefined,
  districtCode: undefined,
  emergencyDegree: undefined
})

const exposeFormHandler = (isReset) => {
  if (isReset) {
    searchForm = Object.assign(searchForm, {
      type: undefined,
      streetCode: undefined,
      eventStatus: undefined,
      districtCode: undefined,
      emergencyDegree: undefined
    })
  }
  emit('expose-form', searchForm)
}

const dataListMap = new Map([
  ['eventStatus', mapToList(eventStatusMap)],
  ['emergencyDegree', mapToList(alarmLevelMap)]
])

watch(() => searchForm.districtCode, async (value) => {
  searchForm.streetCode = undefined
  const tempList = commonStore.regionListMap.get(value)
  if (!tempList) {
    const regionList = await commonBackEndApi('dailyReport/app/event/operation/eventDistrictCity', {
      pid: value,
      poltype: '4'
    }, 'post')
    commonStore.updateRegionList(value, regionList || [])
  }
})
</script>

<template>
  <div class="search-page">
    <div class="page-inner">
      <common-title text="告警明细事件筛选"></common-title>
      <div class="form-wrap">
        <van-form>
          <common-field
            label="告警等级"
            placeholder="请选择"
            v-model="searchForm.emergencyDegree"
            :list="dataListMap.get('emergencyDegree')"
          />
          <common-field
            label="事件类型"
            placeholder="请选择"
            v-model="searchForm.type"
            :list="commonStore.eventTypeMap.get(name)"
          />
          <common-field
            label="所属城区"
            placeholder="请选择"
            v-model="searchForm.districtCode"
            :list="commonStore.regionListMap.get('top-level')"
          />
          <common-field
            label="所属街道"
            placeholder="请先选择城区"
            :disabled="!searchForm.districtCode"
            v-model="searchForm.streetCode"
            :list="commonStore.regionListMap.get(searchForm.districtCode)"
          />
          <common-field
            label="处置状态"
            placeholder="请选择"
            v-model="searchForm.eventStatus"
            :list="dataListMap.get('eventStatus')"
          />
        </van-form>
      </div>
    </div>
    <div class="btn-wrap">
      <div class="btn-item btn-reset" @click="exposeFormHandler(true)">重置</div>
      <div class="btn-item btn-confirm" @click="exposeFormHandler(false)">确定</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-page {
  padding: 12px 0;
  margin-bottom: 64px;

  .page-inner {
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

    .form-wrap {
      padding-bottom: 12px;
    }
  }

  .btn-wrap {
    position: fixed;
    bottom: 24px;
    display: grid;
    grid-gap: 0 12px;
    grid-template-columns: repeat(2, 1fr);

    .btn-item {
      bottom: 24px;
      height: 44px;
      width: 170px;
      font-size: 18px;
      line-height: 44px;
      text-align: center;
      border-radius: 8px;
      border: 1px solid #0482ff;
    }

    .btn-reset {
      color: #0482FF;
      background-color: #ffffff;
    }

    .btn-confirm {
      color: #ffffff;
      background-color: #0482FF;
      border: 1px solid transparent;
    }
  }
}
</style>
