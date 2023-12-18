<script setup>
import { getImgUrlFn } from '@/utils'

const props = defineProps({
  itemData: {
    type: Object,
    required: true
  }
})

const getImgUrl = getImgUrlFn('../views/modules/home/img')

</script>

<template>
  <div class="core-item">
    <div class="card-inner">
      <div class="item-header">
        <img class="header-icon" :src="getImgUrl(itemData.iconName)" alt=""/>
        <div class="header-text">{{ itemData.text }}</div>
      </div>
      <div class="index-wrap">
        <div class="index-item" v-for="(item, index) in itemData.list" :key="index">
          <div class="item-text">{{ item.text }}</div>
          <div class="item-num">
            <div class="num-text">{{ item.num === '-' ? 0 : item.num }}</div>
            <div class="num-unit">{{ item.unit }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.core-item {
  position: relative;
  width: 154px;
  height: 160px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("@/views/modules/home/img/img-index-bg.webp");

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
          color: #00c1a2;
          align-items: flex-end;

          .num-text {
            height: 32px;
            font-size: 24px;
            line-height: 32px;
            font-family: Alternate-Bold;
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
}
</style>
