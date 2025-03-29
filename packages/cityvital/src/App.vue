<script setup>
const themeVars = {
  searchInputHeight: '36px',
  dropdownMenuHeight: '36px',
  tabsBottomBarWidth: '20px',
  actionSheetMaxHeight: '60%',
  tabsBottomBarColor: '#0482FF',
  fieldInputDisabledTextColor: '#333333'
}
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view />
  </van-config-provider>
</template>
