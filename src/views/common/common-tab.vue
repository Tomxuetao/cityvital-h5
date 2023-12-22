<script setup>
import { ref, watch } from 'vue'

import { getImgUrlFn } from '@/utils'
import { useRoute, useRouter } from 'vue-router'

const getImgUrl = getImgUrlFn('../views/common/img')

const route = useRoute()
const router = useRouter()

const emit = defineEmits(['tab-change'])

const tabConfigList = [
  {
    text: '城市生命体征',
    routeName: 'vital-signs',
    icon: getImgUrl('icon-1'),
    activeIcon: getImgUrl('icon-1-active')
  },
  {
    text: '城市治理多跨协同',
    routeName: 'synergy',
    icon: getImgUrl('icon-2'),
    activeIcon: getImgUrl('icon-2-active')
  },
  {
    text: '城市便民服务',
    routeName: 'service',
    icon: getImgUrl('icon-3'),
    activeIcon: getImgUrl('icon-3-active')
  },
  {
    text: '管理在线',
    routeName: 'manage',
    icon: getImgUrl('icon-4'),
    activeIcon: getImgUrl('icon-4-active')
  }
]

const activeIndex = ref(tabConfigList.findIndex(item => item.routeName === route.name))
const changeTab = (index) => {
  if (index !== activeIndex.value) {
    const config = tabConfigList[index]
    emit('tab-change', config)
    router.push({ name: config.routeName })
  }
}

watch(() => route.name, (value) => {
  activeIndex.value = tabConfigList.findIndex(item => item.routeName === value)
})
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
    margin-top: -2px;
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
