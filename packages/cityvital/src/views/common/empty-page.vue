<script setup>
import imgEmpty from './img/img-empty-bg.webp'
import imgEmpty2 from './img/img-empty2-bg.webp'

defineProps({
  desc: {
    type: String,
    required: false,
    default: '暂无内容'
  },
  imgSrc: {
    type: String,
    required: false,
    default: imgEmpty
  },
  emptyType: {
    type: Number,
    required: false,
    default: 1,
    validator: (value) => {
      return [1, 2].includes(value)
    }
  }
})
</script>

<template>
  <div class="empty-page">
    <img
        class="empty-img"
        :src="emptyType === 2 ? imgEmpty2 : imgSrc"
        alt=""
    >
    <div class="empty-text">
      {{ desc }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty-page {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transform: translate(-50%, -50%);

  .empty-img {
    width: 160px;
    height: 114px;
    margin-bottom: 20px;
  }

  .empty-text {
    line-height: 22px;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: #999999;

  }
}
</style>
