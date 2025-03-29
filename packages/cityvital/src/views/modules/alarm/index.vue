<script setup>
import CustomList from '../../common/custom-list.vue'
import CommonCascader from '../../common/common-cascader.vue'
import AlarmCard from './comp/alarm-card.vue'

import { reactive, ref } from 'vue'
import { useCommonStore } from '@/store'

const tabList = [
  {
    title: '当前报警',
    code: '21f73cb8aa',
    prefix: '/share-api/data/admin',
    customForm: { alarm_level: '1,2' }
  },
  {
    title: '历史报警',
    code: '21f8389b4f',
    prefix: '/share-api/data/admin',
    customForm: {}
  }
]
const customListRef = ref()

const commonState = useCommonStore()

const treeList = ref([])
const getSearchTree = async () => {
  // 获取领域分类
  const dataList = await commonState.initAreaListAction()
  if (Array.isArray(dataList)) {
    dataList.forEach(({ page, model, type }) => {
      const tempData = treeList.value.find((temp) => temp.text === page)
      if (tempData) {
        const temp = tempData.children.find((temp) => temp.text === model)
        if (temp) {
          temp.children.push({ value: type, text: type })
        } else {
          tempData.children.push({
            value: model,
            text: model,
            children: [{ value: type, text: type }]
          })
        }
      } else {
        treeList.value.push({
          value: page,
          text: page,
          children: [
            {
              value: model,
              text: model,
              children: [{ value: type, text: type }]
            }
          ]
        })
      }
    })
  }
}
getSearchTree()

let searchForm = reactive({
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
    searchForm = Object.assign(searchForm, {
      page: undefined,
      model: undefined,
      type: undefined
    })
  }
  getDataList()
}
</script>

<template>
  <div class="alarm-wrap">
    <custom-list
      ref="customListRef"
      :tab-config-list="tabList"
      :extend-config="{
        hasFilter: false,
        sticky: true,
        alwaysShowSearch: true,
      }"
    >
      <template #search>
        <van-dropdown-menu :overlay="false">
          <van-dropdown-item
            :title="
              searchForm.type ||
              searchForm.model ||
              searchForm.page ||
              '监测领域'
            "
            @open="showPopup = true"
          >
          </van-dropdown-item>
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
      <template #card-item="{ data }">
        <alarm-card :item="data"></alarm-card>
      </template>
    </custom-list>
  </div>
  <common-cascader
    :list="treeList"
    :show="showPopup"
    @clear="cascaderChange"
    @confirm="cascaderChange"
  >
  </common-cascader>
</template>

<style scoped lang="scss">
.alarm-wrap {
  :deep(.common-list) {
    .search-slot {
      position: relative;

      &:before {
        position: absolute;
        content: "";
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 0.5px;
        background-color: #f0f2f5;
      }

      .van-dropdown-menu {
        .van-dropdown-menu__bar {
          box-shadow: none;
        }
      }
    }

    .list-wrap {
      display: grid;
      grid-gap: 12px 0;
      margin: 12px 12px 0 12px;
    }
  }
}
</style>
