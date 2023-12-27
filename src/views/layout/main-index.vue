<template>
  <div class="site-wrapper">
    <main-header></main-header>
    <div class="route-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import MainHeader from '@/views/layout/main-header.vue'
</script>
<style scoped lang="scss">
.site-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;

  .route-wrap {
    padding-bottom: 16px;
    background-color: #f0f2f5;
    min-height: calc(100vh - 139px);
  }

  &:before {
    position: absolute;
    content: "";
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 0.5px;
    background-color: #f0f2f5;
  }

  :deep(.van-loading) {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
