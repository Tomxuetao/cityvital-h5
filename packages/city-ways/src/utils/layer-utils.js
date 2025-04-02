/**
 * @description Image图层配置
 * @typedef {Object} ImageLayerConfig
 * @property {string} name 中心点坐标
 * @property {string} imgUrl 地图索引
 * @property {[number, number]} southWest 西南角经纬
 * @property {[number, number]} northEast 东北角经纬度
 */

import { getImgUrlFn } from '@/utils/index'

import { CustomMarkerCtx } from '@/views/common'

const getImg = getImgUrlFn('../assets/img')


/**
 * Image图层配置
 * @type {Map<string, ImageLayerConfig>}
 */
const imgConfigMap = new Map([
  ['杭州', { name: '杭州', imgUrl: getImg('img-0'), southWest: [118.344957, 29.188757], northEast: [120.721946, 30.566516] }],
  ['上城区', { name: '上城区', imgUrl: getImg('img-0'), southWest: [120.13710, 30.19284], northEast: [120.29550, 30.393544] }],
  ['拱墅区', { name: '拱墅区', imgUrl: getImg('img-0'), southWest: [120.08577, 30.25778], northEast: [120.22129, 30.396148] }],
  ['西湖区', { name: '西湖区', imgUrl: getImg('img-0'), southWest: [119.99633, 30.07826], northEast: [120.18216, 30.352813] }],
  ['滨江区', { name: '滨江区', imgUrl: getImg('img-0'), southWest: [120.12462, 30.13691], northEast: [120.235224, 30.23766] }],
  ['萧山区', { name: '萧山区', imgUrl: getImg('img-0'), southWest: [120.07722, 29.84597], northEast: [120.65524, 30.297003] }],
  ['余杭区', { name: '余杭区', imgUrl: getImg('img-0'), southWest: [119.68108, 30.15870], northEast: [120.150482, 30.566516] }],
  ['富阳区', { name: '富阳区', imgUrl: getImg('img-0'), southWest: [119.43694, 29.744438], northEast: [120.146868, 30.196947] }],
  ['临安区', { name: '临安区', imgUrl: getImg('img-0'), southWest: [118.84570, 29.93437], northEast: [119.868303, 30.443381] }],
  ['钱塘区', { name: '钱塘区', imgUrl: getImg('img-0'), southWest: [120.29346, 30.224685], northEast: [120.721946, 30.389459] }],
  ['临平区', { name: '临平区', imgUrl: getImg('img-0'), southWest: [120.12747, 30.315084], northEast: [120.34433, 30.521601] }],
  ['桐庐县', { name: '桐庐县', imgUrl: getImg('img-0'), southWest: [119.18112, 29.58764], northEast: [119.973440, 30.088403] }],
  ['淳安县', { name: '淳安县', imgUrl: getImg('img-0'), southWest: [118.34574, 29.188757], northEast: [119.34827, 30.035083] }],
  ['建德市', { name: '建德市', imgUrl: getImg('img-0'), southWest: [118.90044, 29.205194], northEast: [119.769182, 29.770952] }],
  ['西湖风景区', { name: '西湖风景区', imgUrl: getImg('img-3'), southWest: [120.076433, 30.174887], northEast: [120.171655, 30.270713] }]
])

export let imageLayer

export const changeImgLayer = (name) => {
  const { imgUrl, southWest, northEast } = imgConfigMap.get(name)
  const bounds = new AMap.Bounds(southWest, northEast)
  if (!imageLayer) {
    imageLayer = new AMap.ImageLayer({
      zIndex: 0, opacity: 1, url: imgUrl, visible: true, bounds: bounds
    })
  } else {
    imageLayer.setImageUrl(imgUrl)
    imageLayer.setBounds(bounds)
  }
  imageLayer._center = bounds.getCenter()
  return imageLayer
}

/**
 * 创建标注图层
 * @param dataList
 * @returns {AMap.OverlayGroup<AMap.Overlay, any>}
 */
export const createMarkerLayer = (dataList = []) => {
  const overlayLayer = new AMap.OverlayGroup()

  dataList.forEach(item => {
    overlayLayer.addOverlay(new AMap.Marker({
      extData: item,
      position: item.center,
      offset: new AMap.Pixel(-8, -16),
      content: new CustomMarkerCtx({
        data: Object.assign({}, item, { icon: getImg(item.icon) })
      })
    }))
  })

  return overlayLayer
}
