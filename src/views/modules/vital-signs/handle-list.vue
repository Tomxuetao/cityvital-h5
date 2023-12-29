<script setup>
import CommonList from '@/views/common/common-list.vue'
import CommonTitle from '@/views/common/common-title.vue'
import HandleCard from '@/views/modules/vital-signs/comp/handle-card.vue'

const props = defineProps({
  eventId: {
    type: String,
    required: true
  }
})

const listConfig = {
  code: '22686c6b78',
  isIndexServer: true,
  customForm: {
    event_id: props.eventId
  }
}
</script>

<template>
  <div class="handle-list">
    <div class="list-inner">
      <div class="">
        <common-title text="报警处置"></common-title>
      </div>

      <div class="inner-ctx">
        <common-list :config="listConfig">
          <template #card-item="{ data }">
            <handle-card :item-data="data"></handle-card>
          </template>
        </common-list>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.handle-list {
  padding: 12px;

  .list-inner {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);

    .inner-ctx {
      padding: 0 16px;
    }
  }
}
</style>
