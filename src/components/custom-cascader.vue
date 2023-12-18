<script setup>
import { ref } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['clear', 'confirm'])

const selectedList = ref([])
const cascaderChange = ({ selectedOptions }) => {
  selectedList.value = selectedOptions.map(item => {
    return {
      text: item.text,
      value: item.value
    }
  })
}

const cascaderFinish = () => {
  emit('confirm', selectedList.value)
}
</script>

<template>
  <van-popup v-bind="$attrs" position="bottom">
    <div class="popup-wrap">
      <div class="item-cancel" @click="emit('clear', [])">清除</div>
      <div class="item-confirm" @click="emit('confirm', selectedList)">确认</div>
    </div>
    <van-cascader
      :options="list"
      :show-header="false"
      @finish="cascaderFinish"
      @change="cascaderChange"
    >
    </van-cascader>
  </van-popup>
</template>

<style scoped lang="scss">
.popup-wrap {
  height: 42px;
  line-height: 42px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item-cancel, .item-confirm {
    font-size: 14px;
    font-weight: 400;
    color: #0482ff;

  }

  .item-title {
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: #333333;

  }
}
</style>
