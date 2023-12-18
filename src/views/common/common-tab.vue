<script setup>
import { ref } from 'vue'

import { getImgUrlFn } from '@/utils'

const getImgUrl = getImgUrlFn('../views/common/img')

const props = defineProps({
  active: {
    type: Number,
    default: () => 0
  }
})

const emit = defineEmits(['tab-change'])

const tabConfigList = [
  { text: '城市生命体征', icon: getImgUrl('icon-1'), activeIcon: getImgUrl('icon-1-active') },
  { text: '城市治理多跨协同', icon: getImgUrl('icon-2'), activeIcon: getImgUrl('icon-2-active') },
  { text: '城市便民服务', icon: getImgUrl('icon-3'), activeIcon: getImgUrl('icon-3-active') },
  { text: '管理在线', icon: getImgUrl('icon-4'), activeIcon: getImgUrl('icon-4-active') }
]

const activeIndex = ref(props.active || 0)

const changeTab = (index) => {
  if (index !== activeIndex.value) {
    activeIndex.value = index
    emit('tab-change', index)
  }
}
</script>

<template>
  <div class="tab-wrap">
    <div class="tab-inner">
      <div
        v-for="(item, index) in tabConfigList"
        :key="index"
        :class="['tab-item', index === activeIndex ? 'item-active' : '']"
        @click="changeTab(index)"
      >
        <img class="item-img" :src="index === activeIndex ? item.activeIcon : item.icon" alt=""/>
        <div class="item-text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-wrap {
  height: 54px;
  background-color: #ffffff;

  .tab-inner {
    height: 54px;
    display: grid;
    grid-auto-flow: column;
    padding: 6px 20px 4px 20px;
    grid-template: max-content / max-content;

    .tab-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;

      .item-img {
        width: 26px;
        height: 26px;
        line-height: 26px;
        object-fit: cover;
      }

      .item-text {
        height: 20px;
        color: #999999;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
      }
    }

    .item-active {
      .item-text {
        color: #0482FF;
      }
    }
  }
}
</style>
