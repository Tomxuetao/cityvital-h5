<script setup>
defineProps({
  modelValue: {},
  list: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const active = ref(undefined)
const typeChange = (type) => {
  if (type === active.value) {
    emit('update:modelValue', undefined)
    active.value = undefined
  } else {
    emit('update:modelValue', type)
    active.value = type
  }
}
</script>

<template>
  <div class="third-wrap">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="['third-item', modelValue === item.type ? 'item-active' : '']"
      @click="() => typeChange(item.type)"
    >
      {{ item.type }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.third-wrap {
  display: flex;
  overflow-y: auto;
  padding-bottom: 12px;
  margin: 0 -6px -6px 0;

  .third-item {
    height: 32px;
    color: #333333;
    padding: 7px 12px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 6px;
    margin: 0 6px 6px 0;
    white-space: nowrap;
    background-color: #f5f7fa;
  }

  .item-active {
    color: #0482ff;
    background-color: rgba(4, 130, 255, 0.1);
  }
}
</style>
