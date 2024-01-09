<script setup>
import dayjs from 'dayjs'
import { reactive, ref, watch } from 'vue'

import { mapToList, manageEventStatusMap } from '@/config'

import CommonList from '@/views/common/common-list.vue'
import CommonTitle from '@/views/common/common-title.vue'
import CommonSheet from '@/views/common/common-sheet.vue'
import CommonCalendar from '@/views/common/common-calendar.vue'
import AnalysisCard from '@/views/modules/manage/comp/analysis-card.vue'


const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  index: {
    type: String,
    required: true
  }
})

const today = dayjs().format('YYYY-MM-DD')

const configMap = new Map([
  ['0', {
    code: '212a8a32cf',
    isIndexServer: true,
    customForm: {
      model_id: props.id
    }
  }],
  ['1', {
    code: '2269860892',
    isIndexServer: true,
    customForm: {
      analyze_title: props.name
    }
  }],
  ['2', {
    code: '212a8a32cf',
    isIndexServer: true,
    customForm: {}
  }]
])

const total = ref(0)
const commonListRef = ref()
const showCalendar = ref(false)
const dateRange = ref([today, today])
const selectDateStr = ref(`${today} - ${today}`)

const formatDate = (date) => dayjs(date).format('YYYY-MM-DD')

let searchForm = reactive({
  enddate: today,
  begindate: today,
  event_status: undefined
})

watch(() => dateRange.value, (dateRange) => {
  const tempSearch = {
    enddate: undefined,
    begindate: undefined
  }
  selectDateStr.value = '请选择日期'
  if (dateRange.length > 1) {
    const [start, end] = dateRange
    tempSearch.enddate = formatDate(end)
    tempSearch.begindate = formatDate(start)
    selectDateStr.value = `${tempSearch.begindate} - ${tempSearch.enddate}`
  }

  searchForm = Object.assign(searchForm, tempSearch)
}, { deep: true })

watch(() => searchForm, () => {
  commonListRef.value.getDataList(searchForm)
}, { deep: true })
</script>

<template>
  <div class="analysis-wrap">
    <div class="analysis-header">
      <div class="header-inner">
        <div
          class="inner-date"
          @click="showCalendar = true"
        >
          <div class="date-text"> {{ selectDateStr }}</div>
          <div :class="['date-img', showCalendar ? 'img-active' : '']"></div>
        </div>
        <div class="inner-num">{{ total }}</div>
        <div class="inner-item">{{ name }}</div>
      </div>
    </div>
    <div class="analysis-ctx">
      <div class="ctx-inner">
        <div class="inner-title">
          <common-title text="研判结果列表">
            <common-sheet v-model="searchForm.event_status" :list="mapToList(manageEventStatusMap)" label="全部"></common-sheet>
          </common-title>
        </div>
        <div class="inner-list">
          <common-list
            ref="commonListRef"
            :config="configMap.get(index)"
            :default-search-form="searchForm"
            @count-change="count => total = count"
          >
            <template #card-item="{ data }">
              <analysis-card :data="data" :index="index"></analysis-card>
            </template>
          </common-list>
        </div>
      </div>
    </div>
  </div>

  <common-calendar v-model="dateRange" v-model:show="showCalendar" :show-label="false"></common-calendar>
</template>

<style scoped lang="scss">
.analysis-wrap {
  .analysis-header {
    height: 128px;
    width: 375px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("@/views/modules/sign/img/img-sign-bg.webp");

    .header-inner {
      padding: 16px 0 24px 20px;

      .inner-date {
        height: 14px;
        display: flex;
        line-height: 14px;
        align-items: center;
        margin-bottom: 12px;

        .date-text {
          color: #0482ff;
          font-size: 14px;
        }

        .date-img {
          width: 13px;
          height: 12px;
          margin-left: 4px;
          background-size: cover;
          background-repeat: no-repeat;
          background-image: url("@/views/modules/manage/img/icon-arrow.webp");
        }

        .img-active {
          transform: rotate(180deg);
        }
      }

      .inner-num {
        height: 36px;
        font-size: 36px;
        color: #0482ff;
        line-height: 36px;
        margin-bottom: 4px;
        font-family: Alternate-Bold;
      }

      .inner-item {
        height: 28px;
        font-size: 20px;
        color: #333333;
        line-height: 28px;
        font-family: YouSheBiaoTiHei;
      }
    }
  }

  .analysis-ctx {
    padding: 0 12px;
    margin-top: -12px;

    .ctx-inner {
      background: #ffffff;
      border-radius: 12px;
      min-height: calc(100vh - 24px);
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

      .inner-list {
        padding: 0 16px;
        margin-top: -16px;

        :deep(.list-wrap) {
          .list-item {
            position: relative;

            &:after {
              position: absolute;
              width: 100%;
              content: "";
              height: 0.5px;
              background-color: #eeeeee;
            }
          }
        }
      }
    }
  }
}
</style>
