/**
 * 生命体征Tabs配置
 * @type {Readonly<[{searchType: string, title: string}]>}
 */
export const vitalSignsTabs = Object.freeze([
  {
    title: '水设施河道',
    searchType: '1'
  },
  {
    title: '固废处置',
    searchType: '2'
  },
  {
    title: '市容景观',
    searchType: '1'
  },
  {
    title: '市政设施',
    searchType: '1'
  },
  {
    title: '城镇燃气',
    searchType: '2'
  },
  {
    title: '地铁保护区',
    searchType: '3'
  }
])

/**
 * 处置状态
 * @type {Map<string, string>}
 */
export const eventStatusMap = new Map([
  ['0', '未处置'],
  ['10', '已派遣'],
  ['11', '已反馈'],
  ['12', '已办结']
])

/**
 * 告警等级
 * @type {Map<number, string>}
 */
export const alarmLevelMap = new Map([
  [1, '一级告警'],
  [2, '二级告警'],
  [3, '三级告警']
])

/**
 * 事件处置状态
 * @type {Map<null, string>}
 */
export const dealStatusMap = new Map([
  [null, '未处置'],
  ['distribute', '已派遣'],
  ['handle', '已反馈'],
  ['settle', '已办结']
])

/**
 * 行政区划
 * @type {[{name: string, text: string, value: string},{name: string, text: string, value: string},{name: string, text: string, value: string}]}
 */
export const regionList = [
  { text: '上城区', value: '上城区', name: '上城区' },
  { text: '拱墅区', value: '拱墅区', name: '拱墅区' },
  { text: '西湖区', value: '西湖区', name: '西湖区' },
  { text: '滨江区', value: '滨江区', name: '滨江区' },
  { text: '萧山区', value: '萧山区', name: '萧山区' },
  { text: '富阳区', value: '富阳区', name: '富阳区' },
  { text: '临安区', value: '临安区', name: '临安区' },
  { text: '钱塘区', value: '钱塘区', name: '钱塘区' },
  { text: '桐庐区', value: '桐庐区', name: '桐庐区' },
  { text: '淳安区', value: '淳安区', name: '淳安区' },
  { text: '建德市', value: '建德市', name: '建德市' }
]

/**
 * 将Map转换成数组
 * @param map
 * @returns {*[]}
 */
export const mapToList = (map = new Map()) => {
  const list = []
  map.forEach((value, key) => {
    list.push({
      text: value,
      value: key,
      name: value
    })
  })
  return list
}
