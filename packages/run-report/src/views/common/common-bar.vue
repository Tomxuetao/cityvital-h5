<script setup>
import {
 onMounted, ref, watch 
} from 'vue'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import {
GridComponent,
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'

echarts.use([
  BarChart,
  GridComponent,
  CanvasRenderer,
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition
])

const props = defineProps({
  dataList: {
    type: Array,
    required: true
  },
  extendConfig: {
    type: Object,
    required: false
  }
})

const chartRef = ref()
let chartInstance

const setChartConfig = (dataList) => {
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }
  chartInstance.setOption(assembleData(dataList), true, true)
}

const assembleData = (dataList = []) => {
  const dataListMap = new Map()
  dataList.reduce((acc, cur) => {
    const tempList = acc.get(cur.type)
    if (tempList) {
      tempList.push(cur)
    } else {
      acc.set(cur.type, [cur])
    }
    return acc
  }, dataListMap)
  const xList = [...new Set(dataList.map(item => item.name))]
  const maxValue = Math.max(...dataList.map(item => item.value))
  const {
    vertical = true,
    barWidth = 8,
    colorArray = ['#60D8FF', '#007EFF']
  } = props.extendConfig || {}
  const xConfig = {
    data: xList,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: xList.length === 6 ? {
      interval: 0,
      width: 36,
      lineHeight: 14,
      show: true,
      fontSize: 12,
      color: '#666666',
      align: 'center',
      whiteSpace: 'wrap',
      overflow: 'breakAll'
    } : {
      show: true,
      fontSize: 12,
      color: '#666666'
    }
  }

  const yConfig = {
    max: maxValue,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: true,
      fontSize: 12,
      color: '#666666'
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: [2, 4],
        color: '#eeeeee'
      }
    }
  }

  const [color1, color2] = colorArray
  const linearGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: color2
    },
    {
      offset: 1,
      color: color1
    }
  ])

  const seriesList = []
  dataListMap.forEach((list, key) => {
    seriesList.push({
      type: 'bar',
      name: key,
      zlevel: 1,
      data: list,
      clip: false,
      itemStyle: {
        borderRadius: 2
      },
      barWidth: barWidth
    })
  })
  return {
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    legend: {
      bottom: 0,
      icon: 'rect',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        height: 16,
        fontSize: 12,
        lineHeight: 16,
        color: '#666666'
      },
      show: dataListMap.size > 1
    },
    grid: {
      left: 0,
      right: 10,
      containLabel: true,
      top: vertical ? '15%' : '5%',
      bottom: dataListMap.size > 1 ? 24 : 0
    },
    series: seriesList,
    xAxis: vertical ? xConfig : yConfig,
    yAxis: vertical ? yConfig : xConfig,
    color: vertical ? [linearGradient] : ['#00C1A2', '#3196FA', '#FFB251']
  }
}

watch(
  () => props.dataList,
  () => {
    setChartConfig(props.dataList)
  },
  { deep: true }
)

onMounted(() => {
  setChartConfig(props.dataList)
})
</script>

<template>
  <div id="bar-chart" ref="chartRef"></div>
</template>
