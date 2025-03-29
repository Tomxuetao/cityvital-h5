<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="item-wrap">
    <div class="item-text">{{ data.NUM }}</div>
    <div class="item-title">
      {{ (data.DEFINE || "").replace("设备数", "") }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-wrap {
  min-width: 72px;
  padding: 2px 12px;
  border-radius: 6px;
  background: #f5f7fa;

  .item-text {
    height: 24px;
    font-size: 18px;
    color: #333333;
    line-height: 24px;
    font-weight: Bold;
    text-align: center;
    font-family: Alternate-Bold;
  }

  .item-title {
    height: 18px;
    font-size: 12px;
    text-align: center;
    color: #666666;
    line-height: 18px;
    white-space: nowrap;
  }
}
</style>
