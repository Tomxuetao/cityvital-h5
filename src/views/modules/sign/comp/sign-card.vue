<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: () => []
  }
})

const showDeduct = new Set(props.list.map(item => item.num)).size > 1
</script>

<template>
  <div class="list-wrap">
    <div class="list-item" v-for="(item, index) in list" :key="index">
      <div class="item-title">{{ item.title }}</div>
      <template v-if="item.num">
        <div :class="['item-num', 'num-' + item.alarmLevel]">{{ `${item.num}个报警` }}</div>
        <div class="item-deduct">
          <span>扣</span>
          <span class="deduct-score">{{ item.deductScore}}</span>
          <span>分</span>
        </div>
      </template>
      <template v-else>
        <div class="item-num">无报警</div>
        <div v-if="showDeduct" class="item-deduct"></div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-wrap {
  display: grid;
  padding: 4px 0 0 0;
  grid-template-columns: repeat(3, 1fr);

  .list-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .item-title {
      height: 20px;
      color: #999999;
      font-size: 12px;
      line-height: 20px;
      margin-bottom: 2px;
    }

    .item-num {
      height: 22px;
      color: #555555;
      font-size: 14px;
      line-height: 22px;
    }

    .num-1 {
      color: #FF5167;
    }

    .num-2 {
      color: #FF6837;
    }

    .num-3 {
      color: #FFB251;
    }

    .item-deduct {
      height: 20px;
      color: #666666;
      font-size: 12px;
      line-height: 20px;

      .deduct-score {
        color: #FF5167;
      }
    }
  }
}
</style>
