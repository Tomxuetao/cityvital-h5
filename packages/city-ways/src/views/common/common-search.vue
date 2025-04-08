<script setup>
const emit = defineEmits(['search'])

const searchForm = reactive({
  name: undefined,
  type: undefined,
  area: undefined
})

const clearSearch = () => {
  searchForm.name = undefined
  emit('search', { ...searchForm })
}

const executeSearch = () => {
  emit('search', { ...searchForm })
}
</script>

<template>
  <div class="common-search">
    <form action class="search-form" style="width: 100%">
      <van-search
        v-model="searchForm.name"
        background="transparent"
        placeholder="请输入点位名称"
        @clear="clearSearch()"
        @search="executeSearch()"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
.common-search {
  width: 375px;
}
</style>
