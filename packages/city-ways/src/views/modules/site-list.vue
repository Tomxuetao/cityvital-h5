<script setup>
import { useCommonStore } from '@/store'

const router  = useRouter()
const commonState = useCommonStore()

const dataList = ref([])
const allList = ref([])
const getDataList = async () => {
  const tempList = await commonState.initDataAction() || []
  dataList.value = tempList.filter(item => item.area !== '杭州市')
  allList.value = dataList.value
}

getDataList()

const activeKey = ref('')
const executeSearch = (searchForm) => {
  dataList.value = allList.value.filter(({ name, area, type }) => name.includes(searchForm.name || '') && area.includes(searchForm.area || '') && type.includes(searchForm.type || ''))
  activeKey.value = JSON.stringify(searchForm)
}
</script>

<template>
  <div class="site-list">
    <van-sticky>
      <common-search @search="executeSearch"></common-search>
    </van-sticky>
    <common-list v-if="dataList.length" v-model="dataList" :key="activeKey">
      <template #card-item="{ data }">
        <common-card :data="data" @click="router.push({ path: `/site-detail/${data.id}`})"></common-card>
      </template>
    </common-list>
    <van-empty v-else description="暂无数据"></van-empty>
  </div>
</template>

<style scoped lang="scss">
.site-list {
  display: grid;
  grid-auto-flow: row;
  background-color: #FFFFFF;
  grid-template-rows: max-content 1fr;

  .van-empty {
    min-height: calc(100vh - 86px);
  }
}
</style>
