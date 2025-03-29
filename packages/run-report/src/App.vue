<script setup>
const themeVars = {
  searchPadding: 0,
  searchInputHeight: '36px',
  dropdownMenuHeight: '36px',
  tabsBottomBarWidth: '20px',
  actionSheetMaxHeight: '60%',
  tabsBottomBarColor: '#0482FF',
  searchContentBackground: '#F5F7FA'
}
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view />
  </van-config-provider>
</template>
