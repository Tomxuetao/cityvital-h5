<script setup>
defineProps({
  list: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div class="card-wrap">
    <div class="card-item" v-for="(item, index) in list" :key="index">
      <div class="item-title">{{ item.title }}</div>
      <div class="item-num">
        <template v-if="item.num || item.unit">
          <div class="num-text">
            {{
              (item.num + "").includes(".")
                ? Number(item.num).toFixed(2)
                : item.num
            }}
          </div>
          <div class="num-unit">{{ item.unit }}</div>
        </template>
        <div v-else class="num-text">-</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-wrap {
  display: grid;
  grid-gap: 12px 24px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);

  .card-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    .item-title {
      text-align: center;
      font-size: 14px;
      color: #666666;
      line-height: 18px;
      margin-bottom: 2px;
    }

    .item-num {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      .num-text {
        height: 30px;
        font-size: 22px;
        font-weight: Bold;
        color: #333333;
        line-height: 30px;
        text-align: center;
        font-family: Alternate-Bold;
      }

      .num-unit {
        height: 20px;
        color: #999999;
        font-size: 12px;
        line-height: 20px;
        margin-left: 4px;
        @include ellipsis(1);
      }
    }
  }
}
</style>
