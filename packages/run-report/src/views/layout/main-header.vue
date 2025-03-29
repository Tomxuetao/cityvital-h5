<script setup>
const gotoCityViatl = () => {
  location.replace('https://zf.cgw.hangzhou.gov.cn:9443/vital-h5/')
}
</script>

<template>
  <div
    v-if="['home'].includes($route.name)"
    class="header-wrap"
    @click="gotoCityViatl()"
  >
    <div class="header-img"></div>
    <div class="header-text">运行动态</div>
  </div>
</template>

<style scoped lang="scss">
.header-wrap {
  position: relative;

  .header-img {
    height: 128px;
    width: 375px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("@/assets/img/img-header-bg.webp");
  }

  .header-text {
    position: absolute;
    left: 28px;
    bottom: 56px;
    height: 28px;
    font-size: 20px;
    font-weight: 500;
    color: #0482ff;
    line-height: 28px;
  }
}
</style>
