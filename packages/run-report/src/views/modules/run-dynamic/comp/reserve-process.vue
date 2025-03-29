<script setup>
import EmptyPage from '@/views/common/empty-page.vue'

defineProps({
  list: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="reserve-process">
    <div v-if="list.length" class="card-steps">
      <div class="step-item" v-for="(item, index) in list" :key="index">
        <div class="item-round">
          <div class="round-inner"></div>
        </div>
        <div class="ctx-wrap">
          <div class="ctx-title">{{ item.dealRecordVOList_status }}</div>
          <div class="desc-wrap">
            <div class="desc-item">
              <div class="item-label">处理人：</div>
              <div class="item-text">{{ item.dealRecordVOList_currentOperatePersonName }}</div>
            </div>
            <div class="desc-item">
              <div class="item-label">手机号：</div>
              <div class="item-text">{{ item.dealRecordVOList_phoneNum }}</div>
            </div>
            <div class="desc-item">
              <div class="item-label">下个处理人：</div>
              <div class="item-text">{{ item.dealRecordVOList_nextDealPersonName }}</div>
            </div>
            <div class="desc-item">
              <div class="item-label">手机号：</div>
              <div class="item-text">{{ item.dealRecordVOList_nextDealPersonPhoneNum }}</div>
            </div>
            <div class="desc-item item-special">
              <div class="item-label">处理时间：</div>
              <div class="item-text">{{ item.dealRecordVOList_operateTime }}</div>
            </div>
            <div class="desc-item item-special">
              <div class="item-label">处理备注：</div>
              <div class="item-text">{{ item.dealRecordVOList_remark }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <empty-page v-else :empty-type="2" desc="暂无操作记录"></empty-page>
  </div>
</template>

<style scoped lang="scss">
.reserve-process {
  position: relative;
  min-height: 400px;

  .card-steps {
    .step-item {
      display: grid;
      grid-gap: 0 5px;
      grid-template-columns: 14px 1fr;

      .item-round {
        position: relative;

        .round-inner {
          width: 14px;
          height: 14px;

          &:after {
            position: absolute;
            content: "";
            top: 3px;
            left: 3px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(1, 193, 163, 1);
          }
        }

        .inner-active {
          display: flex;
          align-items: center;

          &:before {
            position: absolute;
            content: "";
            width: 14px;
            height: 14px;
            opacity: 0.2;
            border-radius: 50%;
            background-color: rgba(4, 130, 255, 1);
          }

          &:after {
            position: absolute;
            content: "";
            top: 3px;
            left: 50%;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            transform: translate(-50%, 0);
            background-color: rgba(4, 130, 255, 1);
          }
        }
      }

      .ctx-wrap {
        min-height: 84px;

        .ctx-title {
          height: 24px;
          color: #333333;
          margin-top: -5px;
          font-weight: 600;
          line-height: 24px;
          margin-right: 12px;
        }

        .desc-wrap {
          display: grid;
          grid-gap: 8px 12px;
          align-items: center;
          padding: 8px 0 12px 0;
          grid-template-columns: repeat(2, 1fr);

          .desc-item {
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
              font-size: 14px;
              color: #666666;
              line-height: 22px;
            }
          }

          .item-special {
            grid-column-end: 3;
            grid-column-start: 1;
          }
        }
      }

      &:not(:last-child) {
        .item-round {
          position: relative;

          &:after {
            position: absolute;
            height: calc(100% - 12px);
            content: "";
            left: 50%;
            top: 12px;
            transform: translateX(-50%);
            border: 0.5px dashed #dddddd;
          }
        }
      }
    }
  }
}
</style>
