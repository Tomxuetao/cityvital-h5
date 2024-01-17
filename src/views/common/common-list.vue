<script setup>
import { reactive, ref } from 'vue'
import { useCommonStore } from '@/store'

import { commonApi, commonGatewayApi } from '@/api/common-api'
import EmptyPage from '@/views/common/empty-page.vue'
import { reflectionTypeFun } from '@/utils/alarm.js'

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

const isExpose = ref(false)
/**
 * 构建搜素条件
 * @param defaultSearch
 * @param customForm
 * @param dataForm
 * @returns {Promise<unknown>}
 */
const buildSearchForm = async (defaultSearch, customForm, dataForm) => {
  let tempSearchForm = Object.assign(
    {},
    // 外部调用时不再合并默认的搜索条件
    isExpose.value ? {} : defaultSearch,
    customForm,
    dataForm || {}
  )
  // 处理旧名称映射 配置文件为 utils/ alarm.js
  if(reflectionTypeFun[tempSearchForm.originType]) {
    tempSearchForm = reflectionTypeFun[tempSearchForm.originType](tempSearchForm)
  }
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
  
  // --- 临时代码 到时候户外电子屏改回alarm接口时删除 --- start
  if(tempSearchForm.thirdType === '户外电子屏') {
    let electronicScreensParams = { 
      pageNum: tempSearchForm.pageNum || searchForm.pageNum, 
      pageSize: tempSearchForm.pageSize || searchForm.pageSize, 
      begintiame: tempSearchForm.latestCheckStartTime, 
      endtime: tempSearchForm.latestCheckEndTime 
    }
    tempSearchForm.factory_id && (electronicScreensParams.factory_id = tempSearchForm.factory_id)
    getElectronicScreens(electronicScreensParams)
    return
  }
  // ------------ end

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
// --- 临时代码 到时候户外电子屏改回alarm接口时删除 --- start
// 户外电子屏报警列表
const getElectronicScreens = async (params) => {
  commonGatewayApi('24474af120', params)
    .then(({ list, total }) => {
      let newList = list.map(item => {
        return {
          ...item,
          extraMap: {
            factoryId: item.factory_id,
            factoryName: item.factory_name,
            originType: '市容景观',
            secondType: '户外电子屏',
            latestAlarmLevel: item.level-0,
            alarmType: item.alarm_type
          }
        }
      })
      dataLoading.value = false
      vanLoadingRef.value = false
      dataList.value = searchForm.pageNum === 1 ? newList : [...dataList.value, ...newList]
      loadFinished.value = Number(total) <= dataList.value.length
      searchForm.pageNum += 1
    })
    .finally(() => {
      vanLoadingRef.value = false
      dataLoading.value = false
      loadFinished.value = true
    })
}
// ------------ end

getDataListHandler()

const exposeGetDataList = (dataForm) => {
  isExpose.value = true
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
    <div v-if="dataList.length === 0 && !dataLoading" class="empty-wrap">
      <empty-page/>
    </div>
  </template>
</template>

<style scoped lang="scss">
.empty-wrap {
  position: relative;
  min-height: 400px;
}
</style>
