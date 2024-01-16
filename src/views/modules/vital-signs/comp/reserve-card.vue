<script setup>
import dayjs from 'dayjs'
import { ref, watch } from 'vue'

import { commonGatewayApi } from '@/api/common-api'

const props = defineProps({
  status: {
    required: true
  },
  dateRange: {
    type: Array,
    required: true
  },
  modelValue: {}
})

const emit = defineEmits(['update:modelValue'])

const dataList = ref([
  { text: '人工巡查报警', key: '人工巡查', num: '0', unit: '个' },
  { text: '勘探机报警', key: '勘探机', num: '0', unit: '个' },
  { text: '挖掘机报警', key: '挖掘机', num: '0', unit: '个' },
  { text: '打桩机报警', key: '打桩机', num: '0', unit: '个' }
])

const activeIndex = ref(undefined)

const boxIndexChange = (index) => {
  if (index !== activeIndex.value) {
    activeIndex.value = index
    emit('update:modelValue', dataList.value[index].key)
  } else {
    activeIndex.value = undefined
    emit('update:modelValue', undefined)
  }
}

const getDataList = async (searchForm = {}) => {
  const tempDataList = await commonGatewayApi('21b60e58e5', Object.assign({ is_bj: '1' }, searchForm))

  if (Array.isArray(tempDataList)) {
    const tampDataMap = new Map()
    tempDataList.reduce((acc, cur) => {
      const num = acc.get(cur.item_name)
      acc.set(cur.item_name, num === undefined ? +cur.rn : +cur.rn + num)
      return acc
    }, tampDataMap)

    dataList.value.forEach(item => {
      const num = tampDataMap.get(item.key)
      Object.assign(item, { num: num || 0 })
    })
  }
}

watch(() => [props.status, props.dateRange], ([status, dateRange]) => {
  let tempSearch = {
    alarm_status: status
  }
  if (dateRange.length > 1) {
    const [start, end] = dateRange
    Object.assign(tempSearch, {
      end_time: `${dayjs(end).format('YYYY-MM-DD')} 00:00:00`,
      start_time: `${dayjs(start).format('YYYY-MM-DD')} 00:00:00`
    })
  }
  getDataList(tempSearch)
}, { immediate: true, deep: true })
</script>

<template>
  <div class="reserve-card">
    <div class="reserve-inner">
      <div
        :class="['card-item', activeIndex === index ? 'item-active' : '']"
        v-for="(item, index) in dataList"
        :key="index"
        @click="boxIndexChange(index)"
      >
        <div class="item-text">{{ item.text }}</div>
        <div class="num-wrap">
          <div class="num-text">{{ item.num }}</div>
          <div class="num-unit">{{ item.unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reserve-card {
  .reserve-inner {
    display: grid;
    grid-gap: 12px;
    grid-template-rows: repeat(2, 74px);
    grid-template-columns: repeat(2, 1fr);

    .card-item {
      display: flex;
      padding: 10px 0;
      align-items: center;
      flex-direction: column;
      border-radius: 2px;
      border: 0.5px solid #e5e5e5;

      .item-text {
        height: 20px;
        font-size: 14px;
        text-align: center;
        color: #666666;
        line-height: 20px;
      }

      .num-wrap {
        display: flex;
        align-items: flex-end;

        .num-text {
          height: 32px;
          font-size: 24px;
          color: #333333;
          line-height: 32px;
          font-weight: Bold;
          text-align: center;
          font-family: Alternate-Bold;
        }

        .num-unit {
          height: 20px;
          font-size: 12px;
          color: #999999;
          line-height: 20px;
          margin-left: 2px;
        }
      }
    }

    .item-active {
      border-radius: 2px;
      border: 0.5px solid transparent;
      background-image: linear-gradient(180deg, rgba(4, 130, 255, 0.3), rgba(4, 130, 255, 0) 100%);

      .item-text {
        color: #0482FF;
      }

      .num-wrap {
        .num-unit {
          color: #0482FF;
        }

        .num-text {
          color: #0482FF;
        }
      }
    }
  }
}
</style>
