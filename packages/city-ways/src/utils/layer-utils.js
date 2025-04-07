import { imgConfigMap } from '@/utils/index'
import { CustomMarkerCtx } from '@/views/common'

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
        data: Object.assign({ ...item })
      })
    }))
  })

  return overlayLayer
}
