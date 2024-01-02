<script setup>
import { ref } from 'vue'
import { getImgUrlFn } from '@/utils'

import CommonTitle from '@/views/common/common-title.vue'
import IndexCard from '@/views/modules/run-index/comp/index-card.vue'

import { commonBackEndApi, commonGatewayApi } from '@/api/common-api'

const props = defineProps({
  num: {
    type: String
  }
})

const getImgUrl = getImgUrlFn('../views/modules/sign/img')

const runIndexList = ref([
  {
    title: '水设施河道',
    score: 100,
    icon: getImgUrl('icon-1'),
    list: [
      { title: '供水量', num: '', unit: '万立方米', key: '供水' },
      { title: '污水处理量', num: '', unit: '万立方米', key: '污水' },
      { title: '引水量', num: '', unit: '万立方米', key: '引水量' },
      { title: '配水量', num: '', unit: '万立方米', key: '配水量' },
      {
        title: '超汛限中大型水库数',
        num: '',
        unit: '个',
        key: '中大型水库超汛限个数'
      },
      { title: '水质超标河道数', num: '', unit: '条', key: '水质超标河道数' }
    ]
  },
  {
    title: '固废处置',
    score: 100,
    icon: getImgUrl('icon-2'),
    list: [
      { title: '车辆备案率', num: '', unit: '%', key: 'max' },
      { title: '车辆超载率', num: '', unit: '%', key: 'min' },
      { title: '焚烧设施处置量', num: '', unit: '', key: '' },
      { title: '焚烧设施负荷率', num: '', unit: '', key: '' },
      { title: '易腐设施处置量', num: '', unit: '', key: '' },
      { title: '易腐设施负荷率', num: '', unit: '', key: '' }
    ]
  },
  {
    title: '市容景观',
    score: 100,
    icon: getImgUrl('icon-3'),
    list: [
      { title: '户外广告超期数', num: '', unit: '', key: 'P04-T03-001' },
      { title: '户外广告未检数', num: '', unit: '', key: '' },
      { title: '电子屏接入率', num: '', unit: '%', key: 'P04-T02-001' },
      { title: '电子屏在线率', num: '', unit: '%', key: 'P04-T02-002' },
      { title: '公益广告占比', num: '', unit: '%', key: 'rate' },
      { title: '昨日综合亮灯率', num: '96.63', unit: '%', key: '' }
    ]
  },
  {
    title: '市政设施',
    score: 100,
    icon: getImgUrl('icon-4'),
    list: [
      { title: '今日过桥车辆数', num: '', unit: '', key: '今日过桥车辆数' },
      { title: '桥梁结构预警数', num: '', unit: '个', key: 'jgbj_bridge' },
      { title: '管廊安全运行天数', num: '', unit: '', key: '管廊安全运行天数' },
      {
        title: '地下隐患当日处置闭环率',
        num: '',
        unit: '',
        key: '地下隐患当日处置闭环率'
      },
      { title: '平路指数', num: '', unit: '分', key: 'plzs' },
      { title: '隧道积水率', num: '', unit: '%', key: 'sdjsl' }
    ]
  },
  {
    title: '城镇燃气',
    score: 100,
    icon: getImgUrl('icon-5'),
    list: [
      { title: '燃气用户总数', num: '', unit: '万户', key: 'rqyhzs' },
      { title: '室内监测设备安装率', num: '', unit: '%', key: 'snjcsbazl' },
      { title: '燃气管线', num: '', unit: 'km', key: 'rqgx' },
      { title: '燃气企业', num: '', unit: '家', key: 'rqqy' },
      { title: '隐患整改率', num: '', unit: '%', key: 'yhzgl' },
      { title: '综合检查整改率', num: '', unit: '%', key: 'zhjczgl' }
    ]
  },
  {
    title: '地铁保护区',
    score: 100,
    icon: getImgUrl('icon-6'),
    list: [
      { title: '运营里程数', num: '', unit: '', key: '运营里程数' },
      { title: '昨日客流量', num: '', unit: '', key: '昨日客流量' },
      { title: '作业项目数', num: '', unit: '', key: '作业项目' },
      { title: '出动巡查数', num: '', unit: '', key: '出动巡查数' },
      { title: '项目报警数', num: '', unit: '', key: '项目报警数' },
      { title: '违规作业处置数', num: '', unit: '', key: 'P01-L01-029' }
    ]
  }
])

const getDataHandler = async () => {
  const indexList = runIndexList.value.map((item) => item.list).flat(2)
  // 桥梁结构预警数、平路指数、隧道积水率
  const dataList = await commonGatewayApi('2190b92c81')
  if (Array.isArray(dataList) && dataList.length) {
    const [data] = dataList
    const tempData = runIndexList.value.find(
      (item) => item.title === '市政设施'
    )
    const { list } = tempData || { list: [] }
    list.forEach((item) => {
      if (item.key) {
        Object.assign(item, { num: data[item.key] || 0 })
      }
    })
  }
  // 车辆备案率、车辆超载率（政通提供，根据数值的大小来确定-数值小的是超载率，数值大的是备案率；真他妈奇葩）
  const { list: carDataList } = await commonBackEndApi(
    'api/v1/cityvital_sign/db'
  )
  if (Array.isArray(carDataList)) {
    const carList = carDataList
      .map((item) => Object.values(item))
      .flat()
      .sort((a, b) => a - b)
    const [min, max] = carList
    const tempData = runIndexList.value.find(
      (item) => item.title === '固废处置'
    )
    const { list } = tempData || { list: [] }
    const tempList = list.filter((item) => ['min', 'max'].includes(item.key))
    tempList.forEach((item) => {
      Object.assign(item, { num: item.key === 'min' ? min || 0 : max || 0 })
    })
  }

  /**
   * 燃气指标数据-政通提供
   * rqgx: 燃气管道-km
   * rqqy: 燃气企业-家
   * yhzgl: 隐患整改率-%
   * rqyhzs: 燃气用户总量-万户
   * zhjczgl: 综合检查整改率-%
   * snjcsbazl: 室内监测设备安装率-%
   */
  const { list: gasDataList } = await commonBackEndApi(
    '/cityvital_sign/sdbl_rq'
  )
  if (Array.isArray(gasDataList)) {
    const [gasData] = gasDataList
    const tempData = runIndexList.value.find(
      (item) => item.title === '城镇燃气'
    )
    const { list } = tempData || { list: [] }
    list.forEach((item) => {
      Object.assign(item, { num: gasData[item.key] || 0 })
    })
  }

  // 公益广告占比
  const rateList = await commonGatewayApi('221b807569', { areaName: '' })
  if (Array.isArray(rateList) && rateList.length) {
    const total =
      rateList.reduce((acc, cur) => acc + Number(cur.percent), 0) /
      rateList.length
    const tempData = indexList.find((item) => item.key === 'rate')
    Object.assign(tempData, { num: total })
  }

  Promise.all([
    // 供水、污水
    commonGatewayApi('21021f58c9', { factory_id: 'all' }),
    // 引水量、配水量、水质超标河道数
    commonGatewayApi('212008e63a', { factory_id: 'all', model: '河道' }),
    // 户外广告超期数、户外广告未检数
    commonGatewayApi('218b575c65', { id: 'P04-T03-001' }),
    // 电子屏接入率
    commonGatewayApi('218b575c65', { id: 'P04-T02-001' }),
    // 电子屏在线率
    commonGatewayApi('218b575c65', { id: 'P04-T02-002' }),
    // 地铁数据-作业项目、保护区
    commonGatewayApi('21b5fd84e3'),
    commonGatewayApi('218b575c65', {
      id: 'P01-L01-029',
      STATISTIC_NEXT_TIME: '全市'
    }),
    // 地下隐患闭环处置率
    commonGatewayApi('23c2dbe921'),
    // 其他数据组写死的数据
    commonGatewayApi('2385431fbe')
  ]).then((dataList) => {
    if (Array.isArray(dataList)) {
      const tempList = dataList.flat(2)
      tempList.forEach((item) => {
        const {
          rn,
          ID,
          num,
          NUM,
          unit,
          UNIT,
          type,
          model,
          outtotal: total,
          para_name: name,
          para_value: value,
          index_name: indexName
        } = item
        const key = type || indexName || model || ID || name
        let tempData = indexList.find((item) => item.key === key)
        if (tempData) {
          Object.assign(tempData, {
            num: total || NUM || num || value || rn || 0,
            unit: tempData.unit || UNIT || unit
          })
        }
      })
    }
  })
}

getDataHandler()
</script>

<template>
  <div class="index-wrap">
    <div class="index-header">
      <div class="header-inner">
        <div class="inner-num">{{ num }}</div>
        <div class="inner-text">运行指标</div>
      </div>
    </div>
    <div class="index-inner">
      <div
        class="inner-item"
        v-for="(item, index) in runIndexList"
        :key="index"
      >
        <common-title :text="item.title" :icon="item.icon"></common-title>
        <div class="inner-card">
          <index-card :list="item.list"></index-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-wrap {
  .index-header {
    height: 122px;
    width: 375px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("@/views/modules/run-index/img/img-index-bg.webp");

    .header-inner {
      padding: 32px 0 0 20px;

      .inner-num {
        height: 36px;
        font-size: 36px;
        font-weight: Bold;
        color: #0482ff;
        line-height: 36px;
      }

      .inner-text {
        height: 28px;
        font-size: 20px;
        color: #333333;
        line-height: 28px;
      }
    }
  }

  .index-inner {
    display: grid;
    grid-gap: 12px 0;
    padding: 0 12px;
    margin-top: -12px;

    .inner-item {
      border-radius: 12px;
      padding-bottom: 16px;
      background-color: #ffffff;
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);
    }

    .inner-card {
      padding: 8px 16px 0 16px;
    }
  }
}
</style>
