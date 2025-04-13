<script setup>
import { useCommonStore } from '@/store'
import { createMarkerLayer } from '@/utils/layer-utils'
import CommonPopup from '@/views/common/common-popup.vue'
import router from '@/router'

let mapInstance
const route = useRoute()
const showPopup = ref(false)
const commonState = useCommonStore()
const activeData = reactive({})

const initMarkerLayer = (dataList) => {
  const markerLayer = createMarkerLayer(dataList.filter(item => item.area !== '杭州市'))
  markerLayer.on('click', ({ target }) => {
    showPopup.value = true
    Object.assign(activeData, target.getExtData())
  })
  mapInstance.add(markerLayer)
  mapInstance.setFitView(markerLayer.getOverlays())
}

const dataList = ref([])
const getDataList = async () => {
  dataList.value = await commonState.initDataAction() || []

  const tempActiveData = dataList.value.find(item => item.id === route.params.id)
  if (tempActiveData) {
    showPopup.value = true
    Object.assign(activeData, dataList.value.find(item => item.id === route.params.id))
  }

  initMarkerLayer(dataList.value)
}

getDataList()

const initMap = () => {
  mapInstance = new AMap.Map('map-ctx', {
    pitch: 0,
    zoom: 12,
    layers: [],
    zooms: [8, 20],
    mapStyle: '',
    dragEnable: true,
    pitchEnable: false,
    doubleClickZoom: false,
    center: [119.533452, 29.877637]
  })
}

const closePopup = () => {
  router.replace({ name: 'real-map' })
}

const executeSearch = (searchForm) => {
  console.log(searchForm)
  const overlays = mapInstance.getAllOverlays('marker')

  overlays.forEach(overlay => {
    const { name, area, type } = overlay.getExtData()
    if (name.includes(searchForm.name || '')
      && area.includes(searchForm.area || '')
      && type.includes(searchForm.type || '')
    ) {
      overlay.show()
    } else {
      overlay.hide()
    }
  })
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div class="map-wrap">
    <div class="map-ctx" id="map-ctx"></div>
    <div class="search-wrap">
      <common-search @search="executeSearch"></common-search>
    </div>
    <div class="map-btns">
      <div class="btn-item btn-item-back" @click="router.back()">
        <div class="back-text">烟火</div>
        <div class="back-text">地图</div>
      </div>
    </div>
  </div>
  <common-popup
    v-if="showPopup"
    v-model="showPopup"
    :data="activeData"
    @close="closePopup()"
  >
  </common-popup>
</template>

<style scoped lang="scss">
.map-wrap {
  position: absolute;
  top: 0;
  z-index: 0;
  bottom: 0;
  width: 100vw;
  cursor: pointer;
  min-height: 100vh;
  pointer-events: all;

  .search-wrap {
    position: absolute;
    top: 12px;
    pointer-events: all;
  }

  .map-ctx {
    width: 100vw;
    height: 100%;
    cursor: pointer;
    pointer-events: all;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("@/assets/img/img-bg.webp") !important;

    :deep(.amap-logo) {
      display: none !important;
    }

    :deep(.amap-copyright) {
      display: none !important;
    }

    :deep(.amap-info-close) {
      display: none !important;
    }
  }

  .map-btns {
    position: absolute;
    right: 12px;
    bottom: 36px;
    pointer-events: all;

    .btn-item {
      &-back {
        width: 36px;
        height: 36px;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        border-radius: 50%;
        display: grid;
        grid-auto-flow: row;
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;
        background-color: royalblue;
        grid-template-rows: max-content max-content;

        .back-text {
          line-height: 12px;
        }
      }
    }
  }
}
</style>
