<script setup>
import { markerConfigMap } from '@/utils'

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

const computeStyle = (name) => markerConfigMap.get(name) || { anchor: 'bottom', color: '#dc5873' }
</script>

<template>
  <div class="index-marker" :style="{ top: data.y, left: data.x}">
    <div :class="['marker-inner', `marker-inner-${computeStyle(data.name).anchor}`]">
      <div class="inner-anchor"></div>
      <div class="inner-text" :style="{backgroundColor: `${computeStyle(data.name).color}`}">{{ data.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-marker {
  position: absolute;

  .marker-inner {
    display: grid;
    grid-gap: 4px;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;

    .inner-anchor {
      position: relative;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      border: 2px solid red;

      &:before {
        position: absolute;
        width: 6px;
        height: 6px;
        content: '';
        top: 50%;
        left: 50%;
        border-radius: 50%;
        background-color: red;
        transform: translate(-50%, -50%);
      }
    }

    .inner-text {
      display: grid;
      color: #ffffff;
      height: 24px;
      font-size: 14px;
      padding: 0 12px;
      font-weight: 500;
      align-items: center;
      text-align: center;
      border-radius: 12px;
      border: 2px solid #ffffff;
    }

    &-left {
      grid-auto-flow: column;
    }

    &-right {
      direction: rtl;
      grid-auto-flow: column;
    }

    &-bottom {
      direction: revert;
    }
  }
}
</style>
