<script setup>
import { getImgUrlFn } from '@/utils'

defineProps({
  itemData: {
    type: Object,
    required: true
  }
})

const getImgUrl = getImgUrlFn('../views/modules/home/img')

const computeClass = (num) => {
  const tempList = ['num-text']
  if (num === '正常') {
    tempList.push('status-1')
  }
  if (num === '异常') {
    tempList.push('status-0')
  }
  return tempList
}
</script>

<template>
  <div :class="['core-item', itemData.isAlarm ? 'core-alarm' : '']">
    <div class="card-inner">
      <div class="item-header">
        <img
          class="header-icon"
          :src="
            getImgUrl(itemData.iconName + (itemData.isAlarm ? '-alarm' : ''))
          "
          alt=""
        />
        <div class="header-text">{{ itemData.text }}</div>
      </div>
      <div class="index-wrap">
        <div
          class="index-item"
          v-for="(item, index) in itemData.list"
          :key="index"
        >
          <div class="item-text">{{ item.text }}</div>
          <div class="item-num">
            <div :class="computeClass(item.num)">
              {{ item.num === "-" ? 0 : item.num }}
            </div>
            <div class="num-unit">{{ item.unit }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="core-status">{{ itemData.isAlarm ? "报警" : "正常" }}</div>
  </div>
</template>

<style scoped lang="scss">
.core-item {
  position: relative;
  width: 154px;
  height: 160px;
  border-radius: 4px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: linear-gradient(180deg, #ecfbf9 0%, #f9fefd 100%);

  .card-inner {
    padding: 12px;

    .item-header {
      height: 22px;
      line-height: 22px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;

      .header-icon {
        width: 18px;
        height: 18px;
        object-fit: cover;
      }

      .header-text {
        height: 22px;
        color: #333333;
        font-size: 14px;
        line-height: 22px;
      }
    }

    .index-wrap {
      display: grid;
      grid-gap: 12px 0;
      grid-template-rows: repeat(2, 1fr);

      .index-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .item-text {
          height: 22px;
          font-size: 14px;
          color: #666666;
          line-height: 22px;
        }

        .item-num {
          display: flex;
          color: #333333;
          align-items: flex-end;

          .num-text {
            height: 32px;
            font-size: 24px;
            line-height: 32px;
            font-family: Alternate-Bold;
          }

          .status-0 {
            color: #ff4c63;
            font-size: 18px;
            font-family: YouSheBiaoTiHei;
          }

          .status-1 {
            color: #00c1a2;
            font-size: 18px;
            font-family: YouSheBiaoTiHei;
          }

          .num-unit {
            height: 20px;
            font-size: 12px;
            margin-left: 2px;
            line-height: 20px;
          }
        }

        .no-data {
          height: 22px;
          font-size: 14px;
          color: #999999;
          line-height: 22px;
        }
      }
    }
  }

  .core-status {
    position: absolute;
    top: 0;
    right: 0;
    height: 18px;
    font-size: 12px;
    padding: 0 8px;
    line-height: 18px;
    color: #ffffff;
    border-radius: 0 4px;
    background-color: #00c1a2;
    font-family: YouSheBiaoTiHei;
  }
}

.core-alarm {
  background-image: linear-gradient(180deg, #fff3f3 0%, #fffcfb 100%);

  .core-status {
    background-color: #ff4c63;
  }
}
</style>
