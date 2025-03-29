<script setup>
defineProps({
  tabConfigList: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <van-tabs v-bind="$attrs">
    <van-tab
      v-for="(item, index) in tabConfigList"
      :key="index"
      :name="index"
      :title="item.title"
    />
  </van-tabs>
</template>

<style scoped lang="scss">
</style>
