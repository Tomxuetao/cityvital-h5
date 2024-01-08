<script setup>
const props = defineProps({
  secondIndex: {
    type: Number,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="metro-card">
    <div v-if="secondIndex === 0" class="reserve-card">
      <div class="card-title">{{ data.alarm_type }}</div>
      <div class="card-tags">
        <div class="tag-item item-1">{{ data.alarm_status }}</div>
        <div class="tag-item item-2">{{ data.factory_name }}</div>
        <div class="tag-item item-3">{{ data.district_name }}</div>
        <div class="tag-item item-4">{{ data.item_name }}</div>
      </div>
      <div class="card-ctx">
        <div class="ctx-item">
          <div class="item-label">报警设备：</div>
          <div class="item-text">{{ data.item_name }}</div>
        </div>
        <div class="ctx-item">
          <div class="item-label">报警时间：</div>
          <div class="item-text">{{ data.create_time }}</div>
        </div>
      </div>
    </div>
    <div v-if="secondIndex === 1" class="item-card">
      <div class="card-ctx">
        <div
          class="card-title"
          @click="$router.push({ name: 'item-detail', query: { id: data.factory_id, name: data.factory_name } })"
        >
          {{ data.factory_name }}
        </div>
        <div class="ctx-wrap">
          <div class="desc-item">
            <div class="item-label">报警等级：</div>
            <div class="item-text">
              {{ data.status }}
            </div>
          </div>
          <div class="desc-item">
            <div class="item-label">处置状态：</div>
            <div class="item-text">{{ data.dbjcfaStatus }}</div>
          </div>
        </div>
      </div>
      <img
        class="card-img"
        src="@/views/modules/vital-signs/img/icon-arrow.webp"
        alt=""
        @click="
        $router.push({ name: 'alarm-detail', query: { eventId: data.eventId } })
      "
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.metro-card {
  .reserve-card {
    position: relative;
    padding: 12px 0 6px 0;

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
        }

        .item-text {
          color: #333333;
        }
      }
    }

    &:after {
      position: absolute;
      content: "";
      height: 0.5px;
      width: 100%;
      bottom: 0;
      background-color: #eeeeee;
    }
  }

  .item-card {
    position: relative;
    display: grid;
    grid-gap: 0 16px;
    padding: 12px 0;
    align-items: center;
    grid-template-columns: 1fr 14px;
    justify-content: space-between;

    .card-ctx {
      width: 282px;

      .card-title {
        height: 24px;
        font-size: 16px;
        color: #333333;
        line-height: 24px;
        margin-bottom: 4px;
        @include ellipsis(1);
      }

      .ctx-wrap {
        display: flex;
        align-items: center;

        .desc-item {
          display: flex;
          align-items: center;

          .item-label {
            width: 70px;
            height: 22px;
            font-size: 14px;
            color: #666666;
            line-height: 22px;
          }

          .item-text {
            width: 72px;
            height: 22px;
            font-size: 14px;
            color: #333333;
            line-height: 22px;
            @include ellipsis(1);
          }
        }
      }
    }

    &:after {
      position: absolute;
      content: "";
      height: 0.5px;
      width: 100%;
      bottom: 0;
      background-color: #eeeeee;
    }

    .card-img {
      width: 14px;
      height: 14px;
      object-fit: cover;
    }
  }
}
</style>
