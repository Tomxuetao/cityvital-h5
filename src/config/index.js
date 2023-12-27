import dayjs from 'dayjs'

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

const curDate = dayjs().format('YYYY-MM-DD')
const nextDate = dayjs().add(1, 'day').format('YYYY-MM-DD')

const commonForm = {
  sortTimeFiled: 'latestCheckTime',
  latestCheckEndTime: `${nextDate} 00:00:00`,
  latestCheckStartTime: `${curDate} 00:00:00`
}

const commonConfig = {
  method: 'post',
  isIndexServer: false,
  code: 'event/listAlarms'
}

/**
 * 生命体征Tabs配置
 * @type {Array<{ title: string, children: Array<{ title: string, customForm: {}}>}>}
 */
export const vitalSignsTabs = [
  {
    title: '水设施河道',
    children: [
      {
        title: '供水',
        ...commonConfig,
        customForm: Object.assign(
          { originType: '水设施河道', secondType: '供水' },
          commonForm
        )
      },
      {
        title: '污水',
        ...commonConfig,
        customForm: Object.assign(
          { originType: '水设施河道', secondType: '污水' },
          commonForm
        )
      },
      {
        title: '河道',
        ...commonConfig,
        customForm: Object.assign(
          { originType: '水设施河道', secondType: '河道' },
          commonForm
        )
      },
      {
        title: '内涝',
        ...commonConfig,
        customForm: Object.assign(
          { originType: '水设施河道', secondType: '内涝' },
          commonForm
        )
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
        customForm: Object.assign(
          { originType: '市容景观', secondType: '开关箱' },
          commonForm
        )
      },
      {
        title: '户外广告',
        ...commonConfig,
        customForm: Object.assign(
          { originType: '市容景观', secondType: '户外广告' },
          commonForm
        )
      },
      {
        title: '户外电子屏',
        ...commonConfig,
        customForm: Object.assign(
          { originType: '市容景观', secondType: '户外电子屏' },
          commonForm
        )
      }
    ]
  },
  {
    title: '市政设施',
    children: []
  },
  {
    title: '城镇燃气',
    children: []
  },
  {
    title: '地铁保护区',
    children: []
  }
]
