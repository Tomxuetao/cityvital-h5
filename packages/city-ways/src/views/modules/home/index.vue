<script setup>
import imgMap from '@/assets/img/img-0.webp'

const initMap = () => {
  new AMap.Map('map-ctx', {
    pitch: 0,
    zoom: 8,
    zooms: [8, 12],
    mapStyle: '',
    features: [],
    dragEnable: true,
    pitchEnable: false,
    center: [119.533452, 29.877637],
    layers: [
      new AMap.ImageLayer({
        url: imgMap,
        zIndex: 8,
        bounds: new AMap.Bounds([118.344957, 29.188757], [120.721946, 30.566516])
      })
    ]
  })
  console.log('initMap')
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div class="map-wrap">
    <div class="map-ctx" id="map-ctx"></div>
  </div>
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
    background-image: none;
    background-color: #185891 !important;

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
