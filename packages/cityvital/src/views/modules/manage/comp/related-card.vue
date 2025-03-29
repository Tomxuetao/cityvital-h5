<script setup>
import { ref } from 'vue'
import { showImagePreview } from 'vant'
import img404 from '../img/img-404.webp'

const props = defineProps({
  index: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const computeImgUrl = (data) => {
  if (['0', '2'].includes(props.index)) {
    let tempUrl = ''
    if (data.FILE_URL) {
      const tempUrlList = data.FILE_URL.split(',')
      tempUrl = tempUrlList[0]
    }
    return (tempUrl || img404).replace(/^https?\:\/\/[\w\-\.]+(\:\d+)?\//i, '/')
  }
}

const isExpand = ref(false)

const previewImageList = (data) => {
  if (data.FILE_URL) {
    const imgList = []
    const tempUrlList = data.FILE_URL.split(',')
    tempUrlList.forEach(item => {
      imgList.push(item.replace(/^https?\:\/\/[\w\-\.]+(\:\d+)?\//i, '/'))
    })
    showImagePreview({ images: imgList, closeable: true })
  }
}
</script>

<template>
  <div class="related-card">
    <div class="card-inner">
      <div class="inner-header">
        <div class="header-text">{{ `编号${data.SJBH || data.id}` }}</div>
        <img
          v-if="index === '0'"
          :class="['header-btn', isExpand ? 'btn-active' : '']"
          alt=""
          src="@/views/common/img/icon-arrow.webp"
          @click="() => isExpand = !isExpand"
        />
      </div>

      <template v-if="index === '0'">
        <div class="inner-short">
          <img class="short-img" :src="computeImgUrl(data)" @click="previewImageList(data)" alt=""/>
          <div class="short-ctx">
            <div class="ctx-item">
              <div class="item-label">事件类型：</div>
              <div class="item-text">{{ data.SJLX }}</div>
            </div>
            <div class="ctx-item">
              <div class="item-label">上报时间：</div>
              <div class="item-text">{{ data.SBSJ }}</div>
            </div>
            <div class="short-tag">{{ data.LYFSMC }}</div>
          </div>
        </div>
        <div v-if="isExpand" class="inner-ctx ctx-expand">
          <div class="ctx-item">
            <div class="item-label">事件名称：</div>
            <div class="item-text">{{ data.SJMC }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">事件描述：</div>
            <div class="item-text">{{ data.SJNR }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">事件地址：</div>
            <div class="item-text">{{ data.ADDRESS }}</div>
          </div>
        </div>
      </template>
      <template v-if="index === '1'">
        <div class="inner-ctx">
          <div class="ctx-item">
            <div class="item-label">车辆牌照：</div>
            <div class="item-text">{{ data.license_plate }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">车辆行为：</div>
            <div class="item-text">{{ data.content }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">研判来源：</div>
            <div class="item-text">{{ data.analyze_title }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">上报时间：</div>
            <div class="item-text">{{ data.time }}</div>
          </div>
          <div class="ctx-item">
            <div class="item-label">事发地址：</div>
            <div class="item-text">{{ data.addr }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.related-card {
  position: relative;

  .card-inner {
    padding: 12px 0;

    .inner-header {
      height: 24px;
      display: flex;
      line-height: 24px;
      margin-bottom: 8px;
      align-items: center;
      justify-content: space-between;

      .header-text {
        color: #333333;
        font-size: 16px;
      }

      .header-btn {
        width: 14px;
        height: 14px;
        object-fit: cover;
      }

      .btn-active {
        transform: rotate(180deg);
      }
    }

    .inner-short {
      display: grid;
      grid-gap: 0 8px;
      grid-template-columns: 78px 1fr;

      .short-img {
        width: 78px;
        height: 78px;
        object-fit: cover;
        border-radius: 4px;
      }

      .short-ctx {
        display: grid;
        grid-gap: 4px 0;

        .ctx-item {
          height: 22px;
          line-height: 22px;
          display: flex;
          align-items: flex-start;

          .item-label {
            height: 22px;
            color: #666666;
            font-size: 14px;
            line-height: 22px;
            white-space: nowrap;
          }

          .item-text {
            color: #666666;
            font-size: 14px;
            line-height: 22px;
            @include ellipsis(1);
          }
        }

        .short-tag {
          height: 24px;
          color: #FFFFFF;
          padding: 0 8px;
          margin-top: 4px;
          font-size: 12px;
          line-height: 24px;
          width: max-content;
          text-align: center;
          border-radius: 4px;
          background: #0482ff;
        }
      }
    }

    .inner-ctx {
      display: grid;
      grid-gap: 4px 0;

      .ctx-item {
        display: flex;
        line-height: 22px;
        align-items: flex-start;

        .item-label {
          height: 22px;
          color: #666666;
          font-size: 14px;
          line-height: 22px;
          white-space: nowrap;
        }

        .item-text {
          color: #666666;
          font-size: 14px;
          line-height: 22px;
          @include ellipsis(2);
        }
      }
    }

    .ctx-expand {
      margin-top: 8px;
    }
  }

  &:after {
    position: absolute;
    width: 100%;
    content: "";
    height: 0.5px;
    background-color: #eeeeee;
  }
}
</style>
