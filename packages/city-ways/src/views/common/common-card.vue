<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>

<template>
  <div class="card-inner">
    <div class="item-title">
      <span>{{ data.name }}</span>
    </div>
    <div class="item-desc">
      {{ data.intro }}
    </div>
    <van-swipe v-if="data.imgList?.length" class="inner-swipe" :autoplay="5000">
      <van-swipe-item class="swiper-item" v-for="(item, index) in data.imgList" :key="index">
        <van-image class="item-img" :src="item.src"></van-image>
      </van-swipe-item>
    </van-swipe>
    <div v-else class="inner-swipe">
      <div class="swiper-item">
        <van-image class="item-img"></van-image>
      </div>
    </div>
    <div class="item-tags">
      <div class="tag-author">
        <span>{{ data.area }}</span>
      </div>
      <div class="tag-type">
        <span>{{ data.type }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-inner {
  display: grid;
  padding: 14px 0;
  grid-gap: 8px 0;

  .item-title {
    position: relative;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    @include ellipsis(1);

    span {
      padding-left: 8px;
    }

    &:before {
      position: absolute;
      content: '';
      height: 13px;
      width: 3px;
      top: 50%;
      transform: translate(0, -50%);
      background-image: linear-gradient(180deg, rgba(30, 78, 211, 1), rgba(64, 134, 235, 1));
    }
  }

  .inner-swipe {
    height: 170px;
    border-radius: 8px;

    .swiper-item {
      height: 170px;
      border-radius: 8px;

      .item-img {
        width: 100%;
        height: 170px;
        border-radius: 8px;

        :deep(.van-image__img) {
          object-fit: cover;
          border-radius: 8px;
        }

        :deep(.van-image__loading) {
          object-fit: cover;
          border-radius: 8px;
        }
      }
    }
  }

  .item-desc {
    line-height: 22px;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    @include ellipsis(2);
  }

  .item-tags {
    display: grid;
    height: 22px;
    line-height: 22px;
    margin-top: 8px;
    grid-gap: 0 8px;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto max-content;

    .tag-author {
      color: #708cb2;
      font-size: 12px;
      margin-right: 8px;
      max-width: 240px;
      border-radius: 4px;
      text-align: center;
      background-color: #f4f7fb;
      @include ellipsis(1);

      span {
        padding: 0 8px;
      }
    }

    .tag-type {
      font-size: 12px;
      text-align: center;
      border-radius: 4px;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(111, 151, 255, 1);

      span {
        padding: 0 8px;
      }
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(235, 235, 235, 1);
  }
}
</style>
