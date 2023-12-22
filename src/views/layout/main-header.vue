<script setup>
import CommonTab from '@/views/common/common-tab.vue'
</script>

<template>
  <van-sticky  v-if="['home', 'vital-signs', 'synergy', 'service', 'manage'].includes($route.name)">
    <div class="header-wrap">
      <div class="header-img"></div>
      <common-tab></common-tab>
    </div>
  </van-sticky>
</template>

<style scoped lang="scss">
.header-wrap {
  .header-img {
    height: 85px;
    width: 375px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("@/views/modules/home/img/img-home-bg.webp");

    .header-tab {
      margin-top: -2px;
    }
  }
}
</style>
