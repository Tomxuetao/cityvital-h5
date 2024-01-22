<script setup>
import dayjs from 'dayjs'
import { ref, watch } from 'vue'

const nextDate = dayjs().add(1, 'day').format('YYYY-MM-DD')

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => []
  },
  label: {
    type: String,
    required: false
  },
  format: {
    type: String,
    required: false,
    default: 'MM-DD'
  },
  showLabel: {
    type: Boolean,
    required: false,
    default: () => true
  }
})

const emit = defineEmits(['update:modelValue', 'update:show'])

const calendarRef = ref()

const show = ref(false)

const [start, end] = props.modelValue

const startYear = new Date().getFullYear() - 1

const dateRange = ref(start ? [new Date(start), new Date(end)] : [])

const formatDate = (date, formatStr = '') => dayjs(date).format(formatStr || props.format)

const selectName = ref(props.modelValue.length > 1 ? `${formatDate(start)} - ${formatDate(end)}` : props.label)

const onClose = () => {
  show.value = false
  emit('update:show', false)
}

const onClear = () => {
  calendarRef.value.reset()
  onClose()
  emit('update:modelValue', [])
}

const onConfirm = (values) => {
  show.value = false
  const [start, end] = values
  const tempStart = formatDate(start)
  const tempEnd = formatDate(end)
  selectName.value = `${tempStart} - ${tempEnd}`
  onClose()
  emit('update:modelValue', [formatDate(start, 'YYYY-MM-DD'), formatDate(end, 'YYYY-MM-DD')])
}

watch(() => props.modelValue, (list) => {
  const [start, end] = list
  dateRange.value = start ? [new Date(start), new Date(end)] : []
  selectName.value = list.length > 1 ? `${formatDate(start)} - ${formatDate(end)}` : props.label
}, { deep: true })
</script>

<template>
  <div class="common-calendar">
    <div v-if="showLabel" class="trigger-wrap" @click.stop="show = true">
      <div class="trigger-text">{{ selectName }}</div>
      <img
        :class="['trigger-img', show ? 'trigger-active' : '']"
        src="@/views/common/img/icon-arrow.webp"
        alt=""
      />
    </div>
    <van-calendar
      v-model:show="show"
      ref="calendarRef"
      type="range"
      confirm-text="确认"
      confirm-disabled-text="请选择结束时间"
      :row-height="54"
      :show-mark="false"
      :lazy-render="true"
      :default-date="dateRange"
      :max-date="new Date(nextDate)"
      :min-date="new Date(startYear, 0, 1)"
      v-bind="$attrs"
      @confirm="onConfirm"
    >
      <template #title>
        <div class="header-wrap">
          <div class="header-btn" @click="onClose()">关闭</div>
          <div class="header-text">日期选择</div>
          <div class="header-btn" @click="onClear()">清除</div>
        </div>
      </template>
    </van-calendar>
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

  :deep(.van-popup) {
    .van-calendar {
      .van-calendar__header {
        .van-calendar__header-title {
          .header-wrap {
            display: flex;
            padding: 0 16px;
            align-items: center;
            justify-content: space-between;

            .header-btn {
              font-size: 16px;
              color: #0482ff;
              line-height: 24px;
              font-weight: 400;
            }
          }
        }
      }
    }

    .van-badge__wrapper {
      display: none;
    }
  }
}
</style>
