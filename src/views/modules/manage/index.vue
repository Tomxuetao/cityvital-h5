<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import { getImgUrlFn } from '@/utils'

import { commonGatewayApi } from '@/api/common-api'
import CommonTitle from '@/views/common/common-title.vue'

const getImgUrl = getImgUrlFn('../views/modules/manage/img')


const tabConfigList = [
  { text: '事件', code: '224a955522' },
  { text: '业务', code: '22648eae90' },
  { text: '报告', code: '2263418e0f' }
]
const activeIndex = ref(0)

const analysisList = ref([])
/**
 * 获取分析研判数据
 * @param index
 * @returns {Promise<void>}
 */
const today = dayjs().format('YYYY-MM-DD')
const getAnalysisList = async (index = 0) => {
  const { code } = tabConfigList[index]
  const dataList = await commonGatewayApi(code, { beginDate: today, endDate: today })
  analysisList.value = dataList || []
}
getAnalysisList()

const commandList = ref([
  { text: '平时总览', img: getImgUrl('icon-1') },
  { text: '受理事件数', num: '', unit: '' },
  { text: '结案事件数', num: '', unit: '' },
  { text: '战时指挥', img: getImgUrl('icon-2') },
  { text: '全年应急数', num: '', unit: '' },
  { text: '应急中事件数', num: '', unit: '' }
])
/**
 * 获取指挥协调数据
 * @returns {Promise<void>}
 */
const getCommandList = async () => {
  const tempDataList = await Promise.all([commonGatewayApi('218b575c65', { mod_code: 'P09-L03' }), commonGatewayApi('218b575c65', { mod_code: 'P09-L04' })])

  const dataList = tempDataList.flat(2) || []

  commandList.value.forEach(item => {
    const tempData = dataList.find(temp => temp.NAME === item.text)
    if (tempData) {
      Object.assign(item, { num: tempData.NUM, unit: tempData.UNIT })
    }
  })
}
getCommandList()


const examineList = ref([
  { text: '一网统管效能指数', id: 'P09-L05', num: '0.00', unit: '分', img: getImgUrl('icon-3'), list: [] },
  { text: '智能自动评价', id: 'P09-L07', num: '', unit: '分', img: getImgUrl('icon-4'), list: [], hasImg: true },
  { text: '美丽杭州大检查考核', id: 'P09-L06', num: '', unit: '分', img: getImgUrl('icon-5'), list: [] }
])

/**
 * 获取考核评价数据
 * @returns {Promise<void>}
 */
const getExamineList = async () => {
  const tempDataList = await Promise.all([
    commonGatewayApi('218b575c65', { mod_code: 'P09-L05' }),
    commonGatewayApi('218b575c65', { mod_code: 'P09-L06' }),
    commonGatewayApi('218b575c65', { mod_code: 'P09-L07' })
  ])
  const dataList = tempDataList.flat(2) || []
  examineList.value.forEach(item => {
    const tempList = dataList.filter(temp => temp.ID.includes(item.id))
    tempList.forEach(({ CLASS_NAME, ID, NUM, UNIT, NAME }) => {
      if (CLASS_NAME === '总分' || ['P09-L05-001', 'P09-L07-001'].includes(ID)) {
        Object.assign(item, { num: NUM })
      } else {
        item.list.push({
          text: CLASS_NAME || NAME,
          num: NUM,
          unit: UNIT || '分'
        })
      }
    })
  })
}

getExamineList()

const changeTab = (index) => {
  if (index !== activeIndex.value) {
    activeIndex.value = index
    getAnalysisList(index)
  }
}
</script>

<template>
  <div class="manage-wrap">
    <div class="inner-wrap">
      <div class="inner-item">
        <common-title text="分析研判">
          <div class="tabs-wrap">
            <div
              v-for="(tab, index) in tabConfigList"
              :key="index"
              :class="[ 'tab-item',activeIndex === index ? 'tab-active' : '']"
              @click="changeTab(index)"
            >
              {{ tab.text }}
            </div>
          </div>
        </common-title>
        <div class="item-wrap analysis-wrap">
          <div
            class="analysis-item"
            v-for="({ id, model_id, name, model_name,NUM, num, unit }, index) in analysisList"
            :key="index"
            @click="$router.push({ name: 'analysis-list', query: { id: id || model_id, name: name || model_name, index: activeIndex }})"
          >
            <div class="item-title">{{ model_name || name }}</div>
            <div class="item-num">
              <div class="num-text">{{ NUM || num }}</div>
              <div class="num-unit">{{ unit }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="inner-item">
        <common-title text="指挥协调"></common-title>
        <div class="item-wrap command-wrap">
          <div class="command-item" v-for="(item, index) in commandList" :key="index">
            <template v-if="item.img">
              <img class="item-img" :src="item.img" alt="">
              <div class="item-title">{{ item.text }}</div>
            </template>
            <template v-else>
              <div class="item-title">{{ item.text }}</div>
              <div class="item-num">
                <div class="num-text">{{ item.num }}</div>
                <div class="num-unit">{{ item.unit }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="inner-item">
        <common-title text="考核评价"></common-title>
        <div class="item-wrap examine-wrap">
          <div class="examine-item" v-for="(item, index) in examineList" :key="index">
            <div class="title-wrap">
              <div class="title-item">
                <img class="item-img" :src="item.img" alt="">
                <div class="item-text">{{ item.text }}</div>
              </div>
              <div class="score-wrap">
                <div class="score-text">{{ `${item.num || '0.00'} (分)` }}</div>
                <div
                  :class="['score-img', item.hasImg ? 'has-img' : '']"
                  @click="$router.push({ name: 'examine-view' })"
                >
                </div>
              </div>
            </div>
            <template v-if="item.list.length">
              <div class="list-wrap">
                <div class="list-item" v-for="(item2, index2) in item.list" :key="index2">
                  <div class="item-text">{{ item2.text }}</div>
                  <div class="item-text">{{ `${item2.num} ${item2.unit}` }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.manage-wrap {
  .inner-wrap {
    display: grid;
    grid-gap: 12px 0;
    padding: 12px 12px 0 12px;

    .inner-item {
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

      .tabs-wrap {
        display: grid;
        align-items: center;
        grid-template-columns: repeat(3, 1fr);

        .tab-item {
          height: 22px;
          color: #666666;
          font-size: 12px;
          padding: 2px 8px;
          line-height: 18px;
          text-align: center;
          background-color: #ffffff;
          border: 0.5px solid #d9d9d9;

          &:nth-child(2) {
            border-left: 0;
            border-right: 0;
          }

          &:nth-child(1) {
            border-radius: 4px 0 0 4px;
          }

          &:nth-child(3) {
            border-radius: 0 4px 4px 0;
          }
        }

        .tab-active {
          color: #ffffff;
          background-color: #0482ff;
          border: 0.5px solid transparent;
        }
      }

      .item-wrap {
        padding: 4px 16px 16px 16px;
      }

      .analysis-wrap {
        min-height: 92px;
        display: grid;
        grid-gap: 10px 10px;
        grid-template-columns: 1fr 1fr 1fr;

        .analysis-item {
          border-radius: 2px;
          border: 0.5px solid #e5e5e5;

          .item-title {
            color: #666666;
            text-align: center;
            padding: 10px 0 2px 0;
          }

          .item-num {
            display: flex;
            padding-bottom: 10px;
            align-items: flex-end;
            justify-content: center;

            .num-text {
              height: 32px;
              font-size: 24px;
              color: #333333;
              line-height: 32px;
              font-family: Alternate-Bold;
            }

            .num-unit {
              height: 20px;
              font-size: 12px;
              color: #666666;
              margin-left: 2px;
            }
          }
        }
      }

      .command-wrap {
        position: relative;
        display: grid;
        grid-gap: 24px 10px;
        grid-template-columns: 1fr 1fr 1fr;

        .command-item {
          display: flex;
          align-items: center;
          flex-direction: column;

          .item-title {
            height: 26px;
            color: #666666;
            line-height: 26px;
            text-align: center;
          }

          .item-img {
            width: 27px;
            height: 27px;
            object-fit: cover;
            margin-bottom: 4px;
          }

          .item-num {
            display: flex;
            padding-top: 2px;
            align-items: flex-end;
            justify-content: center;

            .num-text {
              height: 32px;
              font-size: 24px;
              color: #333333;
              line-height: 32px;
              font-family: Alternate-Bold;
            }

            .num-unit {
              height: 20px;
              font-size: 12px;
              color: #666666;
              margin-left: 2px;
            }
          }
        }

        &:after {
          position: absolute;
          content: "";
          height: 0.5px;
          width: calc(100% - 32px);
          left: 16px;
          bottom: calc(50% + 8px);
          background-color: #eeeeee;
        }
      }

      .examine-wrap {
        padding-top: 0;
        margin-top: -8px;

        .examine-item {
          .title-wrap {
            position: relative;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title-item {
              display: flex;
              align-items: center;

              .item-img {
                width: 18px;
                height: 18px;
                object-fit: cover;
                margin-right: 4px;
              }

              .item-text {
                height: 22px;
                font-size: 14px;
                font-weight: 500;
                color: #333333;
                line-height: 22px;
              }
            }

            .score-wrap {
              display: flex;
              align-items: center;

              .score-text {
                height: 22px;
                font-size: 14px;
                font-weight: 500;
                color: #333333;
                line-height: 22px;
                margin-right: 4px;
              }

              .score-img {
                width: 14px;
                height: 14px;
                pointer-events: none;
                transform: rotate(270deg);
              }

              .has-img {
                margin-top: 2px;
                pointer-events: all;
                background-size: cover;
                background-repeat: no-repeat;
                background-image: url("@/views/common/img/icon-arrow.webp");
              }
            }

            &:after {
              position: absolute;
              content: "";
              left: 0;
              bottom: 0;
              width: 100%;
              border-bottom: 0.5px solid #eeeeee;
            }
          }

          .list-wrap {
            .list-item {
              position: relative;
              height: 38px;
              display: flex;
              color: #666666;
              line-height: 38px;
              align-items: center;
              padding: 0 18px 0 22px;
              justify-content: space-between;

              &:after {
                position: absolute;
                content: "";
                left: 0;
                bottom: 0;
                width: 100%;
                border-bottom: 0.5px dashed #eeeeee;
              }

              &:nth-last-child(1) {
                &:after {
                  border-bottom: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
