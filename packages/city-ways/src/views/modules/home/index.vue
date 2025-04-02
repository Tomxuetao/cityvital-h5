<script setup>
import { getImgUrlFn } from '@/utils'
import HangZhou from '@/assets/json/hangzhou.json'
import CommonPopup from '@/views/common/common-popup.vue'
import { changeImgLayer, createMarkerLayer } from '@/utils/layer-utils'

const getImg = getImgUrlFn('../assets/img')
const imgList = [{ url: getImg('detail-0') }, { url: getImg('detail-1') }]

let mapInstance
const tempDataList = [
  {
    icon: 'icon-0',
    title: '湖畔有艺市',
    center: [120.1622, 30.2526],
    area: '西湖区',
    street: '西湖街道',
    address: '上城区湖滨路15号',
    hours: '工作日16:00-22:00；周末、节假日13:00-22:00',
    type: '文化商业活动',
    num: '168个',
    imgList: imgList,
    dist: '湖畔有艺市总摊位168个（含服务台1个+待租摊位1个），其中文玩类15家、饰品类47家、文创类33家，非遗类15家，手作类17家，体验类13家，其它业态26家。',
    desc: '湖畔有艺市由景区资产公司运营，荣获2023年全省第二批重点培育文旅市集名单。2023年4月29日经市局审批后在湖滨公园沿线推出，自运营以来社会反响良好，长期为残疾人、大学生等社会群体创建就业环境。经过合理设计将“城市会客厅”理念融入市集，赋予市集观赏使用、宣传亚运、宣传西湖的多重功能，让市民游客可就坐休憩，欣赏西湖美景，感受城市文化，成为西湖景区一道靓丽的风景线。'
  },
  {
    icon: 'icon-1',
    title: '昭庆吉市',
    center: [120.155, 30.2608],
    area: '西湖区',
    street: '西湖街道',
    address: '西湖区保俶路6号',
    hours: '旅游旺季及双休日13:00-22:00；旅游淡季16:00-22:00',
    type: '文化商业活动',
    num: '50个',
    imgList: imgList,
    dist: '昭庆吉市总摊位数50个，餐饮35家，文创12家，其他3家。',
    desc: '结合少年宫广场地域特征和管理热点、难点，主打“杭式文化+公益服务”特色，推出非遗文化、儿童亲子、轻食茶咖等市集摊位，展现鲜明的宋韵美学和深厚的西湖底蕴。'
  },
  {
    icon: 'icon-2',
    title: '飞来吉市',
    center: [120.1048, 30.2411],
    area: '西湖区',
    street: '西湖街道',
    address: '飞来峰景区内出口处“北峰梵趣”小广场',
    hours: '9:00 -17:30（五一、十一、春节不营业）',
    type: '文化商业活动',
    num: '16个',
    imgList: imgList,
    dist: '灵隐特色文创8个，非遗文化2个，饰品手作2个，绘画、字画2个，打卡互动2个。',
    desc: '该项目突出“吉”“福”元素主题，涵盖原创手作、工艺美术、书画诗词、特色美食等内容，旨在带给游客全新的沉浸式文创体验，满足游客多样的旅游需求。同时，我处将重点在文化特性、互动体验、规范管理三个方面做进一步的提升，以期展现灵隐特色文化，实现社会和经济效益双赢。'
  },
  {
    icon: 'icon-3',
    title: '岳王庙会',
    center: [120.1347, 30.2515],
    area: '西湖区',
    street: '西湖区北山街岳湖广场',
    address: '上城区湖滨路15号',
    hours: '旅游旺季及节假日的经营时间为：10:00-22:00 3月15 日—5月31日；7月1日—8月31日；9月15日—11月30日; 节假日：法定节假日及全年周末旅游淡季的经营时间为：10:00-21:00 非旅游旺季时间：12月1日-3月14日；6月1日—6月30日；9月1日—9月14日',
    type: '文化商业活动',
    num: '20个',
    imgList: imgList,
    dist: '岳王庙会总摊位 20 个，其中，轻餐饮、预包装食品类 8 家，文创商品类、手作类 12 家。',
    desc: '岳王有礼“岳王庙会”，旨在通过深度挖掘宋韵文化和岳飞文化的内涵，结合传统文化与现代商业运营理念，打造一个集文化传承、商业交流、休闲娱乐为一体的综合性庙会。从文化传承与创新、空间布局与功能区域划分、文化活动与节庆策划等多个方面进行了全面而细致的规划。'
  }
]

const showDetailPopup = ref(false)
const activeData = reactive({})

const initMarkerLayer = () => {
  const markerLayer = createMarkerLayer(tempDataList)
  markerLayer.on('click', ({ target }) => {
    Object.assign(activeData, target.getExtData())
    showDetailPopup.value = true
  })

  return markerLayer
}

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

  geoJsonLayer.on('click', ({ target }) => {
    if (target.getExtData().name.includes('西湖')) {
      changeImgLayer('西湖风景区')
      mapInstance.setFitView(target, false, [-10, -10, -10, -10])
    }
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

  mapInstance.add(initMarkerLayer())
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
