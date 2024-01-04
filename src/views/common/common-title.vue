<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="title-wrap">
    <div :class="['title-inner', icon ? 'has-icon' : '']">
      <div class="inner-left">
        <img v-if="icon" class="left-icon" :src="icon" alt=""/>
        <div class="left-text">{{ text }}</div>
      </div>
      <div class="inner-right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title-wrap {
  padding-top: 2px;

  .title-inner {
    height: 44px;
    width: 347px;
    line-height: 44px;
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-gap: 0 12px;
    padding: 0 14px;
    margin: 0 2px 0 2px;
    border-radius: 10px 10px 0 0;
    justify-content: space-between;
    grid-template-columns: max-content/max-content;
    background-image: linear-gradient(359deg, rgba(241, 250, 255, 0.00) 0%, #f1faff);

    .inner-left {
      height: 44px;
      line-height: 44px;
      display: flex;
      align-items: center;

      .left-icon {
        height: 24px;
        width: 25px;
        object-fit: cover;
      }

      .left-text {
        font-size: 18px;
        color: #333333;
        line-height: 24px;
        @include ellipsis(1);
      }
    }

    .inner-right {
      height: 44px;
      line-height: 44px;
      display: flex;
      align-items: center;
    }
  }

  .has-icon {
    padding: 0 10px;
  }
}
</style>
