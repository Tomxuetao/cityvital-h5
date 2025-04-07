<script setup>
import { useCommonStore } from '@/store'
import { commonApi } from '@/api/common-api'
import { areaIndexMap, getImgUrlFn } from '@/utils'
import CommonMarker from '@/views/common/common-marker.vue'

const getImg = getImgUrlFn('../assets/img')

const route = useRoute()
const commonState = useCommonStore()

const dataList = ref([])
const getDataList = async () => {
  const tempList = await commonState.initDataAction() || []

  dataList.value = tempList.filter(item => item.area === areaIndexMap.get(+route.params.index)) || []
}

getDataList()

const saveUpdateStyle = async () => {
  const elements = document.querySelectorAll('[data-id]')

  console.log(elements)

  const tempList = [...elements].map(item => {
    const style = item.style
    return {
      y: style.top,
      x: style.left,
      id: item.getAttribute('data-id')
    }
  })
  await commonApi('/city/site/updateStyle', tempList, { method: 'post' })
  showSuccessToast('修改成功')
}
</script>

<template>
  <div class="drag-marker" :style="{backgroundImage: `url(${getImg(`img-${route.params.index}`)})`}">
    <div class="marker-wrap">
      <common-marker
        v-for="(item, index) in dataList"
        :data="item"
        :key="index"
        :draggable="true"
        :data-id="item.id"
      >
      </common-marker>
    </div>
    <div class="save-btn" @click="saveUpdateStyle()">保存更改</div>
  </div>
</template>

<style scoped lang="scss">
.drag-marker {
  width: 375px;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  .marker-wrap {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .save-btn {
    position: absolute;
    left: 50%;
    width: 240px;
    bottom: 32px;
    padding: 12px;
    color: #ffffff;
    cursor: pointer;
    font-size: 18px;
    border-radius: 8px;
    text-align: center;
    transform: translateX(-50%);
    background-color: rgba(6, 115, 255, 1);
  }
}
</style>
