/**
 * @description Image图层配置
 * @typedef {Object} ImageLayerConfig
 * @property {string} name 中心点坐标
 * @property {string} imgUrl 地图索引
 * @property {number} index 区域索引
 * @property {[number, number]} southWest 西南角经纬
 * @property {[number, number]} northEast 东北角经纬度
 */

const imgRecords = import.meta.glob(['../assets/img/*'], { query: '?url', import: 'default', eager: true })

export const getImgUrlFn = (base) => (name, extName = '.webp') => imgRecords[`${base}/${name}${extName}`]

export const typeMap = new Map([
  ['临时经营点', 0], ['消费集市', 1], ['商业外摆', 2], ['夜景灯光点', 3], ['文化商业活动', 4], ['文化艺术展', 5], ['特色售卖点', 6]
])

export const getTypeIconSrc = (type) => imgRecords[`../assets/img/icon-${typeMap.get(type)}.webp`] || imgRecords['../assets/img/icon-0.webp']

/**
 * Image图层配置
 * @type {Map<string, ImageLayerConfig>}
 */
export const imgConfigMap = new Map([
  ['杭州', { name: '杭州', index: 1, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [118.344957, 29.188757], northEast: [120.721946, 30.566516] }],
  ['上城区', { name: '上城区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [120.13710, 30.19284], northEast: [120.29550, 30.393544] }],
  ['拱墅区', { name: '拱墅区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [120.08577, 30.25778], northEast: [120.22129, 30.396148] }],
  ['西湖区', { name: '西湖区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [119.99633, 30.07826], northEast: [120.18216, 30.352813] }],
  ['滨江区', { name: '滨江区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [120.12462, 30.13691], northEast: [120.235224, 30.23766] }],
  ['萧山区', { name: '萧山区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [120.07722, 29.84597], northEast: [120.65524, 30.297003] }],
  ['余杭区', { name: '余杭区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [119.68108, 30.15870], northEast: [120.150482, 30.566516] }],
  ['富阳区', { name: '富阳区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [119.43694, 29.744438], northEast: [120.146868, 30.196947] }],
  ['临安区', { name: '临安区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [118.84570, 29.93437], northEast: [119.868303, 30.443381] }],
  ['钱塘区', { name: '钱塘区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [120.29346, 30.224685], northEast: [120.721946, 30.389459] }],
  ['临平区', { name: '临平区', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [120.12747, 30.315084], northEast: [120.34433, 30.521601] }],
  ['桐庐县', { name: '桐庐县', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [119.18112, 29.58764], northEast: [119.973440, 30.088403] }],
  ['淳安县', { name: '淳安县', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [118.34574, 29.188757], northEast: [119.34827, 30.035083] }],
  ['建德市', { name: '建德市', index: 3, imgUrl: imgRecords['../assets/img/img-0.webp'], southWest: [118.90044, 29.205194], northEast: [119.769182, 29.770952] }],
  ['西湖景区', { name: '西湖景区', index: 3, imgUrl: imgRecords['../assets/img/img-3.webp'], southWest: [120.076433, 30.174887], northEast: [120.171655, 30.270713] }]
])

export const areaIndexMap = new Map([...imgConfigMap.values()].map((item) => [item.index, item.name]))

console.log(areaIndexMap)
