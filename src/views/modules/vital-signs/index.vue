<script setup>
import dayjs from 'dayjs'
import { reactive, ref } from 'vue'

import { useCommonStore } from '@/store'
import CommonList from '@/views/common/common-list.vue'
import CommonInput from '@/views/common/common-input.vue'
import EmptyPage from '@/views/common/empty-page.vue'
import RiverCard from '@/views/modules/vital-signs/comp/river-card.vue'

const commonState = useCommonStore()

const curDate = dayjs().format('YYYY-MM-DD')
const nextDate = dayjs().add(1, 'day').format('YYYY-MM-DD')
const tabConfigList = [
  {
    title: '水设施河道',
    children: [
      {
        title: '供水',
        code: 'event/list',
        customForm: {
          title: '水设施河道-供水',
          sortTimeFiled: 'latestCheckTime',
          latestCheckEndTime: `${nextDate} 00:00:00`,
          latestCheckStartTime: `${curDate} 00:00:00`
        }
      },
      {
        title: '污水',
        code: 'event/list',
        customForm: {
          title: '水设施河道-污水',
          sortTimeFiled: 'latestCheckTime',
          latestCheckEndTime: `${nextDate} 00:00:00`,
          latestCheckStartTime: `${curDate} 00:00:00`
        }
      },
      {
        title: '河道',
        code: 'event/list',
        customForm: {
          title: '水设施河道-河道',
          sortTimeFiled: 'latestCheckTime',
          latestCheckEndTime: `${nextDate} 00:00:00`,
          latestCheckStartTime: `${curDate} 00:00:00`
        }
      },
      {
        title: '内涝',
        code: 'event/list',
        customForm: {
          title: '水设施河道-内涝',
          sortTimeFiled: 'latestCheckTime',
          latestCheckEndTime: `${nextDate} 00:00:00`,
          latestCheckStartTime: `${curDate} 00:00:00`
        }
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
        code: 'event/list',
        customForm: {
          title: '市容景观-开关箱',
          sortTimeFiled: 'latestCheckTime',
          latestCheckEndTime: `${nextDate} 00:00:00`,
          latestCheckStartTime: `${curDate} 00:00:00`
        }
      },
      {
        title: '户外广告',
        code: 'event/list',
        customForm: {
          title: '市容景观-户外广告',
          sortTimeFiled: 'latestCheckTime',
          latestCheckEndTime: `${nextDate} 00:00:00`,
          latestCheckStartTime: `${curDate} 00:00:00`
        }
      },
      {
        title: '户外电子屏',
        code: 'event/list',
        customForm: {
          title: '市容景观-户外电子屏',
          sortTimeFiled: 'latestCheckTime',
          latestCheckEndTime: `${nextDate} 00:00:00`,
          latestCheckStartTime: `${curDate} 00:00:00`
        }
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
  const tempList = tabConfigList[level === 1 ? index : activeIndex.value].children
  if (tempList.length) {
    const { title } = tempList[level === 1 ? 0 : index]
    thirdTypeList.value = areaDataList.value.filter(item => item.model === title)
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

const commonListRef = ref()
</script>

<template>
  <div class="vital-signs">
    <div class="signs-inner">
      <div class="tabs-wrap">
        <van-tabs
          v-model:active="activeIndex"
          title-active-color="#0482FF"
          title-inactive-color="#666666"
          @change="(index) => tabChangeHandler(index, 1)"
        >
          <van-tab
            v-for="(item, index) in tabConfigList"
            :key="index"
            :name="index"
            :title="item.title"
          >
          </van-tab>
        </van-tabs>
      </div>

      <div class="ctx-wrap">
        <div class="ctx-inner">
          <common-list
            v-if="tabConfigList[activeIndex].children?.length"
            :tab-config-list="tabConfigList[activeIndex].children"
            :key="activeIndex"
            ref="commonListRef"
            @inner-tab-change="(index) => tabChangeHandler(index, 2)"
          >
            <template #card-item="{ data }">
              <div class="card-wrap">
                <river-card :data="data"></river-card>
              </div>
            </template>
            <template #search>
              <div class="search-wrap">
                <div class="third-wrap">
                  <div
                    v-for="(item, index) in thirdTypeList"
                    :key="index"
                    :class="['third-item', searchForm.thirdType === item.type ? 'item-active' : '']"
                    @click="() => searchForm.thirdType = item.type"
                  >
                    {{ item.type }}
                  </div>
                </div>
                <common-input
                  v-model="searchForm.factoryName"
                  placeholder="请输入名称"
                >
                </common-input>
              </div>
            </template>
          </common-list>
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
        content: '';
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
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.50);

      .ctx-inner {
        min-height: calc(100vh - 199px);
        border-radius: 12px;
        background-color: #ffffff;

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
              background-color: #F5F7FA;
            }

            .item-active {
              color: #0482FF;
              background-color: rgba(4, 130, 255, 0.10);
            }
          }
        }
      }
    }
  }
}
</style>
