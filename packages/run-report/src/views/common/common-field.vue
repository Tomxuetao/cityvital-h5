<script setup>
import { ref, watch } from 'vue'
import CommonSheet from '@/views/common/common-sheet.vue'

const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: () => []
  },
  modelValue: {}
})

const emit = defineEmits(['update:modelValue'])

const showSheet = ref(false)

const tempText = ref(undefined)

const tempValue = ref(undefined)

watch(() => props.modelValue, (value) => {
  if (value === undefined) {
    tempText.value = undefined
    tempValue.value = undefined
  }
})

watch(() => tempValue.value, (value) => {
  const { name } = props.list.find(item => item.value === value) || { name: undefined }
  tempText.value = name
  emit('update:modelValue', value)
})
</script>

<template>
  <van-field
    is-link
    readonly
    v-bind="$attrs"
    v-model="tempText"
    @click="showSheet = !$attrs.disabled"
  >
  </van-field>
  <common-sheet
    :list="props.list"
    v-model="tempValue"
    v-model:show="showSheet"
  >
  </common-sheet>
</template>

<style scoped lang="scss">

</style>
