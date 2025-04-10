import { CustomMarkerCtx } from '@/views/common'

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
