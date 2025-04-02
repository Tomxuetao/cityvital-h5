<script setup>
const themeVars = {
  tabLineHeight: 1,
  dropdownMenuHeight: '36px',
  tabsBottomBarWidth: '20px',
  popupCloseIconSize: '18px',
  actionSheetMaxHeight: '60%',
  popupCloseIconMargin: '12px',
  tabsBottomBarColor: '#0482FF',
  fieldInputDisabledTextColor: '#333333',
  swipeIndicatorInactiveBackground: 'rgba(6, 115, 255, 0.5)'
}
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view/>
  </van-config-provider>
</template>
