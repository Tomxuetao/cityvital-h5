<script setup>
import { reactive, ref } from 'vue'
import { commonGatewayApi, commonApi } from '@/api/common-api'

import CommonTitle from '../../common/common-title.vue'
import AlarmList from './comp/alarm-list.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  originType: {
    type: String,
    required: true
  },
  secondType: {
    type: String,
    required: true
  }
})
// 初始化data
const hasImg = ref(true)
const dataLoading = ref(true)
let detailData = reactive({})
let images = ref([])
let tabList = ref([])
let tableLists = ref([])
const activeTabIndex = ref(0)
let innerCloums = []
let innerCloumsStatus = []
let colorEmnu = {
	在线: '#19CC96',
	离线: '#999999'
}
const tableHeader = ref([
	{ label: '播放内容' }
])

const setInnerCloums = (item) => {
    innerCloums = [
			{ label:'大屏面积：', value: item.area || '0㎡' },
			{ label:'广告厂商：', value: item.dept, width:'100%' },
			{ label:'所属区划：', value: item.district_name },
			{ label:'地址：', value: item.address }
    ]
		innerCloumsStatus = [
			{ label:'大屏状态：', value: item.is_on },
			{ label:'机柜状态：', value: item.is_alarm }
		]
}
const setTabLists = () => {
  tabList.value = [{ text: '监测信息' }, { text: '报警信息' }]
}


/**
 * 获取设施的详情信息
 * @returns {Promise<void>}
 */
const getDetailData = async () => {
  dataLoading.value = true
  commonGatewayApi('215e4c5e84', { factory_id: props.id })
    .then((dataList) => {
      if (Array.isArray(dataList)) {
        const [data] = dataList
        detailData = Object.assign({}, data || {})
        let PIC_URLS = ''
        try {
          PIC_URLS = detailData.PIC_URL
          ? JSON.parse(detailData.PIC_URL)
          : []
        }catch {
          PIC_URLS = detailData.PIC_URL ? [detailData.PIC_URL] : []
        }
        images.value = PIC_URLS
        setInnerCloums(dataList[0])
        setTabLists()
				getMaterialListByEndpointId()
      }
    })
    .finally(() => {
      dataLoading.value = false
    })
}

const getMaterialListByEndpointId = async () => {
	const data = await commonApi('api/v1/cityscape/getMaterialListByEndpointId', { endpointId: props.id }, {
		method: 'get',
    isIndexServer: false
	})
	tableLists.value = data
}

const changeTabHandler = (index) => {
  if (activeTabIndex.value !== index) {
    activeTabIndex.value = index
  }
}
getDetailData()

</script>

<template>
  <div class="switchbox-detail">
    <div :class="['detail-inner', hasImg ? 'has-img' : '']">
      <img class="inner-img"
        :src="images[0]"
        alt=""
      />
      <div class="inner-ctx">
        <div class="ctx-header">
          <common-title :text="name"></common-title>
          <p class="header-label" v-if="innerCloums.length>0">基本信息</p>
          <div class="header-inner">
            <div class="inner-item" v-for="(item, index) in innerCloums" :key="index" :style="{'width': item.width || '' }">
              <div class="item-label">{{ item.label }}</div>
              <div class="item-text">{{ item.value }}</div>
            </div>
          </div>
					<p class="header-label" v-if="innerCloumsStatus.length>0">状态信息</p>
					<div class="header-inner">
            <div class="inner-item" v-for="(item, index) in innerCloumsStatus" :key="index" :style="{'width': item.width || '' }">
              <div class="item-label">{{ item.label }}</div>
              <div class="item-text" :style="{ 'color': colorEmnu[item.value] }">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="ctx-tabs" :style="`grid-template-columns: repeat(${tabList.length}, 1fr);`">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="['tab-item', activeTabIndex === index ? 'tab-active' : '']"
            @click="changeTabHandler(index)"
          >
            {{ item.text }}
          </div>
        </div>
        <div class="ctx-cxt">
          <van-loading v-if="dataLoading" color="#0094ff" vertical>
            加载中...
          </van-loading>
          <template v-else>
            <div class="monitor-box" v-if="activeTabIndex===0">
                <p class="item-label">在播内容</p>
								<div class="table-item">
									<van-grid :column-num="1" :border="false" :center="false">
										<van-grid-item v-for="(item, i) in tableHeader" :key="i" class="table-header">
											<div>{{ item.label }}</div>
										</van-grid-item>
										<template v-for="(item, index) in tableLists" :key="index">
											<van-grid-item >
												<div>{{ item.material }}</div>
											</van-grid-item>
										</template>
									</van-grid>
								</div>
            </div>
            <alarm-list v-if="tabList[activeTabIndex]?.text === '报警信息'" :detail="detailData"></alarm-list>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.switchbox-detail {
  min-height: calc(100vh - 18px);

  .detail-inner {
    .inner-ctx {
      padding: 12px 12px 0 12px;

      .ctx-header {
        position: relative;
        min-height: 114px;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);
        padding-bottom: 10px;
				.header-label {
					font-size: 14px;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: bold;
					color: #333333;
					padding: 10px 16px;
					margin: 0;
				}
        .header-tags {
          width: 100%;
          display: flex;
          padding: 0 16px;
          margin-bottom: 8px;
          .tag-item {
            width: 40px;
            height: 24px;
            background: #999999;
            border-radius: 4px;
            text-align: center;
            line-height: 24px;
            margin-right: 8px;
          }
        }

        .header-inner {
          padding: 0 16px;
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .inner-item {
            width: 50%;
            display: flex;
            height: 22px;
            align-items: center;
            line-height: 22px;
            color: #666666;
            margin-bottom: 8px;

            .item-text {
              flex: 1;
              @include ellipsis(1);
            }
          }
        }

        &:before {
          position: absolute;
          top: 12px;
          right: 4px;
          height: 96px;
          width: 105px;
          content: "";
          background-size: cover;
          background-repeat: no-repeat;
          background-image: url("img/img-title-bg.webp");
        }
      }

      .ctx-tabs {
        display: grid;
        margin-top: 12px;
        align-items: center;
        border-radius: 8px;
        overflow: hidden;
        .tab-item {
          height: 32px;
          color: #666666;
          font-size: 14px;
          line-height: 32px;
          text-align: center;
          border: 0.5px solid #d9d9d9;
          background-color: #ffffff;
        }

        .tab-active {
          color: #ffffff;
          background-color: #0482ff;
          border: 0.5px solid transparent;
        }
      }

      .ctx-cxt {
        margin-top: 12px;
        border-radius: 12px;
        background-color: #ffffff;
        min-height: calc(100vh - 300px);
        box-shadow: 0 0 4px 0 rgba(233, 233, 233, 0.5);
      }
    }
  }

  .has-img {
    .inner-img {
      width: 375px;
      height: 186px;
      object-fit: cover;
    }

    .inner-ctx {
      padding: 0 12px;
      margin-top: -12px;
    }
  }

  .monitor-box {
    padding: 1px 10px;
		.item-label {
			font-size: 14px;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: bold;
			color: #333333;
		}
		::v-deep(.van-grid-item__content) {
			border: 1px solid #d9d9d9;
			border-top: 0
		}
		.table-header {
			::v-deep(.van-grid-item__content) {
				background-color: #D9D9D9;
			}
		}
  }

}
</style>
