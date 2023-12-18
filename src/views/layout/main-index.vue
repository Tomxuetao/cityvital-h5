<template>
  <div class="site-wrapper">
    <router-view/>
  </div>
</template>

<script setup>
</script>
<style scoped lang="scss">
.site-wrapper {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 16px;
  background-color: #f0f2f5;

  &:before {
    position: absolute;
    content: '';
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
