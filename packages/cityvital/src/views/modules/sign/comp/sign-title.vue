<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    default: () => {
    }
  }
})
</script>

<template>
  <div class="title-wrap">
    <img class="title-icon" :src="item.icon" alt="">
    <div class="title-text">{{ item.title }}</div>
    <div class="title-line"></div>
    <div class="title-score">{{ `${item.score}分` }}</div>
  </div>
</template>

<style scoped lang="scss">
.title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title-icon {
    width: 22px;
    height: 24px;
    object-fit: cover;
    margin-right: 2px;
  }

  .title-text {
    position: relative;
    height: 22px;
    font-size: 14px;
    color: #333333;
    line-height: 22px;

    &:after {
      position: absolute;
      content: '';
      height: 8px;
      width: 100%;
      left: 0;
      bottom: 4px;
      background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.00), rgba(4, 130, 255, 0.30));
    }
  }

  .title-line {
    flex: 1;
    height: 1px;
    padding: 0 4px;
    border: 0.5px dashed #e5e5e5;
  }

  .title-score {
    height: 22px;
    font-size: 14px;
    color: #0482ff;
    line-height: 22px;
  }
}
</style>
