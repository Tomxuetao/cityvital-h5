<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const nextDate = dayjs().add(1, 'day').format('YYYY-MM-DD')

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => []
  },
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const formatDate = (date) => `${date.getMonth() + 1}-${date.getDate()}`

const show = ref(false)

const [start, end] = props.modelValue

const selectName = ref(
  props.modelValue.length > 1
    ? `${formatDate(start)} - ${formatDate(end)}`
    : props.label
)

const onConfirm = (values) => {
  show.value = false
  const [start, end] = values
  selectName.value = `${formatDate(start)} - ${formatDate(end)}`
  emit('update:modelValue', values)
}
</script>

<template>
  <div class="common-calendar">
    <div class="trigger-wrap" @click.stop="show = true">
      <div class="trigger-text">{{ selectName }}</div>
      <img
        :class="['trigger-img', show ? 'trigger-active' : '']"
        src="@/views/common/img/icon-arrow.webp"
        alt=""
      />
    </div>
    <van-calendar
      v-model:show="show"
      type="range"
      confirm-text="完成"
      confirm-disabled-text="请选择结束时间"
      :lazy-render="true"
      :show-mark="false"
      :max-date="new Date(nextDate)"
      :min-date="new Date(2020, 0, 0)"
      v-bind="$attrs"
      @confirm="onConfirm"
    />
  </div>
</template>

<style scoped lang="scss">
.common-calendar {
  .trigger-wrap {
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;

    .trigger-text {
      min-width: 48px;
      color: #333333;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
    }

    .trigger-img {
      width: 12px;
      height: 12px;
      object-fit: cover;
    }

    .trigger-active {
      transform: rotate(180deg);
    }
  }
}
</style>
