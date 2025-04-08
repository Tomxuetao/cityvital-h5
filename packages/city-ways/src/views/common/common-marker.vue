<script setup>
import { getTypeIconSrc } from '@/utils'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {
      return {
        icon: '',
        title: ''
      }
    }
  },
  draggable: {
    type: Boolean,
    default: false
  }
})

const domRef = ref()

const dragHandle = (draggable) => {
  let offsetX, offsetY
  const viewportWidth = window.innerWidth

  // 辅助函数：px 转 vw
  const pxToVw = (px) => (px / viewportWidth) * 100 + 'vw'

  const updatePosition = (x, y) => {
    const parent = draggable.parentElement.getBoundingClientRect()
    const rect = draggable.getBoundingClientRect()

    let newX = x - offsetX
    let newY = y - offsetY

    // 限制拖拽范围
    newX = Math.max(0, Math.min(newX, parent.width - rect.width))
    newY = Math.max(0, Math.min(newY, parent.height - rect.height))

    // 设置为 vw
    draggable.style.left = pxToVw(newX)
    draggable.style.top = pxToVw(newY)
  }

  // **桌面端拖拽**
  draggable.addEventListener('mousedown', (e) => {
    e.preventDefault()
    const rect = draggable.getBoundingClientRect()
    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top

    const onMouseMove = (e) => updatePosition(e.clientX, e.clientY)
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })

  // **移动端拖拽**
  draggable.addEventListener('touchstart', (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = draggable.getBoundingClientRect()
    offsetX = touch.clientX - rect.left
    offsetY = touch.clientY - rect.top
  }, { passive: false })

  draggable.addEventListener('touchmove', (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    updatePosition(touch.clientX, touch.clientY)
  }, { passive: false })
}

onMounted(() => {
  if (props.draggable) {
    dragHandle(domRef.value)
  }
})
</script>

<template>
  <div ref="domRef" class="common-marker" :draggable="draggable" :style="{ top: data.y, left: data.x}">
    <img class="marker-img" :src="getTypeIconSrc(data.type)" alt="">
    <div class="marker-title">{{ data.name }}</div>
  </div>
</template>

<style scoped lang="scss">
.common-marker {
  position: absolute;
  display: grid;
  grid-gap: 0 4px;
  cursor: pointer;
  width: max-content;
  align-items: center;
  border-radius: 18px;
  grid-auto-flow: column;
  padding: 2px 8px 2px 2px;
  background-color: #ef691b;
  border: 1px solid #ffffff;
  grid-template-columns: max-content max-content;

  .marker-img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  .marker-title {
    color: #fff3f3;
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
  }
}
</style>
