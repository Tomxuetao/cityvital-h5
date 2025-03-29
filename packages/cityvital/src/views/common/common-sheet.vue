<script setup>
import { getImgUrlFn } from '@/utils'

const getImgUrl = getImgUrlFn('../views/common/img')

const props = defineProps({
  modelValue: {},
  label: {
    type: String,
    required: false
  },
  list: {
    type: Array,
    required: true
  },
  canClear: {
    type: Boolean,
    required: false,
    default: true
  },
  triggerType: {
    type: Number,
    required: false,
    default: 0
  },
  activeColor: {
    type: String,
    required: false,
    default: () => 'rgb(4, 130, 255)'
  }
})

const emit = defineEmits(['update:modelValue'])

const show = ref(false)

const actionList = ref(
  [...props.list].map((item) => {
    return {
      ...item,
      color: item.value === props.modelValue ? props.activeColor : ''
    }
  })
)

const selectName = ref(actionList.value.find((item) => item.value === props.modelValue)?.name || props.label)

const selectHandler = (action) => {
  actionList.value.forEach((item) => {
    Object.assign(item, { color: '' })
  })
  action.color = props.activeColor
  selectName.value = action.name
  emit('update:modelValue', action.value)
}

const cancelHandler = () => {
  if (props.canClear) {
    actionList.value.forEach((item) => {
      Object.assign(item, { color: '' })
    })
    selectName.value = props.label
    emit('update:modelValue', undefined)
  }
}

watch(() => props.list, (list) => {
  actionList.value = list.map(item => {
    return {
      ...item,
      color: item.value === props.modelValue ? props.activeColor : ''
    }
  })
  selectName.value = list.find((item) => item.value === props.modelValue)?.name || props.label
}, { deep: true })

watch(
  () => props.modelValue,
  (value) => {
    selectName.value = actionList.value.find((item) => item.value === value)?.name || props.label
    if (value === undefined) {
      actionList.value.forEach((item) => {
        Object.assign(item, { color: '' })
      })
    }
  },
  { immediate: false }
)
</script>

<template>
  <div class="common-sheet">
    <div class="trigger-wrap" @click.stop="show = true">
      <div :class="['trigger-text', 'text-' + triggerType]">{{ selectName }}</div>
      <img
        :class="['trigger-img', show ? 'trigger-active' : '']"
        :src="getImgUrl(triggerType ? 'icon-arrow2' : 'icon-arrow')"
        alt=""
      />
    </div>
    <van-action-sheet
      v-model:show="show"
      :actions="actionList"
      :cancel-text="canClear ? '清除' : '关闭'"
      close-on-click-action
      @select="selectHandler"
      @cancel="cancelHandler"
      v-bind="$attrs"
    >
    </van-action-sheet>
  </div>
</template>

<style scoped lang="scss">
.common-sheet {
  width: auto;

  .trigger-wrap {
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;

    .trigger-text {
      color: #333333;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
    }

    .text-0 {
      min-width: 48px;
    }

    .text-1 {
      height: 14px;
      font-size: 14px;
      color: #0482ff;
      line-height: 14px;
      margin-right: 4px;
      font-weight: 500;
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
