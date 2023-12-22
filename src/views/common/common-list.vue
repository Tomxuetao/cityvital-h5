<script setup>
import { getImgUrlFn } from '@/utils'
import { nextTick, reactive, ref } from 'vue'

import EmptyPage from '@/views/common/empty-page.vue'

import { commonGatewayApi } from '@/api/gateway-api'

const props = defineProps({
  tabConfigList: {
    type: Array,
    required: true
  },
  extendConfig: {
    type: Object,
    required: false
  }
})

const emit = defineEmits(['inner-tab-change'])

const { hasFilter = true, sticky = false, showSearch = false } = props.extendConfig || {}

const getImgUrl = getImgUrlFn('../views/common/img')

const activeIndex = ref(0)
const dataLoading = ref(false)
const loadFinished = ref(false)
const vanLoadingRef = ref(false)

const dataList = ref([])

let searchForm = reactive({
  pageNum: 1,
  pageSize: 10
})

const showSearchSlot = ref(showSearch)

const getDataListHandler = (dataForm = {}) => {
  dataLoading.value = true
  const { code, prefix = '', customForm } = props.tabConfigList[activeIndex.value]
  commonGatewayApi(code, Object.assign(searchForm, customForm || {}, dataForm || {}), prefix)
    .then(({ list, total }) => {
      vanLoadingRef.value = false
      dataLoading.value = false
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

const tabChangeHandler = (index) => {
  searchForm = Object.assign({}, { pageNum: 1, pageSize: 10 })
  showSearchSlot.value = false
  vanLoadingRef.value = true
  emit('inner-tab-change', index)
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

<template>
  <div class="common-list">
    <div class="tabs-wrap">
      <div :class="['tabs-inner', hasFilter ? 'filter-inner' : '']">
        <van-sticky v-if="sticky">
          <van-tabs
            v-model:active="activeIndex"
            color="#0482FF"
            :swipe-threshold="4"
            background="#ffffff"
            title-active-color="#0482FF"
            @change="(index) => tabChangeHandler(index)"
          >
            <van-tab
              v-for="(item, index) in tabConfigList"
              :key="index"
              :name="index"
              :title="item.title"
            />
          </van-tabs>
          <img
            v-if="hasFilter"
            class="fold-btn"
            alt=""
            :src="getImgUrl(showSearchSlot ? 'icon-filter-active' : 'icon-filter')"
            @click="showSearchSlot = !showSearchSlot"
          />
        </van-sticky>
        <template v-else>
          <van-tabs
            v-model:active="activeIndex"
            color="#0482FF"
            :swipe-threshold="4"
            background="#ffffff"
            title-active-color="#0482FF"
            @change="(index) => tabChangeHandler(index)"
          >
            <van-tab
              v-for="(item, index) in tabConfigList"
              :key="index"
              :name="index"
              :title="item.title"
            />
          </van-tabs>
          <img
            v-if="hasFilter"
            class="fold-btn"
            alt=""
            :src="getImgUrl(showSearchSlot ? 'icon-filter-active' : 'icon-filter')"
            @click="showSearchSlot = !showSearchSlot"
          />
        </template>
      </div>
    </div>
    <div class="search-slot" v-show="showSearchSlot">
      <slot name="search"></slot>
    </div>
    <van-loading v-if="vanLoadingRef" color="#0094ff" vertical>
      加载中...
    </van-loading>
    <div v-else class="list-wrap">
      <van-list
        v-if="dataList.length > 0"
        v-model:loading="dataLoading"
        :finished="loadFinished"
        finished-text="没有更多了"
        @load="getDataListHandler()"
      >
        <div v-for="(item, index) in dataList" :key="index">
          <slot name="card-item" :data="item" :active-index="activeIndex"/>
        </div>
      </van-list>
      <empty-page v-else/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.common-list {
  padding-top: 2px;

  .tabs-wrap {
    background-color: #ffffff;
    border-radius: 12px 12px 0 0;

    .filter-inner {
      display: grid;
      align-items: center;
      padding: 2px 14px 0 0;
      margin: 0 2px 0 2px;
      border-radius: 10px 10px 0 0;
      grid-template-columns: 1fr 22px;
      background-image: linear-gradient(359deg, rgba(241, 250, 255, 0.00) 0%, #f1faff);

      .fold-btn {
        height: 16px;
        width: 16px;
        margin-left: 6px;
        object-fit: cover;
      }

      :deep(.van-tabs--line) {
        background-color: transparent;

        .van-tabs__wrap {
          .van-tabs__nav {
            border-radius: 12px 12px 0 0;
            background-color: transparent !important;
          }
        }
      }
    }
  }
}
</style>
