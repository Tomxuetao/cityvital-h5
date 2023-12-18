<script setup>
import AlarmCard from '@/views/modules/alarm/comp/alarm-card.vue'
import CustomList from '@/views/modules/alarm/comp/custom-list.vue'

import { reactive, ref } from 'vue'
import { commonGatewayApi } from '@/api/gateway-api'

const tabList = [
  { title: '当前报警', code: '21f73cb8aa' },
  { title: '历史报警', code: '21f8389b4f' }
]
const customListRef = ref()

const treeList = ref([])
const getSearchTree = async () => {
  const dataList = await commonGatewayApi('21f7ec0b97')
  if (Array.isArray(dataList)) {
    dataList.forEach(({ page, model, type }) => {
      const tempData = treeList.value.find(temp => temp.text === page)
      if (tempData) {
        const temp = tempData.children.find(temp => temp.text === model)
        if (temp) {
          temp.children.push({ value: type, text: type })
        } else {
          tempData.children.push({ value: model, text: model, children: [{ value: type, text: type }] })
        }
      } else {
        treeList.value.push({
          value: page,
          text: page,
          children: [{ value: model, text: model, children: [{ value: type, text: type }] }]
        })
      }
    })
  }
}
getSearchTree()

const searchForm = reactive({
  page: undefined,
  model: undefined,
  type: undefined,
  alarm_level: undefined,
  alarm_status: undefined
})

const alarmLevelList = [
  { text: '一级报警', value: '1' },
  { text: '二级报警', value: '2' },
  { text: '三级报警', value: '3' },
  { text: '报警等级', value: undefined }
]

const alarmStatusList = [
  { text: '处置中', value: '处置中' },
  { text: '已处置', value: '已处置' },
  { text: '未处置', value: '未处置' },
  { text: '处置状态', value: undefined }
]

const showPopup = ref(false)

const getDataList = () => {
  customListRef.value.getDataList(searchForm)
}
const cascaderChange = (list) => {
  showPopup.value = false
  if (list.length) {
    const [data, data2, data3] = list
    if (data) {
      searchForm.page = data.value
    }
    if (data2) {
      searchForm.model = data2.value
    }
    if (data3) {
      searchForm.type = data3.value
    }
  } else {
    searchForm.page = undefined
    searchForm.model = undefined
    searchForm.type = undefined
  }
  getDataList()
}
</script>

<template>
  <div class="alarm-wrap">
    <custom-list :tab-config-list="tabList" ref="customListRef">
      <template #search>
        <van-dropdown-menu ref="menuRef" :overlay="false">
          <van-dropdown-item :title="searchForm.type || searchForm.model || searchForm.page || '监测领域'" @open="showPopup = true"></van-dropdown-item>
          <van-dropdown-item
            v-model="searchForm.alarm_level"
            :options="alarmLevelList"
            @change="() => getDataList()"
          />
          <van-dropdown-item
            v-model="searchForm.alarm_status"
            :options="alarmStatusList"
            @change="() => getDataList()"
          />
        </van-dropdown-menu>
      </template>
      <template #card-item="{ data, activeIndex }">
        <alarm-card :item="data"></alarm-card>
      </template>
    </custom-list>
  </div>
  <custom-cascader
    :list="treeList"
    :show="showPopup"
    @clear="cascaderChange"
    @confirm="cascaderChange"
  >
  </custom-cascader>
</template>

<style scoped lang="scss">
.alarm-wrap {
  :deep(.custom-wrapper) {
    .container-wrapper {
      margin-top: 12px;

      .van-list {
        display: grid;
        grid-gap: 12px 0;
      }
    }
  }
}
</style>
