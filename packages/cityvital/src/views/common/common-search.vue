<script setup>
defineProps({
  showInput: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <form class="common-input" action>
    <van-search
      v-bind="$attrs"
      :class="showInput ? 'input-show' : 'input-hide'"
    >
      <template #left-icon>
        <slot name="custom-select"></slot>
      </template>
      <template #right-icon>
        <img
          class="search-img"
          src="@/views/common/img/icon-search.webp"
          alt=""
        />
      </template>
    </van-search>
  </form>
</template>

<style scoped lang="scss">
.common-input {
  :deep(.van-search) {
    padding: 0;
    border-radius: 6px;
    background: #f5f7fa;

    .van-search__content {
      background: #f5f7fa;
      border-radius: 6px;
      padding-left: 14px;

      .van-field__left-icon {
        padding-left: 0;

        .trigger-wrap {
          display: flex;
          align-items: center;
          height: var(--van-search-input-height);
          line-height: var(--van-search-input-height);

          .trigger-text {
            color: #333333;
            font-size: 12px;
            line-height: 18px;
          }

          .trigger-img {
            width: 12px;
            height: 12px;
            object-fit: cover;
            margin: 0 6px;
          }
        }
      }

      .van-field__right-icon {
        .search-img {
          width: 16px;
          height: 16px;
          object-fit: cover;
        }
      }
    }
  }

  .input-hide {
    :deep(.van-search__content) {
      input {
        visibility: hidden;
      }
    }
  }
}
</style>
