<script setup>
import { reactive, ref } from 'vue'
import { useCommonStore } from '@/store'

import { commonApi } from '@/api/common-api'
import EmptyPage from '@/views/common/empty-page.vue'

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: false,
    default: () => 0
  },
  defaultSearchForm: {
    type: Object,
    required: false,
    default: () => {
    }
  }
})

const emit = defineEmits(['count-change'])

const commonState = useCommonStore()

const count = ref(0)
const dataList = ref([])
const dataLoading = ref(true)
const loadFinished = ref(false)
const vanLoadingRef = ref(true)

let searchForm = reactive({
  pageNum: 1,
  pageSize: 10
})

/**
 * 构建搜素条件
 * @param defaultSearch
 * @param customForm
 * @param dataForm
 * @returns {Promise<unknown>}
 */
const buildSearchForm = async (defaultSearch, customForm, dataForm) => {
  const tempSearchForm = Object.assign(
    {},
    defaultSearch,
    customForm,
    dataForm || {}
  )
  const { alarming, originType, secondType, thirdType } = tempSearchForm
  if (alarming !== undefined) {
    const alarmList = await commonState.initAlarmListAction()
    let tempList = alarmList.filter(
      (item) =>
        item.page === originType &&
        item.model === secondType &&
        (thirdType ? item.type === thirdType : true)
    )
    tempSearchForm.alarmingFactoryIds = tempList.map((item) => item.factory_id)
  } else {
    tempSearchForm.alarmingFactoryIds = undefined
  }
  return tempSearchForm
}

const getDataListHandler = async (dataForm = {}) => {
  dataLoading.value = true
  const {
    code,
    method = 'get',
    isIndexServer = true,
    customForm = {}
  } = props.config
  const tempSearchForm = await buildSearchForm(
    props.defaultSearchForm,
    customForm,
    dataForm
  )
  commonApi(code, Object.assign(searchForm, tempSearchForm), {
    method: method,
    isIndexServer: isIndexServer
  })
    .then(({ list, total }) => {
      if (count.value !== total) {
        emit('count-change', total)
        count.value = total
      }
      dataLoading.value = false
      vanLoadingRef.value = false
      dataList.value = searchForm.pageNum === 1 ? list : [...dataList.value, ...list]
      loadFinished.value = Number(total) <= dataList.value.length
      searchForm.pageNum += 1
    })
    .catch(() => {
      vanLoadingRef.value = false
      dataLoading.value = false
      loadFinished.value = true
    })
}

getDataListHandler()

const exposeGetDataList = (dataForm) => {
  getDataListHandler(
    Object.assign({}, dataForm || {}, { pageNum: 1, pageSize: 10 })
  )
}

defineExpose({
  getDataList: exposeGetDataList
})
</script>

<template>
  <van-loading v-if="vanLoadingRef" color="#0094ff" vertical>
    加载中...
  </van-loading>
  <template v-else>
    <van-list
      class="list-wrap"
      v-if="dataList.length > 0"
      offset="100"
      :loading="dataLoading"
      :finished="loadFinished"
      finished-text="没有更多了"
      @load="getDataListHandler()"
    >
      <div class="list-item" v-for="(item, index) in dataList" :key="index">
        <slot name="card-item" :data="item"/>
      </div>
    </van-list>
    <empty-page v-if="dataList.length === 0 && !dataLoading"/>
  </template>
</template>

<style scoped lang="scss"></style>
