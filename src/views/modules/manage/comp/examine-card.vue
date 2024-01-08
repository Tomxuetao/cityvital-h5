<script setup>
const props = defineProps({
  index: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="examine-card">
    <div class="card-inner">
      <img class="inner-img" :src="data.file_url.replace(/^https?\:\/\/[\w\-\.]+(\:\d+)?\//i, '/')" alt=""/>
      <div class="inner-ctx">
        <div class="ctx-item">
          <div class="item-label">地区：</div>
          <div class="item-text">{{ data.sfqx }}</div>
        </div>
        <div class="ctx-item">
          <div class="item-label">识别时间：</div>
          <div class="item-text">{{ data.gjsj }}</div>
        </div>
        <div class="ctx-item">
          <div class="item-label">事发地点：</div>
          <div class="item-text">{{ data.dwmc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.examine-card {
  padding: 12px 0;

  .card-inner {
    display: grid;
    grid-gap: 0 8px;
    grid-template-columns: 78px 1fr;

    .inner-img {
      width: 78px;
      height: 78px;
      object-fit: cover;
      border-radius: 4px;
    }

    .inner-ctx {
      display: grid;
      grid-gap: 4px 0;

      .ctx-item {
        display: flex;
        align-items: flex-start;

        .item-label {
          height: 22px;
          color: #666666;
          font-size: 14px;
          line-height: 22px;
          white-space: nowrap;
        }

        .item-text {
          color: #666666;
          font-size: 14px;
          line-height: 22px;
          @include ellipsis(2);
        }
      }
    }
  }
}
</style>
