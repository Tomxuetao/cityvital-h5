<script setup>
import { reactive, ref } from 'vue'

import { commonBackEndApi } from '@/api/common-api'
import EmptyPage from '@/views/common/empty-page.vue'

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  defaultSearchForm: {
    type: Object,
    required: false,
    default: () => {
    }
  }
})

const originalDataList = ref([])

const dataList = ref([])
const dataLoading = ref(true)
const loadFinished = ref(false)
const vanLoadingRef = ref(true)

let searchForm = reactive({
  pageNum: 1,
  pageSize: 10
})

const loadDataHandler = () => {
  dataList.value = originalDataList.value.slice(0, searchForm.pageSize * searchForm.pageNum)
  loadFinished.value = originalDataList.value.length <= dataList.value.length
  searchForm.pageNum += 1
}

const getDataListHandler = async (dataForm = {}) => {
  dataLoading.value = true
  const {
    code,
    method = 'get',
    customForm = {}
  } = props.config
  commonBackEndApi(code,
    Object.assign(searchForm, props.defaultSearchForm || {}, customForm || {}, dataForm || {}),
    method
  )
    .then((data) => {
      originalDataList.value = data || []
      dataLoading.value = false
      vanLoadingRef.value = false
      loadDataHandler()
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
      @load="loadDataHandler"
    >
      <div class="list-item" v-for="(item, index) in dataList" :key="index">
        <slot name="card-item" :data="item"/>
      </div>
    </van-list>
    <empty-page v-if="dataList.length === 0 && !dataLoading"/>
  </template>
</template>

<style scoped lang="scss"></style>
