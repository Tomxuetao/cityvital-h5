<script setup>
import { useCommonStore } from '@/store'
import { areaIndexMap, getImgUrlFn } from '@/utils'
import CommonMarker from '@/views/common/common-marker.vue'

const getImg = getImgUrlFn('../assets/img')

const route = useRoute()
const router = useRouter()
const commonState = useCommonStore()

const dataList = ref([])
const getDataList = async () => {
  const tempList = await commonState.initDataAction() || []

  dataList.value = tempList.filter(item => item.area === areaIndexMap.get(+route.params.index)) || []
}

getDataList()
</script>

<template>
  <div class="area-index" :style="{backgroundImage: `url(${getImg(`img-${route.params.index}`)})`}">
    <div class="title-wrap">
      <img class="title-img" :src="getImg(`img-title-${route.params.index}`)" alt=""/>
    </div>
    <div class="marker-wrap">
      <common-marker
        v-for="(item, index) in dataList"
        :data="item" :key="index"
        @click="router.push({ path: `/real-map/${item.id}`})"
      >
      </common-marker>
    </div>
  </div>
</template>

<style scoped lang="scss">
.area-index {
  width: 375px;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .title-wrap {
    position: absolute;
    top: 42px;
    left: 45%;
    transform: translateX(-50%);

    .title-img {
      width: 259px;
      height: 102px;
      object-fit: contain;
    }
  }

  .marker-wrap {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
