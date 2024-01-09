<script setup>
import { manageEventStatusMap as eventStatusMap } from '@/config'

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
  <div class="analysis-card">
    <div class="card-inner">
      <div class="inner-title">{{ data.class_value_2 || data.analyze_title }}</div>
      <div class="inner-tags">
        <div class="tag-item item-1" v-if="data.data_source || data.analyze_title">
          {{ data.data_source || data.analyze_title }}
        </div>
        <div class="tag-item item-2" v-if="data.top">变</div>
        <div class="tag-item item-3">{{ eventStatusMap.get(data.event_status) }}</div>
      </div>
      <div class="inner-ctx">
        <div class="ctx-item">
          <div class="item-label">研判时间：</div>
          <div class="item-text">{{ data.gmt_create }}</div>
        </div>
        <template v-if="index === '0'">
          <div class="ctx-item">
            <div class="item-label">{{ data.class_key_1 }}：</div>
            <div class="item-text">{{ data.class_value_1 }}</div>
          </div>
        </template>
        <template v-if="index === '1'">
          <div class="ctx-item">
            <div class="item-label">出土次数：</div>
            <div class="item-text">{{ data.rec_count }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">出土工地：</div>
            <div class="item-text">{{ data.addr }}</div>
          </div>
        </template>
        <template v-if="index === '2'">

        </template>
      </div>
    </div>
    <img
      class="card-img"
      src="@/views/common/img/icon-arrow.webp"
      @click="$router.push({ name: 'analysis-detail', query: { id: data.analyze_event_id || data.id, index: index } })"
      alt=""
    />
  </div>
</template>

<style scoped lang="scss">
.analysis-card {
  display: grid;
  grid-gap: 0 12px;
  align-items: center;
  padding: 12px 0 8px 0;
  grid-template-columns: 1fr 14px;

  .card-inner {
    .inner-title {
      height: 24px;
      font-size: 16px;
      color: #333333;
      line-height: 24px;
    }

    .inner-tags {
      display: grid;
      padding: 8px 0;
      grid-gap: 0 8px;
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

      .item-2 {
        background-color: rgba(4, 130, 255, 0.08);
      }

      .item-3 {
        background-color: rgba(255, 81, 103, 0.08);
      }
    }

    .inner-ctx {
      display: grid;
      grid-gap: 4px 0;

      .ctx-item {
        height: 22px;
        display: flex;
        line-height: 22px;
        align-items: center;

        .item-label {
          font-size: 14px;
          color: #666666;
          white-space: nowrap;
        }

        .item-text {
          font-size: 14px;
          color: #333333;
          @include ellipsis(1);
        }
      }
    }
  }

  .card-img {
    width: 14px;
    height: 14px;
    object-fit: cover;
    transform: rotate(270deg);
  }
}
</style>
