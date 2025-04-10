<script setup>
import { areaIndexMap, getImgUrlFn } from '@/utils'
import IndexMarker from '@/views/common/index-marker.vue'
import { useCommonStore } from '@/store'

const getImg = getImgUrlFn('../assets/img')

const router = useRouter()
const commonState = useCommonStore()

const dataList = ref([])
const getDataList = async () => {
  const tempList = await commonState.initDataAction() || []

  dataList.value = tempList.filter(item => item.area === areaIndexMap.get(0)) || []
}

getDataList()
</script>

<template>
  <div class="map-wrap" :style="{backgroundImage: `url(${getImg(`img-0`)})`}" @click=" router.push({ path: '/area-index/3' })">
    <div class="title-wrap">
      <img class="title-img" src="@/assets/img/img-title-0.webp" alt=""/>
    </div>
    <div class="marker-wrap">
      <index-marker
        v-for="(item, index) in dataList"
        :data="item"
        :key="index"
        draggable="true"
        :data-id="item.id"
      >
      </index-marker>
    </div>
  </div>
</template>

<style scoped lang="scss">
.map-wrap {
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
