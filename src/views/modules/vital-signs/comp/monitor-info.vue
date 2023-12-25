<script setup>
import CommonTitle from '@/views/common/common-title.vue'

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="monitor-info">
    <div class="info-header">
      <common-title text="监测信息"></common-title>
      <div class="header-inner">
        <div class="inner-item">
          <div class="item-label">监测时间：</div>
          <div class="item-text">{{ detail.create_time }}</div>
        </div>
        <div class="inner-item">
          <div class="item-label">更新频率：</div>
          <div class="item-text">{{ detail.period }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.monitor-info {
  .info-header {
    border-bottom: 0.5px solid #eeeeee;

    .header-inner {
      padding: 0 16px;

      .inner-item {
        display: flex;
        height: 22px;
        align-items: center;
        line-height: 22px;
        color: #666666;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
