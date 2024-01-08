let mapInstance

/**
 * 创建地图实例
 * @param container
 * @param recreate
 * @param mapConfig
 * @returns {Promise<*>}
 */
export const createInstance = async (
  container = 'container',
  recreate = false,
  mapConfig = {
    zoom: 12,
    viewMode: '2D',
    center: [119.12, 29.86]
  }) => {
  if (recreate) {
    exposeInstance()
  }
  return (mapInstance || (mapInstance = new AMap.Map(container, Object.assign({
      zoom: 12,
      viewMode: '2D',
      center: [119.12, 29.86]
    },
    mapConfig
  ))))
}

/**
 * 创建标注点
 * @param config
 * @returns {Property.Marker}
 */
export const createMarker = (config) => {
  return new AMap.Marker({
    position: config.position,
    icon: new AMap.Icon({
      image: config.image,
      anchor: 'bottom-center',
      size: config.size || [28, 40],
      imageSize: config.size || [28, 40]
    }),
    extData: config.extData
  })
}

/**
 * 废弃实例
 */
export const exposeInstance = () => {
  mapInstance = undefined
}
