<script setup>
const list = defineModel({
  type: Array,
  required: true,
  default: () => []
})

const dataList = ref([])
const dataLoading = ref(false)
const loadFinished = ref(false)

const searchForm = reactive({
  pageNum: 1,
  pageSize: 10
})

const getDataList = async () => {
  dataLoading.value = true
  dataList.value = list.value.slice(0, searchForm.pageSize * searchForm.pageSize)
  loadFinished.value = list.value.length <= dataList.value.length
  searchForm.pageNum += 1
  dataLoading.value = false
}

getDataList()
</script>

<template>
  <div class="list-wrapper">
    <van-list
      v-if="dataList.length > 0"
      v-model="dataLoading"
      @load="getDataList"
      :finished="loadFinished"
      finished-text="没有更多了"
    >
      <div class="list-inner">
        <div class="inner-item" v-for="(item, index) in dataList" :key="index">
          <slot name="card-item" :data="item"/>
        </div>
      </div>
    </van-list>
  </div>
</template>

<style scoped lang="scss">
.list-wrapper {
  position: relative;
  padding: 0 14px;
  min-height: 100vh;
  background-color: #FFFFFF;

  .list-search {
    padding-top: 14px;
  }

  .list-inner {
    .inner-item {
      &:not(:last-child) {
        border-bottom: 0.5px solid rgba(235, 235, 235, 1);
      }
    }
  }

  :deep(.van-loading) {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
