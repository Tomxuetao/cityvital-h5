<script setup>
import { getImgUrlFn } from '@/utils'
import { reactive, ref } from 'vue'

import CommonList from '@/views/common/common-list.vue'
import CommonTabs from '@/views/common/common-tabs.vue'

const props = defineProps({
  tabConfigList: {
    type: Array,
    required: true
  },
  extendConfig: {
    type: Object,
    required: false
  },
  defaultSearchForm: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const emit = defineEmits(['inner-tab-change'])

const getImgUrl = getImgUrlFn('../views/common/img')

const commonListRef = ref()

const {
  hasFilter = true,
  sticky = false,
  showSearch = false,
  alwaysShowSearch = false
} = props.extendConfig || {}

const activeIndex = ref(0)

let searchForm = reactive({
  pageNum: 1,
  pageSize: 10
})

const showSearchSlot = ref(alwaysShowSearch || showSearch)

const tabChangeHandler = (index) => {
  searchForm = Object.assign({}, { pageNum: 1, pageSize: 10 })
  showSearchSlot.value = alwaysShowSearch || false
  emit('inner-tab-change', index)
}

const exposeGetDataList = (dataForm) => {
  commonListRef.value.getDataList(
    Object.assign({}, dataForm || {}, { pageNum: 1, pageSize: 10 })
  )
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
          <common-tabs
            v-model:active="activeIndex"
            :tab-config-list="tabConfigList"
            color="#0482FF"
            :swipe-threshold="4"
            title-active-color="#0482FF"
            @change="(index) => tabChangeHandler(index)"
          >
          </common-tabs>
          <img
            v-if="hasFilter"
            class="fold-btn"
            alt=""
            :src="
              getImgUrl(showSearchSlot ? 'icon-filter-active' : 'icon-filter')
            "
            @click="showSearchSlot = !showSearchSlot"
          />
        </van-sticky>
        <template v-else>
          <common-tabs
            v-model:active="activeIndex"
            :tab-config-list="tabConfigList"
            color="#0482FF"
            :swipe-threshold="4"
            title-active-color="#0482FF"
            @change="(index) => tabChangeHandler(index)"
          >
          </common-tabs>
          <img
            v-if="hasFilter"
            class="fold-btn"
            alt=""
            :src="
              getImgUrl(showSearchSlot ? 'icon-filter-active' : 'icon-filter')
            "
            @click="showSearchSlot = !showSearchSlot"
          />
        </template>
      </div>
    </div>
    <div class="search-slot" v-show="showSearchSlot">
      <slot name="search"></slot>
    </div>
    <common-list
      ref="commonListRef"
      :key="activeIndex"
      :index="activeIndex"
      :config="tabConfigList[activeIndex]"
      :default-search-form="defaultSearchForm"
    >
      {{ tabConfigList[activeIndex] }}
      <template #card-item="{ data }">
        <slot name="card-item" :data="data" :index="activeIndex" />
      </template>
    </common-list>
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
      background-image: linear-gradient(
        359deg,
        rgba(241, 250, 255, 0) 0%,
        #f1faff
      );

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
