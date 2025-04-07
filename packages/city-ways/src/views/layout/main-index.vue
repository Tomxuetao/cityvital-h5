<template>
  <div class="site-wrap">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.site-wrap {
  height: 100vh;
  width: 375px;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("@/assets/img/img-bg.webp");
}
</style>
