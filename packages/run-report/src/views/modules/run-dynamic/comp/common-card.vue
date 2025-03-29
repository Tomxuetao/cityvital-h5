<script setup>
import { dealStatusMap, alarmLevelMap } from '@/config'

defineProps({
  type: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true,
    default: () => {
    }
  }
})
</script>

<template>
  <div
    class="card-wrap"
    @click="$router.push({ name: 'alarm-detail', query: { eventId: data.eventId, type: type } })"
  >
    <div class="card-inner">
      <div class="inner-title">{{ data.TITLE.replace('报警', '告警') }}</div>
      <div class="inner-tags">
        <div v-if="data.handleType" class="tag-item item-1">
          {{ dealStatusMap.get(data.handleType) }}
        </div>
        <div :class="['tag-item', 'alarm-' + data.emergencyDegree]">{{ alarmLevelMap.get(data.emergencyDegree) }}</div>
        <div class="tag-item item-3">{{ data.thirdType }}</div>
      </div>
      <div class="inner-ctx">
        <div class="ctx-item">
          <div class="item-label">事件地址：</div>
          <div class="item-text">{{ data.ADDRESS }}</div>
        </div>
        <div class="ctx-item">
          <div class="item-label">最新告警：</div>
          <div class="item-text">{{ data.latestCheckTime }}</div>
        </div>
        <div class="ctx-item">
          <div class="item-label">事件描述：</div>
          <div class="item-text">{{ data.CONTENT }}</div>
        </div>
      </div>
    </div>
    <img class="card-img" src="@/assets/img/icon-arrow-next.webp" alt=""/>
  </div>
</template>

<style scoped lang="scss">
.card-wrap {
  position: relative;
  display: grid;
  grid-gap: 0 8px;
  padding: 0 16px;
  align-items: center;
  grid-auto-flow: column;
  background-color: #ffffff;

  .card-inner {
    padding: 12px 0 8px 0;

    .inner-title {
      height: 22px;
      font-size: 16px;
      color: #333333;
      line-height: 22px;
      @include ellipsis(1);
    }

    .inner-tags {
      display: grid;
      grid-gap: 0 8px;
      padding: 8px 0 4px 0;
      grid-template-columns: repeat(3, max-content);

      .tag-item {
        padding: 0 8px;
        height: 24px;
        font-size: 12px;
        color: #333333;
        text-align: center;
        line-height: 24px;
        border-radius: 4px;
      }

      .item-1 {
        color: #ffffff;
        background-color: #0482FF;
      }

      .item-3 {
        background-color: rgba(4, 130, 255, 0.08);
      }

      .alarm-1 {
        color: #ffffff;
        background-color: #FF5167;
      }

      .alarm-2 {
        color: #ffffff;
        background-color: #FF6837;
      }

      .alarm-3 {
        color: #ffffff;
        background-color: #FFB251;
      }
    }

    .inner-ctx {
      display: grid;
      grid-gap: 8px 0;

      .ctx-item {
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
          color: #333333;
          line-height: 22px;
          @include ellipsis(1);
        }
      }
    }
  }

  .card-img {
    width: 14px;
    height: 14px;
    object-fit: cover;
  }
}
</style>
