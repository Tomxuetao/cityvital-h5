<script setup>
import { ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  dataList: {
    type: Array,
    required: true
  }
})

const chartRef = ref()
let chartInstance

watch(
  () => props.dataList,
  () => {
    setChartConfig(props.dataList)
  },
  { deep: true }
)

const setChartConfig = (dataList) => {
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }
  chartInstance.setOption(assembleData(dataList), true, true)
}

const assembleData = (dataList = []) => {
  const tempSeries = dataList.map((item) => {
    return {
      name: item.name,
      type: 'line',
      data: item.list
    }
  })
  const xAxisLabels = dataList.length
    ? dataList[0].list.map((item) => item.name)
    : []
  return {
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
}
</script>

<template>
  <div id="line-chart" ref="chartRef"></div>
</template>

<style scoped lang="scss"></style>
