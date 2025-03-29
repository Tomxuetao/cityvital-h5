<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    default: () => {}
  }
})

const alarmLevelMap = new Map([
  ['1', '一级报警'],
  ['2', '二级报警'],
  ['3', '三级报警']
])
</script>

<template>
  <div
    class="card-wrap"
    @click="
      $router.push({ name: 'alarm-detail', query: { eventId: item.event_id } })
    "
  >
    <common-title :text="item.factory_name">
      <div :class="['alarm-level', 'level-' + item.alarm_level]">
        {{ alarmLevelMap.get(item.alarm_level) }}
      </div>
    </common-title>
    <div class="card-inner">
      <div class="inner-item">
        <div class="item-label">报警时间：</div>
        <div class="item-text">{{ item.check_time }}</div>
      </div>
      <div class="inner-item">
        <div class="item-label">处置状态：</div>
        <div class="item-text">{{ item.alarm_status }}</div>
      </div>
      <div class="inner-item">
        <div class="item-label">报警描述：</div>
        <div class="item-text">{{ item.alarm_desc }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-wrap {
  border-radius: 12px;
  background-color: #ffffff;

  .alarm-level {
    height: 24px;
    width: 64px;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
    line-height: 24px;
    border-radius: 4px;
  }

  .level-1 {
    background-color: #ff5167;
  }

  .level-2 {
    background-color: #ff6837;
  }

  .level-3 {
    background-color: #ffb251;
  }

  .card-inner {
    display: grid;
    grid-gap: 8px 0;
    padding: 0 16px 16px 16px;

    .inner-item {
      display: flex;
      align-items: center;

      .item-label {
        height: 22px;
        font-size: 14px;
        color: #666666;
        line-height: 22px;
        white-space: nowrap;
      }

      .item-text {
        height: 22px;
        font-size: 14px;
        color: #666666;
        line-height: 22px;
        @include ellipsis(1);
      }
    }
  }
}
</style>
