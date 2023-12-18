<script setup>
const themeVars = {
  dropdownMenuHeight: '36px',
  tabsBottomBarWidth: '20px',
  tabsBottomBarColor: '#0482FF',
  actionSheetMaxHeight: '60%',
  fieldInputDisabledTextColor: '#333333'
}
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view />
  </van-config-provider>
</template>
