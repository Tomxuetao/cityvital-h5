<template>
  <div class="custom-wrapper">
    <van-sticky>
      <van-tabs
        v-model:active="activeIndex"
        :swipe-threshold="4"
        color="#0482FF"
        background="#ffffff"
        title-active-color="#0482FF"
        @change="tabChangeHandler()"
      >
        <van-tab
          v-for="(item, index) in tabConfigList"
          :key="index"
          :name="index"
          :title="item.title"
        />
      </van-tabs>
    </van-sticky>
    <div class="search-wrap">
      <slot name="search"></slot>
    </div>
    <van-loading
      v-if="vanLoadingRef"
      color="#0094ff"
      vertical
    >
      加载中...
    </van-loading>
    <template v-else>
      <div class="container-wrapper">
        <van-list
          v-if="dataList.length > 0"
          v-model:loading="dataLoading"
          :finished="dataFinished"
          finished-text="没有更多了"
          @load="getDataListHandler()"
        >
          <div
            v-for="(item, index) in dataList"
            :key="index"
          >
            <slot
              name="card-item"
              :data="item"
              :active-index="activeIndex"
            />
          </div>
        </van-list>
        <empty-page v-else/>
      </div>
    </template>
  </div>
</template>

<script setup>
import EmptyPage from '@/views/common/empty-page.vue'

import { useRoute } from 'vue-router'
import { nextTick, reactive, ref } from 'vue'
import { commonGatewayApi } from '@/api/gateway-api'

const props = defineProps({
  tabConfigList: {
    type: Array,
    required: true
  }
})


const route = useRoute()
const index = Number(route.query.activeIndex) || 0
const activeIndex = ref(index > props.tabConfigList.length ? 0 : index)

const dataList = ref([])
const dataLoading = ref(false)
const dataFinished = ref(false)
const vanLoadingRef = ref(true)

let searchForm = reactive({
  pageNum: 1,
  pageSize: 10
})

const getDataListHandler = (dataForm = {}) => {
  dataLoading.value = true
  const { code } = props.tabConfigList[activeIndex.value]
  commonGatewayApi(code, Object.assign(searchForm, dataForm || {}))
    .then(({ list, total }) => {
      vanLoadingRef.value = false
      dataLoading.value = false
      dataList.value = searchForm.pageNum === 1 ? list : [...dataList.value, ...list]
      dataFinished.value = Number(total) <= dataList.value.length
      searchForm.pageNum += 1
    })
    .catch(() => {
      vanLoadingRef.value = false
      dataLoading.value = false
      dataFinished.value = true
    })
}
getDataListHandler()

const tabChangeHandler = () => {
  searchForm = Object.assign({}, { pageNum: 1, pageSize: 10 })
  vanLoadingRef.value = true
  nextTick(() => {
    getDataListHandler()
  })
}

const exposeGetDataList = (dataForm) => {
  getDataListHandler(Object.assign({}, dataForm || {}, { pageNum: 1, pageSize: 10 }))
}
defineExpose({
  getDataList: exposeGetDataList
})
</script>

<style scoped lang="scss">
.custom-wrapper {

  .van-loading {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .container-wrapper {
    padding: 0 12px;
  }

  .search-wrap {
    position: relative;

    &:before {
      position: absolute;
      content: '';
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 0.5px;
      background-color: #f0f2f5;
    }
  }

  :deep(.van-dropdown-menu) {

    .van-dropdown-menu__bar {
      box-shadow: none;
    }
  }
}
</style>
