<script setup>
import {
 onMounted, ref, watch 
} from 'vue'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import {
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'

echarts.use([
  PieChart,
  GridComponent,
  CanvasRenderer,
  LegendComponent,
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

let domHeight = ref(0)

watch(
  () => props.dataList,
  () => {
    setChartConfig(props.dataList, domHeight.value)
  },
  { deep: true }
)

onMounted(() => {
  domHeight.value = chartRef.value.getBoundingClientRect().height
  setChartConfig(props.dataList, domHeight.value)
})

const setChartConfig = (dataList, height) => {
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }
  chartInstance.setOption(assembleData(dataList, height), true, true)
}

const assembleData = (dataList = [], height) => {
  const topHeight = (height - (26 * dataList.length)) / 2
  const total = dataList.reduce((pre, cur) => pre + cur.value, 0)
  const { title = '总访问人数', unit = '次' } = props.extendConfig || {}
  const getValue = (name) => dataList.find(item => item.name === name).value
  return {
    legend: {
      top: topHeight,
      right: 0,
      itemGap: 12,
      itemWidth: 6,
      itemHeight: 6,
      icon: 'circle',
      orient: 'vertical',
      formatter: name => `{a|${name}}{b|${getValue(name)}${unit}}`,
      textStyle: {
        color: '#666666',
        overflow: 'truncate',
        rich: {
          a: {
            width: 120,
            fontSize: 14,
            lineHeight: 22,
            color: '#666666'
          },
          b: {
            fontSize: 14,
            lineHeight: 22,
            color: '#333333'
          }
        }
      },
      data: dataList.map((item) => item.name)
    },
    grid: {
      top: '12%',
      left: 0,
      right: 0,
      bottom: '12%',
      containLabel: true
    },
    series: [{
      type: 'pie',
      center: ['20%', '50%'],
      radius: ['52%', '70%'],
      data: dataList,
      label: {
        show: true,
        position: 'center',
        formatter: [
          `{a|${total}}`,
          `{b|${title}}`
        ].join('\n'),
        rich: {
          a: {
            fontSize: 24,
            lineHeight: 32,
            color: '#333333',
            fontFamily: 'Alternate-Bold'
          },
          b: {
            fontSize: 14,
            lineHeight: 22,
            color: '#666666'
          }
        }
      },
      labelLine: {
        show: false
      },
      rich: {
        a: {
          color: 'red',
          lineHeight: 10
        },
        b: {
          height: 40
        }
      }
    }],
    color: ['#3196FA', '#00C1A2', '#FFB251', '#FF4C63', '#7F58FF', '#FFE300']
  }
}
</script>

<template>
  <div id="chart-dom" ref="chartRef"></div>
</template>
