<script setup>
import dayjs from 'dayjs'
import { reactive, ref } from 'vue'

import { useCommonStore } from '@/store'
import EmptyPage from '@/views/common/empty-page.vue'
import CustomList from '@/views/common/custom-list.vue'
import CommonTabs from '@/views/common/common-tabs.vue'
import CommonInput from '@/views/common/common-input.vue'
import WaterCard from '@/views/modules/vital-signs/comp/water-card.vue'

const commonState = useCommonStore()

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
const tabConfigList = [
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

const activeIndex = ref(0)
const areaDataList = ref([])
const thirdTypeList = ref([])
const tabChangeHandler = (index, level) => {
  const tempList =
    tabConfigList[level === 1 ? index : activeIndex.value].children
  if (tempList.length) {
    const { title } = tempList[level === 1 ? 0 : index]
    thirdTypeList.value = areaDataList.value.filter(
      (item) => item.model === title
    )
  }
}

const getAreaDataList = async () => {
  areaDataList.value = await commonState.initAreaListAction()
  tabChangeHandler(activeIndex.value, 1)
}
getAreaDataList()

const searchForm = reactive({
  thirdType: undefined,
  factoryName: undefined
})

const customListRef = ref()

const thirdTypeChange = (type) => {
  if (searchForm.thirdType === type) {
    searchForm.thirdType = undefined
  } else {
    searchForm.thirdType = type
  }
  customListRef.value.getDataList(searchForm)
}
</script>

<template>
  <div class="vital-signs">
    <div class="signs-inner">
      <div class="tabs-wrap">
        <common-tabs
          v-model:active="activeIndex"
          :tab-config-list="tabConfigList"
          color="#0482FF"
          :swipe-threshold="4"
          title-active-color="#0482FF"
          @change="(index) => tabChangeHandler(index, 1)"
        >
        </common-tabs>
      </div>

      <div class="ctx-wrap">
        <div class="ctx-inner">
          <custom-list
            v-if="tabConfigList[activeIndex].children?.length"
            ref="customListRef"
            :key="activeIndex"
            :tab-config-list="tabConfigList[activeIndex].children"
            @inner-tab-change="(index) => tabChangeHandler(index, 2)"
          >
            <template #card-item="{ data, index }">
              <div class="card-wrap">
                <water-card
                  :data="data"
                  :origin-type="tabConfigList[activeIndex].title"
                  :second-type="
                    tabConfigList[activeIndex].children[index].title
                  "
                >
                </water-card>
              </div>
            </template>
            <template #search>
              <div class="search-wrap">
                <div class="third-wrap">
                  <div
                    v-for="(item, index) in thirdTypeList"
                    :key="index"
                    :class="[
                      'third-item',
                      searchForm.thirdType === item.type ? 'item-active' : '',
                    ]"
                    @click="() => thirdTypeChange(item.type)"
                  >
                    {{ item.type }}
                  </div>
                </div>
                <common-input
                  v-model="searchForm.factoryName"
                  placeholder="请输入名称"
                ></common-input>
              </div>
            </template>
          </custom-list>
          <empty-page v-else :empty-type="2" desc="内容建设中"></empty-page>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vital-signs {
  .signs-inner {
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

    .ctx-wrap {
      padding: 12px 12px 0 12px;
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

      .ctx-inner {
        position: relative;
        border-radius: 12px;
        background-color: #ffffff;
        min-height: calc(100vh - 199px);

        .card-wrap {
          padding: 0 16px;
        }

        .search-wrap {
          padding: 12px 16px 0 16px;

          .third-wrap {
            display: flex;
            gap: 6px;
            padding-bottom: 12px;

            .third-item {
              height: 32px;
              color: #333333;
              padding: 0 12px;
              font-size: 12px;
              line-height: 32px;
              border-radius: 6px;
              background-color: #f5f7fa;
            }

            .item-active {
              color: #0482ff;
              background-color: rgba(4, 130, 255, 0.1);
            }
          }
        }
      }
    }
  }
}
</style>
