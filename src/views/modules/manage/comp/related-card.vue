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
  <div class="related-card">
    <div class="card-inner">
      <template v-if="index === '1'">
        <div class="inner-header">
          <div class="header-text">{{ `编号${data.id}` }}</div>
          <img class="header-btn" src="@/views/common/img/icon-arrow.webp" alt=""/>
        </div>
        <div class="inner-ctx">
          <div class="ctx-item">
            <div class="item-label">车辆牌照：</div>
            <div class="item-text">{{ data.license_plate }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">车辆行为：</div>
            <div class="item-text">{{ data.content }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">研判来源：</div>
            <div class="item-text">{{ data.analyze_title }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">上报时间：</div>
            <div class="item-text">{{ data.time }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">事发地址：</div>
            <div class="item-text">{{ data.addr }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.related-card {
  position: relative;

  .card-inner {
    padding: 12px 0;

    .inner-header {
      height: 24px;
      display: flex;
      line-height: 24px;
      margin-bottom: 8px;
      align-items: center;
      justify-content: space-between;

      .header-text {
        color: #333333;
        font-size: 16px;
      }

      .header-btn {
        width: 14px;
        height: 14px;
        object-fit: cover;
      }
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

  &:after {
    position: absolute;
    width: 100%;
    content: "";
    height: 0.5px;
    background-color: #eeeeee;
  }
}
</style>
