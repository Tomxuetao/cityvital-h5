<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  originType: {
    type: String,
    required: true
  },
  secondType: {
    type: String,
    required: true
  }
})

const alarmLevelMap = new Map([
  [1, '一级报警'],
  [2, '二级报警'],
  [3, '三级报警']
])
</script>

<template>
  <div class="river-card">
    <div class="card-ctx">
      <div
        class="card-title"
        @click="
          $router.push({
            name: 'city-detail',
            query: {
              id: data.extraMap?.factoryId,
              name: data.extraMap?.factoryName,
              originType: originType,
              secondType: secondType,
            },
          })
        "
      >
        {{ data.extraMap?.factoryName }}
      </div>
      <div class="ctx-wrap">
        <div class="desc-item">
          <div class="item-label">报警等级：</div>
          <div class="item-text">
            {{ alarmLevelMap.get(data.extraMap?.latestAlarmLevel) }}
          </div>
        </div>
        <div class="desc-item">
          <div class="item-label">报警指标：</div>
          <div class="item-text">{{ data.extraMap?.alarmType }}</div>
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
</template>

<style scoped lang="scss">
.river-card {
  position: relative;
  display: grid;
  grid-gap: 0 16px;
  padding: 12px 0;
  align-items: center;
  grid-template-columns: 1fr 14px;
  justify-content: space-between;

  &:after {
    position: absolute;
    content: "";
    height: 0.5px;
    width: 100%;
    bottom: 0;
    background-color: #eeeeee;
  }

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

  .card-img {
    width: 14px;
    height: 14px;
    object-fit: cover;
  }
}
</style>
