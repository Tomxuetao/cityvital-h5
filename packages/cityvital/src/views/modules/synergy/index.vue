<script setup>
import CommonTabs from '../../common/common-tabs.vue'
import { ref } from 'vue'

const activeIndex = ref(0)

const commonDomain = 'https://ggfw.cgw.hangzhou.gov.cn'

const tabList = [
  { title: '停车管理', url: '/cmdb-ds#/industry/parking' },
  { title: '公共慢行', url: '/cmdb-ds#/industry/slow' },
  { title: '工程渣土', url: '/cmdb-ds#/industry/muck' },
  { title: '生活垃圾', url: '/cmdb-ds#/special-topic/garbage-classify' },
  { title: '市容景观', url: '/cmdb-ds#/industry/light' },
  { title: '户外广告', url: '/cmdb-ds#/special-topic/advertisement' },
  { title: '智慧市政', url: '/cmdb-ds#/industry/wisdom-city' },
  { title: '智慧河道', url: '/cmdb-ds#/industry/riverway' },
  { title: '综合执法', url: '/cmdb-ds#/industry/enforce-law' }
]
</script>

<template>
  <div class="synergy-wrap">
    <div class="synergy-inner">
      <div class="tabs-wrap">
        <common-tabs
          v-model:active="activeIndex"
          :tab-config-list="tabList"
          color="#0482FF"
          :swipe-threshold="4"
          title-active-color="#0482FF"
        >
        </common-tabs>
      </div>
      <iframe class="inner-ctx" :src="commonDomain + tabList[activeIndex].url"></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">
.synergy-wrap {
  .synergy-inner {
    .tabs-wrap {
      position: relative;

      &:before {
        position: absolute;
        content: "";
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 0.5px;
        background-color: #f0f2f5;
      }

      :deep(.van-tabs--line) {
        .van-tabs__wrap {
          height: 34px;

          .van-tabs__nav {
            align-items: center;
            padding-bottom: 0;

            .van-tabs__line {
              display: none;
            }

            .van-tab--grow {
              align-items: center;

              .van-tab__text {
                height: 20px;
                line-height: 20px;
              }
            }
          }
        }
      }
    }

    .inner-ctx {
      border: 0;
      width: 100vw;
      height: 100vh;
    }
  }
}
</style>
