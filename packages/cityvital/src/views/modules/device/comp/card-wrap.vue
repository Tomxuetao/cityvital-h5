<script setup>
import { ref, watch } from 'vue'

import CardItem from './card-item.vue'

const props = defineProps({
  list: {
    type: Array,
    required: true
  }
})

const activeIndex = ref(0)

const secondaryActiveIndex = ref(0)

const secondaryList = ref(
  (props.list && props.list.length) > 0
    ? props.list[activeIndex.value]?.children
    : []
)

const changeIndex = (index, level) => {
  if (level === 1) {
    if (activeIndex.value !== index) {
      secondaryList.value = props.list[index]?.children
      activeIndex.value = index
      secondaryActiveIndex.value = 0
    }
  } else {
    if (secondaryActiveIndex.value !== index) {
      secondaryActiveIndex.value = index
    }
  }
}

watch(
  () => props.list,
  () => {
    activeIndex.value = 0
    secondaryActiveIndex.value = 0
  }
)
</script>

<template>
  <div class="card-wrap">
    <card-item
      v-for="(item, index) in list"
      :data="item"
      :key="index"
      :class="[index === activeIndex ? 'card-active' : '']"
      @click="changeIndex(index, 1)"
    >
    </card-item>
  </div>
  <div class="card-wrap">
    <card-item
      v-for="(item, index) in secondaryList"
      :data="item"
      :key="index"
      :class="[index === secondaryActiveIndex ? 'card-active' : '']"
      @click="changeIndex(index, 2)"
    >
    </card-item>
  </div>
  <div class="card-wrap">
    <template v-if="secondaryList[secondaryActiveIndex]">
      <card-item
        v-for="(item, index) in secondaryList[secondaryActiveIndex]?.children"
        :data="item"
        :key="index"
      >
      </card-item>
    </template>
  </div>
</template>

<style scoped lang="scss">
.card-wrap {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 12px 0;
  margin: 0 -8px -8px 0;

  .item-wrap {
    margin: 0 8px 8px 0;
  }

  .card-active {
    :deep(.item-text) {
      color: #0482ff;
    }

    :deep(.item-title) {
      color: #0482ff;
    }
  }

  &:nth-child(2n) {
    &:before {
      position: absolute;
      content: "";
      top: 0;
      width: 100%;
      height: 0.5px;
      background-color: #eeeeee;
    }

    &:after {
      position: absolute;
      content: "";
      bottom: 8px;
      width: 100%;
      height: 0.5px;
      background-color: #eeeeee;
    }
  }
}
</style>
