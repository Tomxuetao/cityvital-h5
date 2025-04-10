<script setup>
import { getTypeIconSrc } from '@/utils'

defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {
      return {
        icon: '',
        title: ''
      }
    }
  }
})
</script>

<template>
  <div class="common-marker" :style="{ top: data.y, left: data.x}">
    <img class="marker-img" :src="getTypeIconSrc(data.type)" alt="">
    <div class="marker-title">{{ data.name }}</div>
  </div>
</template>

<style scoped lang="scss">
.common-marker {
  position: absolute;
  display: grid;
  grid-gap: 0 4px;
  cursor: pointer;
  width: max-content;
  align-items: center;
  border-radius: 18px;
  grid-auto-flow: column;
  padding: 2px 8px 2px 2px;
  background-color: #ef691b;
  border: 1px solid #ffffff;
  grid-template-columns: max-content max-content;

  .marker-img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  .marker-title {
    color: #fff3f3;
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
  }
}
</style>
