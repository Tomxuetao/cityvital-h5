<script setup>
import { alarmLevelMap } from '@/config'

const props = defineProps({
  itemData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="handle-card">
    <div class="card-title">{{ itemData.factory_name }}</div>
    <div class="card-inner">
      <div class="inner-item">
        <div class="item-label">最新报警时间：</div>
        <div class="item-text">{{ itemData.time }}</div>
      </div>
      <div class="inner-item">
        <div class="item-label">报警等级：</div>
        <div :class="['item-text', 'level-' + itemData.alarm_level]">
          {{ alarmLevelMap.get(+itemData.alarm_level) }}
        </div>
      </div>
      <div class="inner-item">
        <div class="item-label">报警描述：</div>
        <div class="item-text">{{ itemData.alarm_desc }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.handle-card {
  position: relative;
  padding: 12px 0;

  .card-title {
    height: 22px;
    font-size: 14px;
    color: #0482ff;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 8px;
    @include ellipsis(1);
  }

  .card-inner {
    display: grid;
    grid-gap: 8px 0;
    grid-template-rows: repeat(3, 1fr);

    .inner-item {
      display: flex;
      align-items: center;
      height: 22px;
      font-size: 14px;
      color: #666666;
      line-height: 22px;

      .item-label {
        white-space: nowrap;
      }

      .item-text {
        @include ellipsis(1);
      }

      .level-1 {
        color: #ff3741;
      }

      .level-2 {
        color: #ff7400;
      }

      .level-3 {
        color: #fdad43;
      }
    }
  }

  &:after {
    position: absolute;
    content: "";
    height: 0.5px;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #eeeeee;
  }
}
</style>
