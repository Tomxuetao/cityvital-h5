<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="metro-card">
    <div
      class="reserve-card"
      @click="$router.push({ name: 'reserve-detail', query: { line: data.factory_name, itemName: data.item_name, jobNumber: data.jobNumber}})"
    >
      <div class="card-inner">
        <div class="card-title">{{ data.alarm_type }}</div>
        <div class="card-tags">
          <div :class="['tag-item', data.alarm_status === '已办结' ? 'item-1' : 'item-alarm']">{{
              data.alarm_status
            }}
          </div>
          <div class="tag-item item-2">{{ data.factory_name }}</div>
          <div class="tag-item item-3">{{ data.district_name }}</div>
          <div class="tag-item item-4">{{ data.item_name }}</div>
        </div>
        <div class="card-ctx">
          <div class="ctx-item">
            <div class="item-label">告警设备：</div>
            <div class="item-text">{{ data.item_name }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">告警时间：</div>
            <div class="item-text">{{ data.create_time }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">告警描述：</div>
            <div class="item-text">{{ data.monitor_remark }}</div>
          </div>
        </div>
      </div>
      <img class="card-img" src="@/assets/img/icon-arrow-next.webp" alt=""/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.metro-card {
  padding: 0 16px;

  .reserve-card {
    display: grid;
    grid-gap: 0 8px;
    align-items: center;
    grid-auto-flow: column;
    position: relative;
    padding: 12px 0 6px 0;

    .card-inner {
      .card-title {
        height: 24px;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 24px;
      }

      .card-tags {
        display: grid;
        padding: 8px 0;
        grid-gap: 0 8px;
        grid-template-columns: repeat(4, max-content);

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
          background-color: #19cc96;
        }

        .item-alarm {
          color: #ffffff;
          background-color: #999999;
        }

        .item-2 {
          background-color: rgba(255, 81, 103, 0.08);
        }

        .item-3 {
          background-color: rgba(4, 130, 255, 0.08);
        }

        .item-4 {
          background-color: rgba(4, 130, 255, 0.08);
        }
      }

      .card-ctx {
        display: grid;
        grid-gap: 4px 0;
        grid-template-rows: repeat(2, 1fr);

        .ctx-item {
          height: 22px;
          display: flex;
          font-size: 14px;
          line-height: 22px;
          align-items: center;

          .item-label {
            color: #666666;
            white-space: nowrap;
          }

          .item-text {
            color: #666666;
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
}
</style>
