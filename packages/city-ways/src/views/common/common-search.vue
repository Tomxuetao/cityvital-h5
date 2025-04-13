<script setup>
import { areaSet, typeMap } from '@/utils'

const emit = defineEmits(['search'])

const showAreaPicker = ref(false)
const showTypePicker = ref(false)
const searchForm = reactive({
  name: undefined,
  type: undefined,
  area: undefined
})

areaSet.delete('杭州市')
const areaColumns = [...areaSet].map(item => ({ text: item, value: item }))

const typeColumns = [...typeMap.keys()].map(item => ({ text: item, value: item }))

const onConfirm = ({ selectedValues }, key) => {
  showAreaPicker.value = false
  showTypePicker.value = false
  searchForm[key] = selectedValues[0]
  emit('search', { ...searchForm })
}

const onCancel = (key) => {
  showAreaPicker.value = false
  showTypePicker.value = false
  searchForm[key] = undefined
  emit('search', { ...searchForm })
}

const clearSearch = () => {
  searchForm.name = undefined
  emit('search', { ...searchForm })
}

const executeSearch = () => {
  emit('search', { ...searchForm })
}
</script>

<template>
  <div class="common-search">
    <form action class="search-form" style="width: 100%">
      <van-search
        v-model="searchForm.name"
        background="transparent"
        placeholder="请输入点位名称"
        @clear="clearSearch()"
        @search="executeSearch()"
      />
    </form>
    <div class="select-wrap">
      <div class="select-item" @click="showAreaPicker = true">
        <div :class="['van-field__control', searchForm.area ? 'van-field__control-value' : '']">
          {{ searchForm.area || '选择城区' }}
        </div>
        <van-icon name="arrow-down" color="#cacbce"/>
      </div>
      <div class="select-item" @click="showTypePicker = true">
        <div :class="['van-field__control', searchForm.type ? 'van-field__control-value' : '']">
          {{ searchForm.type || '选择类型' }}
        </div>
        <van-icon name="arrow-down" color="#cacbce"/>
      </div>
    </div>
  </div>
  <van-popup v-model:show="showAreaPicker" destroy-on-close round position="bottom">
    <van-picker
      title="请选择城区"
      cancel-button-text="清除"
      :model-value="[searchForm.area]"
      :columns="areaColumns"
      @cancel="onCancel('area')"
      @confirm="data => onConfirm(data, 'area')"
    />
  </van-popup>

  <van-popup v-model:show="showTypePicker" destroy-on-close round position="bottom">
    <van-picker
      title="请选择业态"
      cancel-button-text="清除"
      :model-value="[searchForm.type]"
      :columns="typeColumns"
      @cancel="onCancel('type')"
      @confirm="data => onConfirm(data, 'type')"
    />
  </van-popup>
</template>

<style scoped lang="scss">
.common-search {
  width: 375px;

  .select-wrap {
    display: grid;
    padding: 0 12px;
    grid-gap: 0 12px;
    grid-auto-flow: column;

    .select-item {
      display: grid;
      height: 32px;
      border-radius: 2px;
      align-items: center;
      padding: 0 8px 0 12px;
      grid-auto-flow: column;
      border: 1px solid #fff3f3;
      background-color: #f7f8fa;
      justify-content: space-between;
      grid-template-columns: 1fr max-content;

      .van-field__control {
        color: #cacbce;
        font-size: var(--van-cell-font-size);

        &-value {
          color: var(--van-field-input-text-color);
        }
      }
    }
  }
}
</style>
