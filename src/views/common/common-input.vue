<script setup>

const showAction = () => {
  console.log(123)
}
</script>

<template>
  <form class="common-input" action>
    <van-search v-bind="$attrs">
      <template #left-icon>
        <div class="trigger-wrap" @click.stop="showAction">
          <div class="trigger-text">报警等级</div>
          <img class="trigger-img" src="@/views/common/img/icon-arrow.webp" alt=""/>
        </div>
      </template>
      <template #right-icon>
        <img class="search-img" src="@/views/common/img/icon-search.webp" alt=""/>
      </template>
    </van-search>
  </form>
</template>

<style scoped lang="scss">
.common-input {
  :deep(.van-search) {
    padding: 0;
    border-radius: 6px;
    background: #F5F7FA;

    .van-search__content {
      background: #F5F7FA;
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
            margin-left: 6px;
            object-fit: cover;
            margin-right: 12px;
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
}
</style>
