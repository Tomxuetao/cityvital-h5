<script setup>
import { ref } from 'vue'
import { commonGatewayApi } from '@/api/common-api'

const dataList = ref([])
const getDataList = async () => {

  const tempDataList = await Promise.all([
    commonGatewayApi('218b575c65', { mod_code: 'P13-L01', is_n: 'd0' }),
    commonGatewayApi('218b575c65', { ID: 'P13-L02-005', is_n: 'd0' })
  ])

  dataList.value = tempDataList.flat(2) || []
}

getDataList()
</script>

<template>
  <div class="today-view">
    <div class="view-item">
      <div class="item-wrap" v-for="(item, index) in dataList.slice(0, 4)" :key="index">
        <div class="item-title">{{ item.NAME }}</div>
        <div class="item-num">
          <div class="num-text">{{ item.NUM }}</div>
          <div class="num-unit">{{ item.UNIT }}</div>
        </div>
      </div>
    </div>
    <div class="view-item event-wrap">
      <div
        class="item-wrap"
        v-for="(item, index) in dataList.slice(4)"
        :key="index"
        @click="$router.push({ name: 'examine-list', query: { name: item.CLASS_NAME, index: '0' } })"
      >
        <div class="item-title">{{ item.CLASS_NAME.replace('、', '') }}</div>
        <div class="item-text">{{ `${item.NUM} ${item.UNIT}` }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.today-view {
  padding-top: 8px;

  .view-item {
    display: grid;
    grid-gap: 12px;
    align-items: center;
    grid-template-columns: 1fr 1fr;

    .item-wrap {
      .item-title {
        color: #666666;
        font-size: 14px;
        text-align: center;
      }

      .item-num {
        display: flex;
        margin-top: 2px;
        align-items: flex-end;
        justify-content: center;

        .num-text {
          height: 32px;
          color: #333333;
          font-size: 24px;
          line-height: 32px;
          font-family: Alternate-Bold;
        }

        .num-unit {
          height: 20px;
          font-size: 12px;
          margin-left: 2px;
          color: #999999;
          line-height: 20px;
        }
      }
    }
  }

  .event-wrap {
    margin-top: 16px;

    .item-wrap {
      height: 52px;
      display: flex;
      border-radius: 2px;
      padding: 8px 12px;
      align-items: center;
      border: 0.5px solid #e5e5e5;
      justify-content: space-between;

      .item-title {
        width: 72px;
        color: #666666;
        font-size: 14px;
        text-align: center;
      }

      .item-text {
        color: #333333;
        font-size: 14px;
      }
    }
  }
}
</style>
