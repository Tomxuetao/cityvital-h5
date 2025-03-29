<script setup>
import { TOKEN_KEY } from '@/utils'
import envConfig from '@/config/env-config'

const token = sessionStorage.getItem(TOKEN_KEY)
</script>

<template>
  <iframe class="frame-wrap" :src="`${envConfig.outLinkMap.get('regular-command')}${token}`"></iframe>
</template>

<style scoped lang="scss">
.frame-wrap {
  border: 0;
  width: 100vw;
  height: 100vh;
}
</style>
