<script setup>
import { reactive, ref } from 'vue'
import { commonGatewayApi } from '@/api/common-api'


let detail = reactive({
  aiScore: '0.00',
  orderScore: '0',
  tidyScore: '0',
  cleanScore: '0'
})
const getDataHandler = async () => {
  const dataList = await commonGatewayApi('21bb26a236', {
    fixyear: '2024',
    fixWeek: '2',
    fixmonth: '1',
    dim: 'week'
  }) || {}

  const [data] = dataList
  detail = Object.assign(detail, data || {})
}
getDataHandler()

const dataList = ref([])
const getDataList = async () => {
  const tempList = await commonGatewayApi('21bb289c9e', {
    fixyear: '2024',
    fixWeek: '2',
    fixmonth: '1',
    dim: 'week'
  })

  if (Array.isArray(tempList)) {
    dataList.value = tempList
  }
}

getDataList()
</script>

<template>
  <div class="week-view">
    <div class="view-inner">
      <div class="inner-date"></div>
      <div class="inner-score">
        <div class="score-title">智能自动评价</div>
        <div class="score-ctx">
          <div
            v-for="(item, index) in detail.aiScore.split('')"
            :key="index"
            :class="[item === '.' ? 'ctx-drop' : 'ctx-item']"
          >
            {{ `${item === '.' ? '' : item}` }}
          </div>
        </div>
        <div class="score-unit">分</div>
      </div>
      <div class="inner-grid">
        <div class="grid-item">
          <div class="item-text">干净指数</div>
          <div class="item-num">{{ detail.cleanScore }}</div>
        </div>
        <div class="grid-item">
          <div class="item-text">整洁指数</div>
          <div class="item-num">{{ detail.tidyScore }}</div>
        </div>
        <div class="grid-item">
          <div class="item-text">有序指数</div>
          <div class="item-num">{{ detail.orderScore }}</div>
        </div>
      </div>
      <div class="inner-list">
        <div
          class="list-item"
          v-for="(item, index) in dataList"
          :key="index"
          @click="$router.push({ name: 'examine-list', query: { name: item.proType, index: '1' } })"
        >
          <div class="item-inner">
            <div class="item-title">{{ item.proType }}</div>
            <div class="item-text">{{ `${item.num}件` }}</div>
            <div class="item-text">{{ `扣${item.deductScore}分` }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.week-view {
  padding-bottom: 16px;

  .view-inner {

    .inner-date {
      padding: 14px 0 18px 0;
    }

    .inner-score {
      height: 74px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-image: linear-gradient(180deg, #EEF7FF, rgba(255, 255, 255, 0.00));

      .score-title {
        height: 22px;
        font-size: 16px;
        color: #333333;
        line-height: 22px;
      }

      .score-ctx {
        display: grid;
        grid-gap: 0 4px;
        grid-auto-flow: column;
        grid-template: max-content / max-content;

        .ctx-item {
          width: 28px;
          height: 40px;
          color: #ffffff;
          font-size: 24px;
          line-height: 40px;
          text-align: center;
          background-size: cover;
          font-family: Alternate-Bold;
          background-repeat: no-repeat;
          background-image: url("@/views/modules/manage/img/icon-6.webp");
        }

        .ctx-drop {
          width: 4px;
          height: 5px;
          align-self: end;
          background-size: cover;
          background-position: bottom;
          background-repeat: no-repeat;
          background-image: url("@/views/modules/manage/img/icon-7.webp");
        }
      }

      .score-unit {
        height: 22px;
        font-size: 16px;
        color: #666666;
        line-height: 22px;
      }
    }

    .inner-grid {
      margin: 12px 0;
      display: grid;
      grid-gap: 0 8px;
      align-items: center;
      justify-content: center;
      grid-template-columns: repeat(3, 1fr);

      .grid-item {
        .item-text {
          height: 20px;
          color: #666666;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
        }

        .item-num {
          height: 32px;
          color: #333333;
          font-size: 24px;
          margin-top: 2px;
          line-height: 32px;
          text-align: center;
          font-family: Alternate-Bold;
        }
      }
    }

    .inner-list {
      display: grid;
      grid-gap: 8px 0;

      .list-item {
        border-radius: 2px;
        border: 0.5px solid #e5e5e5;

        .item-inner {
          height: 48px;
          display: flex;
          padding: 0 16px;
          line-height: 48px;
          align-items: center;
          justify-content: space-between;

          .item-title {
            width: 154px;
            font-size: 14px;
            color: #666666;
            line-height: 22px;
            @include ellipsis(1);
          }

          .item-text {
            font-size: 14px;
            color: #333333;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
