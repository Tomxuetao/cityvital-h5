<script setup>
import CommonTitle from '@/views/common/common-title.vue'
import IndexCard from '@/views/modules/run-index/comp/index-card.vue'

import { ref } from 'vue'
import { getImgUrlFn } from '@/utils'

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
      { title: '供水量', num: '', unit: '' },
      { title: '污水处理量', num: '', unit: '' },
      { title: '引水量', num: '', unit: '' },
      { title: '配水量', num: '', unit: '' },
      { title: '超汛限中大型水库个数', num: '', unit: '' },
      { title: '水质超标河道数', num: '', unit: '' }
    ]
  },
  {
    title: '固废处置',
    score: 100,
    icon: getImgUrl('icon-2'),
    list: [
      { title: '车辆备案率', num: '', unit: '' },
      { title: '车辆超载率', num: '', unit: '' },
      { title: '焚烧设施处置量', num: '', unit: '' },
      { title: '焚烧设施负荷率', num: '', unit: '' },
      { title: '易腐设施处置量', num: '', unit: '' },
      { title: '易腐设施负荷率', num: '', unit: '' }
    ]
  },
  {
    title: '市容景观',
    score: 100,
    icon: getImgUrl('icon-3'),
    list: [
      { title: '户外广告超期数', num: '', unit: '' },
      { title: '户外广告未检数', num: '', unit: '' },
      { title: '电子屏接入率', num: '', unit: '' },
      { title: '电子屏在线率', num: '', unit: '' },
      { title: '公益广告占比', num: '', unit: '' },
      { title: '昨日综合亮灯率', num: '', unit: '' }
    ]
  },
  {
    title: '市政设施',
    score: 100,
    icon: getImgUrl('icon-4'),
    list: [
      { title: '今日过桥车辆数', num: '', unit: '' },
      { title: '桥梁结构预警数', num: '', unit: '' },
      { title: '管廊安全运行天数', num: '', unit: '' },
      { title: '地下隐患当日处置闭环率', num: '', unit: '' },
      { title: '平路指数', num: '', unit: '' },
      { title: '隧道积水率', num: '', unit: '' }
    ]
  },
  {
    title: '城镇燃气',
    score: 100,
    icon: getImgUrl('icon-5'),
    list: [
      { title: '燃气用户总数', num: '', unit: '' },
      { title: '室内监测设备安装率', num: '', unit: '' },
      { title: '燃气管线', num: '', unit: '' },
      { title: '燃气企业', num: '', unit: '' },
      { title: '隐患整改率', num: '', unit: '' },
      { title: '综合检查整改率', num: '', unit: '' }
    ]
  },
  {
    title: '地铁保护区',
    score: 100,
    icon: getImgUrl('icon-6'),
    list: [
      { title: '运营里程数', num: '', unit: '' },
      { title: '昨日客流量', num: '', unit: '' },
      { title: '作业项目数', num: '', unit: '' },
      { title: '出动巡查数', num: '', unit: '' },
      { title: '项目报警数', num: '', unit: '' },
      { title: '违规作业处置数', num: '', unit: '' }
    ]
  }
])
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
      <div class="inner-item" v-for="(item, index) in runIndexList" :key="index">
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
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.50);
    }

    .inner-card {
      padding: 8px 16px 0 16px;
    }
  }
}
</style>
