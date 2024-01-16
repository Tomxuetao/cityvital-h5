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
  <div class="municip-monitor">
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
.municip-monitor {
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

  .monitor-type {
    padding: 12px 16px 0 16px;
    font-size: 14px;
    font-weight: 600;
    color: #0482ff;
    line-height: 22px;
  }

  .info-ctx {
    .ctx-item {
      position: relative;
      margin: 0 16px;
      padding: 12px 0 4px 0;

      .item-header {
        display: flex;
        height: 22px;
        line-height: 22px;
        align-items: center;
        justify-content: space-between;

        .header-text {
          display: flex;
          align-items: center;

          .text-img {
            height: 18px;
            width: 18px;
            margin-right: 4px;
            object-fit: cover;
          }

          .text-text {
            height: 22px;
            font-size: 14px;
            font-weight: 600;
            color: #333333;
            line-height: 22px;
          }
        }

        .header-status {
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          font-family: YouSheBiaoTiHei;
        }

        .status-0 {
          color: #ff4c63;
        }

        .status-1 {
          color: #00c1a2;
        }
      }

      .item-inner {
        position: relative;

        .inner-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 36px;
          padding: 0 2px;
          line-height: 36px;

          .header-text {
            height: 22px;
            font-size: 14px;
            font-weight: 600;
            color: #333333;
            line-height: 22px;
          }

          .header-num {
            display: flex;
            align-items: center;

            .num-text {
              height: 22px;
              font-size: 14px;
              font-weight: 600;
              color: #333333;
              line-height: 22px;
              margin-right: 8px;
            }

            .num-img {
              width: 14px;
              height: 14px;
              object-fit: cover;
              transform: rotate(90deg);
            }

            .img-active {
              transform: rotate(270deg);
            }
          }
        }

        .inner-ctx {
          padding-bottom: 12px;

          .value-wrap {
            display: grid;
            grid-gap: 4px 0;
            grid-template-rows: repeat(3, 20px);

            .value-item {
              height: 20px;
              line-height: 20px;
              color: #666666;
              font-size: 12px;
              padding-right: 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          }

          .chart-wrap {
            .chart-title {
              height: 22px;
              line-height: 22px;
              margin-top: 8px;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .title-text {
                font-size: 12px;
                font-weight: 600;
                color: #333333;
              }

              .title-tabs {
                display: grid;
                align-items: center;
                grid-template-columns: repeat(3, 1fr);

                .tab-item {
                  width: 48px;
                  height: 22px;
                  color: #666666;
                  font-size: 12px;
                  line-height: 22px;
                  text-align: center;
                  border: 0.5px solid #d9d9d9;
                  background-color: #ffffff;

                  &:nth-child(2) {
                    border-left: 0;
                    border-right: 0;
                  }

                  &:nth-child(1) {
                    border-radius: 4px 0 0 4px;
                  }

                  &:nth-child(3) {
                    border-radius: 0 4px 4px 0;
                  }
                }

                .tab-active {
                  color: #ffffff;
                  background-color: #0482ff;
                  border: 0.5px solid transparent;
                }
              }
            }

            .chart-inner {
              height: 228px;
            }
          }
        }

        &:after {
          position: absolute;
          content: "";
          left: 0;
          bottom: 0;
          width: 100%;
          border-bottom: 0.5px dashed #eeeeee;
        }

        &:nth-last-child(1) {
          &:after {
            border-bottom: 0;
          }
        }
      }

      &:after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.5px;
        background-color: #eeeeee;
      }

      &:nth-last-child(1) {
        &:after {
          height: 0;
        }
      }
    }
  }
}
</style>
