<script setup>
import { commonGatewayApi } from '@/api/common-api'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const dataList = ref([])
const getDataList = () => {
  commonGatewayApi('21b64ff5cc', { projectCode: props.id, projectName: props.name })
    .then((list) => {
      if (Array.isArray(list)) {
        const [data] = list
        const {
          apdw,
          apdwPerson,
          apdwPhone,
          dbjcdw,
          dbjcdwPerson,
          dbjcdwPhone,
          jldw,
          jldwPerson,
          jldwPhone,
          jsdw,
          jsdwPerson,
          jsdwPhone,
          sgdw,
          sgdwPerson,
          sgdwPhone
        } = data || {}
        dataList.value = [
          { name: jsdw, person: jsdwPerson, phone: jsdwPhone, type: '建设单位' },
          { name: sgdw, person: sgdwPerson, phone: sgdwPhone, type: '施工单位' },
          { name: apdw, person: apdwPerson, phone: apdwPhone, type: '安评单位' },
          { name: jldw, person: jldwPerson, phone: jldwPhone, type: '监理单位' },
          { name: dbjcdw, person: dbjcdwPerson, phone: dbjcdwPhone, type: '地址监测单位' }
        ]
      }
    })
}

getDataList()
</script>

<template>
  <div class="relative-unit">
    <common-title text="相关单位"></common-title>
    <div class="list-wrap">
      <div class="item-wrap" v-for="(item, index) in dataList" :key="index">
        <div class="item-inner">
          <div class="item-header">
            <div class="header-title">{{ item.name }}</div>
            <div class="header-unit">{{ item.type }}</div>
          </div>
          <div class="item-ctx">
            <div class="ctx-inner">
              <div class="inner-label">联系人：</div>
              <div class="inner-text">{{ item.person }}</div>
            </div>
            <div class="ctx-inner">
              <div class="inner-label">联系电话：</div>
              <div class="inner-text">{{ item.phone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.relative-unit {
  .list-wrap {
    padding: 0 16px;

    .item-wrap {
      position: relative;
      padding: 12px 0 6px 0;

      .item-header {
        height: 24px;
        display: flex;
        line-height: 24px;
        margin-bottom: 4px;
        align-items: center;
        justify-content: space-between;

        .header-title {
          width: 220px;
          height: 24px;
          font-size: 14px;
          font-weight: bold;
          color: #333333;
          line-height: 24px;
          @include ellipsis(1);
        }

        .header-unit {
          font-size: 12px;
          color: #333333;
          padding: 3px 8px;
          line-height: 18px;
          border-radius: 4px;
          white-space: nowrap;
          background-color: rgba(4, 130, 255, 0.08);
        }
      }

      .item-ctx {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        .ctx-inner {
          height: 22px;
          display: flex;
          line-height: 22px;
          align-items: center;

          .inner-label {
            font-size: 14px;
            color: #666666;
          }

          .inner-text {
            font-size: 14px;
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
  }
}
</style>
