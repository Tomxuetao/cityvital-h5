<script setup>
import gcoord from 'gcoord'

const emit = defineEmits(['close'])

const show = defineModel({
  type: Boolean
})

defineProps({
  data: {
    type: Object,
    required: true
  }
})

const descList = [
  { label: '城区：', key: 'area' },
  { label: '街道：', key: 'street' },
  { label: '营业时间：', key: 'busHours' },
  { label: '业态类型：', key: 'type' },
  { label: '摊位个数：', key: 'num' },
  { label: '业态分布：', key: 'dist' },
  { label: '点位介绍：', key: 'intro' }
]

const showSheet = ref(false)

const navHandlerMap = new Map([
  [
    '高德地图',
    (data) => {
      const { title, center } = data
      window.location.href = `https://uri.amap.com/marker?position=${center.join(',')}&name=${title}&src=manpage&coordinate=gaode&callnative=1`
    }
  ],
  [
    '百度地图',
    (data) => {
      const { title, center } = data
      const baiduCenter = gcoord.transform(center, gcoord.GCJ02, gcoord.BD09)
      window.location.href = `https://api.map.baidu.com/marker?location=${baiduCenter[1]},${baiduCenter[0]}&title=${title}&content=${title}&output=html`
    }
  ],
  [
    '腾讯地图',
    (data) => {
      const { title, center, address } = data
      window.location.href = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${center[1]},${center[0]};title:${title};addr:${address}&referer=myapp`
    }
  ]
])

const gotoNavHandler = (action, data) => {
  showSheet.value = false
  const gotoNav = navHandlerMap.get(action.name)
  gotoNav(data)
}
</script>

<template>
  <van-popup
    v-model:show="show"
    closeable
    teleport="body"
    :overlay="true"
    position="bottom"
    close-on-popstate
    class="custom-popup"
    :lock-scroll="false"
    @click-overlay="emit('close')"
    @click-close-icon="emit('close')"
  >
    <div :class="['popup-inner', data.imgList.length > 0 ? 'popup-inner-imgs' : '']">
      <van-swipe v-if="data.imgList.length" class="inner-swipe" :autoplay="5000">
        <van-swipe-item class="swiper-item" v-for="(item, index) in data.imgList" :key="index">
          <van-image class="item-img" :src="item.src"></van-image>
        </van-swipe-item>
      </van-swipe>
      <div class="inner-ctx">
        <div class="ctx-wrap">
          <div class="ctx-title">
            <div class="title-icon"></div>
            <div class="title-text">{{ data.name }}</div>
          </div>
          <div class="desc-wrap">
            <div class="desc-inner">
              <div class="desc-item" v-for="(item, index) in descList" :key="index">
                <span class="item-label">{{ item.label }}</span>
                <span class="item-text">{{ data[item.key] }}</span>
              </div>
            </div>
          </div>
          <div class="goto-nav" @click="showSheet = true">导航前往</div>
        </div>
      </div>
    </div>
  </van-popup>

  <van-action-sheet
    cancel-text="取消"
    v-model:show="showSheet"
    @select="(action) => gotoNavHandler(action, data)"
    :actions="[...navHandlerMap.keys()].map(item => ({ name: item}))"
  >
  </van-action-sheet>
</template>

<style scoped lang="scss">
.custom-popup {
  display: grid;
  height: 566px;
  background: #ffffff;
  overflow-y: hidden;
  pointer-events: all;
  border-radius: 12px 12px 0 0;

  .popup-inner {
    width: 375px;
    display: grid;
    grid-auto-flow: row;
    pointer-events: all;

    &-imgs {
      grid-template-rows: 170px 1fr;
    }

    .inner-swipe {
      height: 170px;

      .swiper-item {
        height: 170px;

        .item-img {
          height: 170px;
          width: 375px;

          :deep(.van-image__img) {
            object-fit: cover;
          }
        }
      }
    }

    .inner-ctx {
      display: grid;
      height: 100%;
      padding: 12px 12px 24px 12px;

      .ctx-wrap {
        display: grid;
        grid-gap: 12px;
        grid-auto-flow: row;
        grid-template-rows: 28px 1fr 44px;

        .ctx-title {
          height: 28px;
          display: grid;
          grid-gap: 0 8px;
          line-height: 28px;
          position: relative;
          align-items: center;
          grid-auto-flow: column;
          grid-template-columns: max-content;

          .title-icon {
            height: 14px;
            width: 4px;
            background-image: linear-gradient(180deg, rgba(78, 162, 255, 1), rgba(46, 107, 255, 1));
          }

          .title-text {
            color: #333333;
            font-size: 18px;
            font-weight: 500;
            @include ellipsis(1);
          }
        }

        .desc-wrap {
          position: relative;
          overflow-y: auto;
          display: grid;
          grid-gap: 4px 0;
          grid-auto-flow: row;
          grid-auto-rows: max-content;
          grid-template-rows: max-content;

          .desc-inner {
            position: absolute;
            overflow-y: auto;
            height: 100%;

            .desc-item {
              font-size: 14px;
              color: #666666;
              line-height: 22px;

              .item-label {
                color: #333333;
              }
            }
          }

        }

        .goto-nav {
          font-size: 18px;
          color: #ffffff;
          cursor: pointer;
          line-height: 44px;
          border-radius: 8px;
          text-align: center;
          background-color: rgba(6, 115, 255, 1);
        }
      }
    }
  }
}
</style>

