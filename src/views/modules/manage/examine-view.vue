<script setup>
import WeekView from '@/views/modules/manage/comp/week-view.vue'
import MonthView from '@/views/modules/manage/comp/month-view.vue'
import TodayView from '@/views/modules/manage/comp/today-view.vue'

import { ref } from 'vue'

import CommonTitle from '@/views/common/common-title.vue'

const viewCompsMap = new Map([
  [0, TodayView],
  [1, WeekView],
  [2, MonthView]
])

const tabConfigList = [
  { text: '今天' },
  { text: '周' },
  { text: '月' }
]

const activeIndex = ref(0)
const changeTab = (index) => {
  activeIndex.value = activeIndex.value !== index ? index : activeIndex.value
}
</script>

<template>
  <div class="examine-view">
    <div class="examine-inner">
      <div class="inner-title">
        <common-title text="考核评价">
          <div class="tabs-wrap">
            <div
              v-for="(tab, index) in tabConfigList"
              :key="index"
              :class="[ 'tab-item',activeIndex === index ? 'tab-active' : '']"
              @click="changeTab(index)"
            >
              {{ tab.text }}
            </div>
          </div>
        </common-title>
      </div>

      <div class="inner-ctx">
        <component :is="viewCompsMap.get(activeIndex)"></component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.examine-view {
  padding: 12px;

  .examine-inner {
    min-height: calc(100vh - 24px);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

    .inner-title {
      .tabs-wrap {
        display: grid;
        align-items: center;
        grid-template-columns: repeat(3, 1fr);

        .tab-item {
          height: 22px;
          color: #666666;
          font-size: 12px;
          padding: 2px 8px;
          line-height: 18px;
          text-align: center;
          background-color: #ffffff;
          border: 0.5px solid #d9d9d9;

          &:nth-child(2) {
            border-left: 0;
            border-right: 0;
          }

          &:nth-child(1) {
            border-radius: 4px 0 0 4px;
          }

          &:nth-child(3) {
            border-radius: 0 4px 4px 0;
          }
        }

        .tab-active {
          color: #ffffff;
          background-color: #0482ff;
          border: 0.5px solid transparent;
        }
      }
    }

    .inner-ctx {
      padding: 0 16px;
    }
  }
}
</style>
