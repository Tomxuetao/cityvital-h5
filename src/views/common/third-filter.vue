<script setup>
import { ref } from 'vue'

const props = defineProps({
  typeList: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['change'])

const activeType = ref(undefined)
const thirdTypeChange = (type) => {
  if (activeType.value === type) {
    activeType.value = undefined
  } else {
    activeType.value = type
  }
  emit('change', activeType.value)
}
</script>

<template>
  <div class="third-wrap">
    <div
      v-for="(item, index) in typeList"
      :key="index"
      :class="['third-item', activeType === item.type ? 'item-active' : '']"
      @click="() => thirdTypeChange(item.type)"
    >
      {{ item.type }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.third-wrap {
  display: flex;
  gap: 6px;
  padding-bottom: 12px;

  .third-item {
    height: 32px;
    color: #333333;
    padding: 7px 12px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 6px;
    background-color: #f5f7fa;
  }

  .item-active {
    color: #0482ff;
    background-color: rgba(4, 130, 255, 0.1);
  }
}
</style>
