/**
 * 水河道设施监测类型
 * @type {Map<string, string>}
 */
export const monitorTypeMap = new Map([
  ['chlorine', '水质监测'],
  ['turbidity', '水质监测'],
  ['ss', '水质监测'],
  ['oxygen', '水质监测'],
  ['cod', '水质监测'],
  ['tn', '水质监测'],
  ['tp', '水质监测'],
  ['nh3-n', '水质监测'],
  ['ph', '水质监测'],
  ['KMnO4', '水质监测'],
  ['pressure', '压力监测'],
  ['level', '液位监测'],
  ['waterDiver1', '引水量监测'],
  ['waterDiver2', '配水量监测'],
  ['waterLevel', '河道水位监测'],
  ['inFlow', '进水流量'],
  ['inflow', '进水流量监测'],
  ['outFlow', '出水流量'],
  ['outflow', '出水流量监测'],
  ['rain_1d', '降雨量监测'],
  ['rain_1h', '降雨量监测'],
  ['rain_30min', '降雨量监测'],
  ['rain_3h', '降雨量监测'],
  ['rain_6h', '降雨量监测']
])

/**
 * 污水监测类型
 * @type {Map<string, [{keys: string[], title: string},{keys: string[], title: string}]>}
 */
export const sewageMonitorTypeMap = new Map([
  [
    'in',
    [
      {
        title: '进水水质监测',
        keys: [
          'chlorine',
          'turbidity',
          'ss',
          'oxygen',
          'cod',
          'tn',
          'tp',
          'nh3-n',
          'ph',
          'KMnO4'
        ]
      },
      {
        title: '进水流量监测',
        keys: ['inflow']
      }
    ]
  ],
  [
    'out',
    [
      {
        title: '出水水质监测',
        keys: [
          'chlorine',
          'turbidity',
          'ss',
          'oxygen',
          'cod',
          'tn',
          'tp',
          'nh3-n',
          'ph',
          'KMnO4'
        ]
      },
      {
        title: '出水流量监测',
        keys: ['outflow']
      }
    ]
  ]
])

const commonConfig = {
  method: 'post',
  isIndexServer: false,
  code: 'api/v1/event/listAlarms'
}

/**
 * 生命体征Tabs配置
 * @type {Array<{ title: string, children: Array<{ title: string, customForm: {}}>}>}
 */
export const vitalSignsTabs = Object.freeze([
  {
    title: '水设施河道',
    children: [
      {
        title: '供水',
        ...commonConfig,
        customForm: { originType: '水设施河道', secondType: '供水' }
      },
      {
        title: '污水',
        ...commonConfig,
        customForm: { originType: '水设施河道', secondType: '污水' }
      },
      {
        title: '河道',
        ...commonConfig,
        customForm: { originType: '水设施河道', secondType: '河道' }
      },
      {
        title: '内涝',
        ...commonConfig,
        customForm: { originType: '水设施河道', secondType: '内涝' }
      }
    ]
  },
  {
    title: '固废处置',
    children: []
  },
  {
    title: '市容景观',
    children: [
      {
        title: '开关箱',
        ...commonConfig,
        customForm: { originType: '市容景观', secondType: '开关箱' }
      },
      {
        title: '户外广告',
        ...commonConfig,
        customForm: { originType: '市容景观', secondType: '户外广告' }
      },
      {
        title: '户外电子屏',
        ...commonConfig,
        customForm: { originType: '市容景观', secondType: '户外电子屏' }
      }
    ]
  },
  {
    title: '市政设施',
    children: [
      {
        title: '桥梁',
        ...commonConfig,
        customForm: { originType: '市政设施', secondType: '桥梁' }
      },
      {
        title: '隧道',
        ...commonConfig,
        customForm: { originType: '市政设施', secondType: '隧道' }
      },
      {
        title: '道路',
        ...commonConfig,
        customForm: { originType: '市政设施', secondType: '道路' }
      },
      {
        title: '地下管廊',
        ...commonConfig,
        customForm: { originType: '市政设施', secondType: '地下管廊' }
      }
    ]
  },
  {
    title: '城镇燃气',
    children: []
  },
  {
    title: '地铁保护区',
    children: [
      {
        title: '保护区',
        method: 'get',
        isIndexServer: true,
        code: '21b5953733',
        customForm: {}
      },
      {
        title: '作业项目',
        method: 'get',
        isIndexServer: true,
        code: '21b583ff2a',
        customForm: {
          is_bj: '1'
        }
      }
    ]
  }
])

/**
 * 设施状态
 * @type {Map<string, string>}
 */
export const deviceStatusMap = new Map([
  ['false', '正常'],
  ['true', '异常']
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
 * 地铁保护区处置状态
 * @type {Map<string, string>}
 */
export const reserveStatusMap = new Map([
  ['未办结', '未办结'],
  ['已办结', '已办结']
])

/**
 * 报警等级
 * @type {Map<number, string>}
 */
export const alarmLevelMap = new Map([
  [1, '一级报警'],
  [2, '二级报警'],
  [3, '三级报警']
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
 *
 * @type {*[]}
 */
export const eventStatusList = [
  { text: '未分发', value: '新建', name: '未分发' },
  { text: '已分发', value: '已分发', name: '已分发' },
  { text: '处理中', value: '处理中', name: '处理中' },
  { text: '已办结', value: '已办结', name: '已办结' },
  { text: '已终止', value: '已终止', name: '已终止' }
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
