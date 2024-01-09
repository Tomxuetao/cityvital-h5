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
    center: [120.20, 30.24]
  }) => {
  if (recreate) {
    exposeInstance()
  }
  return (mapInstance || (mapInstance = new AMap.Map(container, Object.assign({
      zoom: 12,
      viewMode: '2D',
      center: [120.20, 30.24]
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
    anchor: 'bottom-center',
    position: config.position,
    icon: new AMap.Icon({
      image: config.image,
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
