<script setup>
import ItemMonitor from './comp/item-monitor.vue'
import RelativeUnit from './comp/relative-unit.vue'
import { reactive, ref } from 'vue'
import { commonGatewayApi } from '@/api/common-api'
import CommonTitle from '../../common/common-title.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

let detailData = reactive({})

const dataLoading = ref(true)

const getDetailData = () => {
  dataLoading.value = true
  commonGatewayApi('21b648e504', { projectCode: props.id, projectName: props.name })
    .then((dataList) => {
      if (Array.isArray(dataList)) {
        const [data] = dataList
        detailData = Object.assign({}, data || {})
      }
    }).finally(() => {
    dataLoading.value = false
  })
}

getDetailData()

const tabList = [{ text: '监测信息' }, { text: '相关单位' }]

const activeTabIndex = ref(0)

const changeTabHandler = (index) => {
  if (activeTabIndex.value !== index) {
    activeTabIndex.value = index
  }
}
</script>

<template>
  <div class="item-detail">
    <van-loading v-if="dataLoading" color="#0094ff" vertical>
      加载中...
    </van-loading>
    <template v-else>
      <div class="inner-ctx">
        <div class="ctx-header">
          <common-title :text="name"></common-title>
          <div class="header-inner">
            <div class="inner-item">
              <div class="item-label">项目类型：</div>
              <div class="item-text">{{ detailData.projectType }}</div>
            </div>
            <div class="inner-item">
              <div class="item-label">保护等级：</div>
              <div class="item-text">{{ detailData.grade }}</div>
            </div>
            <div class="inner-item">
              <div class="item-label">开工时间：</div>
              <div class="item-text">{{ detailData.approvalTime }}</div>
            </div>
            <div class="inner-item">
              <div class="item-label">所属区域：</div>
              <div class="item-text">{{ detailData.area }}</div>
            </div>
            <div class="inner-item">
              <div class="item-label">区间：</div>
              <div class="item-text">{{ detailData.projectSection }}</div>
            </div>
            <div class="inner-item">
              <div class="item-label">所属路线：</div>
              <div class="item-text">{{ detailData.line }}</div>
            </div>
          </div>
        </div>
        <div class="ctx-tabs">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="['tab-item', activeTabIndex === index ? 'tab-active' : '']"
            @click="changeTabHandler(index)"
          >
            {{ item.text }}
          </div>
        </div>
        <div class="ctx-cxt">
          <item-monitor v-if="activeTabIndex === 0" :name="props.name"></item-monitor>
          <relative-unit v-if="activeTabIndex === 1" :id="props.id" :name="props.name"></relative-unit>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.item-detail {
  min-height: calc(100vh - 18px);

  .inner-ctx {
    padding: 12px 12px 0 12px;

    .ctx-header {
      position: relative;
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

      .header-inner {
        display: grid;
        grid-gap: 8px 4px;
        padding: 0 16px 16px 16px;
        grid-template-columns: repeat(2, 1fr);

        .inner-item {
          display: flex;
          height: 22px;
          color: #666666;
          line-height: 22px;
          align-items: center;

          .item-text {
            flex: 1;
            @include ellipsis(1);
          }
        }
      }

      &:before {
        position: absolute;
        top: 12px;
        right: 4px;
        height: 96px;
        width: 105px;
        content: "";
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("img/img-title-bg.webp");
      }
    }

    .ctx-tabs {
      display: grid;
      padding-top: 12px;
      align-items: center;
      grid-template-columns: repeat(2, 1fr);

      .tab-item {
        height: 32px;
        color: #666666;
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        border: 0.5px solid #d9d9d9;
        background-color: #ffffff;

        &:nth-child(1) {
          border-right: 0;
          border-radius: 8px 0 0 8px;
        }

        &:nth-child(2) {
          border-left: 0;
          border-radius: 0 8px 8px 0;
        }
      }

      .tab-active {
        color: #ffffff;
        background-color: #0482ff;
        border: 0.5px solid transparent;
      }
    }

    .ctx-cxt {
      margin-top: 12px;
      border-radius: 12px;
      background-color: #ffffff;
      min-height: calc(100vh - 198px);
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);
    }
  }
}
</style>
