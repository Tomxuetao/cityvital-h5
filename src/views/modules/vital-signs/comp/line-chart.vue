<script setup>
import { onMounted, ref, watch } from 'vue'

import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import {GridComponent,
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'

echarts.use([
  LineChart,
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
  eOptions: {
    type: Object,
    required: false
  }
})

const chartRef = ref()
let chartInstance

const areaStyleArray = [
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: 'rgba(49, 150, 250, 1)'
    },
    {
      offset: 1,
      color: 'rgba(49, 150, 250, 0)'
    }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: 'rgba(0, 193, 162, 1)'
    },
    {
      offset: 1,
      color: 'rgba(0, 193, 162, 0)'
    }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: 'rgba(255, 178, 81, 1)'
    },
    {
      offset: 1,
      color: 'rgba(255, 178, 81, 0)'
    }
  ])
]

const setChartConfig = (dataList) => {
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }
  chartInstance.setOption(assembleData(dataList), true, true)
}

const assembleData = (dataList = []) => {
  const tempSeries = dataList.map((item, index) => {
    return {
      type: 'line',
      name: item.name,
      data: item.list,
      showSymbol: false,
      areaStyle: {
        opacity: 0.4,
        color: areaStyleArray[index % 3]
      }
    }
  })
  const xAxisLabels = dataList.length
    ? dataList[0].list.map((item) => item.name)
    : []
  let eOptions = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: dataList.map((item) => item.name),
      bottom: 0,
      itemWidth: 6,
      itemHeight: 1,
      textStyle: {
        fontSize: 12,
        color: '#666666'
      }
    },
    grid: {
      top: '12%',
      left: '2%',
      right: '4%',
      bottom: '12%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: [2, 4],
          color: '#eeeeee'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#eeeeee'
        }
      },
      axisLabel: {
        show: true,
        fontSize: 12,
        color: '#666666'
      },
      data: xAxisLabels
    },
    series: tempSeries
  }
  if(props.eOptions) {
    for(let key in props.eOptions ) {
      eOptions[key] = props.eOptions[key]
    }
  }
  return eOptions
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
  <div id="line-chart" ref="chartRef"></div>
</template>

<style scoped lang="scss"></style>
