<script setup>
import CommonList from '@/views/common/common-list.vue'
import CommonTitle from '@/views/common/common-title.vue'
import ExamineCard from '@/views/modules/manage/comp/examine-card.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  index: {
    type: String,
    required: true
  }
})

const commonListConfig = {
  code: '21b636eb69',
  isIndexServer: true,
  customForm: {
    sjbt: props.name,
    dim: props.index === '0' ? 'day' : undefined,
    week_num: props.index === '0' ? undefined : 2,
    month_num: props.index === '0' ? undefined : 1,
    year_num: props.index === '0' ? undefined : 2024
  }
}

</script>

<template>
  <div class="examine-list">
    <div class="examine-inner">
      <div class="inner-title">
        <common-title text="事件列表"></common-title>
      </div>
      <div class="inner-list">
        <common-list
          :config="commonListConfig"
        >
          <template #card-item="{ data }">
            <examine-card :data="data" :index="index"></examine-card>
          </template>
        </common-list>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.examine-list {
  padding: 12px 12px 0 12px;

  .examine-inner {
    background: #ffffff;
    border-radius: 12px;
    min-height: calc(100vh - 24px);
    box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

    .inner-title {

    }

    .inner-list {
      padding: 0 16px;
      margin-top: -8px;

      :deep(.list-wrap) {
        .list-item {
          position: relative;

          &:after {
            position: absolute;
            width: 100%;
            content: "";
            height: 0.5px;
            background-color: #eeeeee;
          }
        }
      }
    }
  }
}
</style>
