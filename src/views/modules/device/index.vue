<script setup>
import { ref } from 'vue'
import { buildTree } from '@/utils'
import { commonGatewayApi } from '@/api/gateway-api'


import CardWrap from '@/views/modules/device/comp/card-wrap.vue'

const props = defineProps({
  num: {
    type: String
  }
})

const dataLoading = ref(false)

const tabConfigList = ref([
  { title: '一级设施', num: 0, list: [] },
  { title: '二级设施', num: 0, list: [] }
])

const activeIndex = ref(0)

const getDataHandler = () => {
  dataLoading.value = true
  commonGatewayApi('218b575c65', { mod_code: 'P01-T01' }).then(dataList => {
    if (Array.isArray(dataList)) {
      const tempList1 = dataList.filter(item => item.CLASS_CODE_2 === '1' || !item.CLASS_CODE_2)
      const tempList2 = dataList.filter(item => item.CLASS_CODE_2 === '0' || !item.CLASS_CODE_2)
      // 一级设施
      const [dataTree1] = buildTree(tempList1, 'P01-T01-000', 'ID', 'CLASS_CODE')
      const { children: list1 } = dataTree1 || { children: [] }
      tabConfigList.value[0].list = list1
      tabConfigList.value[0].num = list1.reduce((acc, cur) => acc + Number(cur.NUM), 0)
      // 二级设施
      const [dataTree2] = buildTree(tempList2, 'P01-T01-000', 'ID', 'CLASS_CODE')
      const { children: list2 } = dataTree2 || { children: [] }
      tabConfigList.value[1].list = list2
      tabConfigList.value[1].num = list2.reduce((acc, cur) => acc + Number(cur.NUM), 0)
    }
    dataLoading.value = false
  }).catch(() => {
    dataLoading.value = false
  })
}
getDataHandler()

const tabChangeHandler = () => {

}
</script>

<template>
  <div class="device-wrap">
    <div class="device-header">
      <div class="header-inner">
        <div class="inner-num">{{ num }}</div>
        <div class="inner-text">关键设施</div>
      </div>
    </div>
    <div class="device-inner">
      <div class="tabs-wrap">
        <div class="tabs-inner">
          <van-tabs
            v-model:active="activeIndex"
            color="#0482FF"
            background="#ffffff"
            title-active-color="#0482FF"
            @change="tabChangeHandler()"
          >
            <van-tab
              v-for="(item, index) in tabConfigList"
              :key="index"
              :name="index"
              :title="item.title + `(${item.num}个)`"
            />
          </van-tabs>
        </div>
      </div>
      <div class="ctx-wrap">
        <van-loading v-if="dataLoading" color="#0094ff" vertical>
          加载中...
        </van-loading>
        <div v-else class="ctx-inner">
          <card-wrap :list="tabConfigList[activeIndex].list"></card-wrap>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.device-wrap {
  .device-header {
    height: 122px;
    width: 375px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("@/views/modules/device/img/img-header-bg.webp");

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

  .device-inner {
    border-radius: 12px;
    background-color: #ffffff;
    margin: -12px 12px 0 12px;
    box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.50);

    .tabs-wrap {

      padding-top: 2px;

      .tabs-inner {
        margin: 0 2px;
        border-radius: 10px 10px 0 0;
        background-image: linear-gradient(359deg, rgba(241, 250, 255, 0.00) 0%, #f1faff);

        :deep(.van-tabs--line) {
          background-color: transparent;

          .van-tabs__wrap {
            .van-tabs__nav {
              border-radius: 12px 12px 0 0;
              background-color: transparent !important;
            }
          }
        }
      }
    }

    .ctx-wrap {
      border-radius: 0 0 12px 12px;
      min-height: calc(100vh - 172px);

      .ctx-inner {
        padding: 0 12px;
        grid-template-rows: repeat(3, 1fr);

      }
    }
  }
}
</style>
