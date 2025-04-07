<script setup>
import { useCommonStore } from '@/store'
import HangZhou from '@/assets/json/hangzhou.json'
import CommonPopup from '@/views/common/common-popup.vue'
import { changeImgLayer, createMarkerLayer } from '@/utils/layer-utils'

let mapInstance

const router = useRouter()

const commonState = useCommonStore()

const initMarkerLayer = (dataList) => {
  const markerLayer = createMarkerLayer(dataList)
  markerLayer.on('click', ({ target }) => {
    Object.assign(activeData, target.getExtData())
    showDetailPopup.value = true
  })

  mapInstance.add(markerLayer)
}

const dataList = ref([])
const getDataList = async () => {
  dataList.value = await commonState.initDataAction() || []
  initMarkerLayer(dataList.value)
}

getDataList()

const showDetailPopup = ref(false)
const activeData = reactive({})

const initGeoJsonLayer = () => {
  const geoJsonLayer = new AMap.GeoJSON({
    geoJSON: HangZhou,
    getPolygon: (geojson, lnglats) => {
      return new AMap.Polygon({
        path: lnglats,
        fillOpacity: 1,
        fillColor: '',
        strokeColor: '',
        extData: geojson.properties
      })
    }
  })

  geoJsonLayer.on('click', () => {
    router.push({ path: '/area-index/3' })
  })

  return geoJsonLayer
}

const initMap = () => {
  mapInstance = new AMap.Map('map-ctx', {
    pitch: 0,
    zoom: 8,
    zooms: [8, 14],
    mapStyle: '',
    features: [],
    dragEnable: true,
    pitchEnable: false,
    doubleClickZoom: false,
    center: [119.533452, 29.877637],
    layers: [changeImgLayer('杭州')]
  })

  mapInstance.add(initGeoJsonLayer())
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div class="map-wrap">
    <div class="map-ctx" id="map-ctx"></div>
  </div>
  <common-popup
    v-if="showDetailPopup"
    v-model="showDetailPopup"
    :data="activeData"
    @close="showDetailPopup = false"
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
}
</style>
