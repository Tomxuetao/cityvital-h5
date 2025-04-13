/**
 * @description 首页Marker标注点配置
 * @typedef {Object} MarkerOptions
 * @property {string} name
 * @property {string} index 区域索引
 * @property {number} index 区域索引
 * @property {string} color 颜色
 * @property {string} anchor 锚点
 */

const imgRecords = import.meta.glob(['../assets/img/*'], { query: '?url', import: 'default', eager: true })

export const getImgUrlFn = (base) => (name, extName = '.webp') => imgRecords[`${base}/${name}${extName}`]

export const typeMap = new Map([
  ['临时经营点', 0], ['消费集市', 1], ['商业外摆', 2], ['夜景灯光点', 3], ['文化商业活动', 4], ['文化艺术展', 5], ['特色售卖点', 6]
])

export const getTypeIconSrc = (type) => imgRecords[`../assets/img/icon-${typeMap.get(type)}.webp`] || imgRecords['../assets/img/icon-0.webp']

/**
 * Image图层配置
 * @type {Map<string, MarkerOptions>}
 */
export const markerConfigMap = new Map([
  ['杭州市', { name: '杭州市', index: 0, color: '', anchor: '' }],
  ['上城区', { name: '上城区', index: 3, color: '#3a7bbf', anchor: 'left' }],
  ['拱墅区', { name: '拱墅区', index: 3, color: '#dc5873', anchor: 'right' }],
  ['西湖区', { name: '西湖区', index: 3, color: '#ed6a1a', anchor: 'right' }],
  ['滨江区', { name: '滨江区', index: 3, color: '#4abbaf', anchor: 'top' }],
  ['萧山区', { name: '萧山区', index: 3, color: '#f5af16', anchor: 'top' }],
  ['余杭区', { name: '余杭区', index: 3, color: '#6d5ca6', anchor: 'left' }],
  ['临平区', { name: '临平区', index: 3, color: '#6eba3a', anchor: 'left' }],
  ['钱塘区', { name: '钱塘区', index: 3, color: '#4abbaf', anchor: 'top' }],
  ['富阳区', { name: '富阳区', index: 3, color: '#6eba3a', anchor: 'left' }],
  ['临安区', { name: '临安区', index: 3, color: '#f5af16', anchor: 'bottom' }],
  ['桐庐县', { name: '桐庐县', index: 3, color: '#dc5873', anchor: 'left' }],
  ['淳安县', { name: '淳安县', index: 3, color: '#6d5ca6', anchor: 'right' }],
  ['建德市', { name: '建德市', index: 3, color: '#ed6a1a', anchor: 'left' }],
  ['西湖风景名胜区', { name: '西湖风景名胜区', index: 3, color: '#6eba3a', anchor: 'right' }]
])

export const areaSet = new Set([...markerConfigMap.keys()])

export const areaIndexMap = new Map([...markerConfigMap.values()].map((item) => [item.index, item.name]))

export const dragMarkerHandle = (draggable) => {
  let offsetX, offsetY
  const viewportWidth = window.innerWidth

  // 辅助函数：px 转 vw
  const pxToVw = (px) => (px / viewportWidth) * 100 + 'vw'

  const updatePosition = (x, y) => {
    const parent = draggable.parentElement.getBoundingClientRect()
    const rect = draggable.getBoundingClientRect()

    let newX = x - offsetX
    let newY = y - offsetY

    // 限制拖拽范围
    newX = Math.max(0, Math.min(newX, parent.width - rect.width))
    newY = Math.max(0, Math.min(newY, parent.height - rect.height))

    // 设置为 vw
    draggable.style.left = pxToVw(newX)
    draggable.style.top = pxToVw(newY)
  }

  // **桌面端拖拽**
  draggable.addEventListener('mousedown', (e) => {
    e.preventDefault()
    const rect = draggable.getBoundingClientRect()
    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top

    const onMouseMove = (e) => updatePosition(e.clientX, e.clientY)
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })

  // **移动端拖拽**
  draggable.addEventListener('touchstart', (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = draggable.getBoundingClientRect()
    offsetX = touch.clientX - rect.left
    offsetY = touch.clientY - rect.top
  }, { passive: false })

  draggable.addEventListener('touchmove', (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    updatePosition(touch.clientX, touch.clientY)
  }, { passive: false })
}
