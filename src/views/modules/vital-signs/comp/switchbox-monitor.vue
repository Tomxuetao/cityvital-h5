<script setup>
    import { ref, reactive } from 'vue'
    import dayjs from 'dayjs'
    import { useRoute } from 'vue-router'
		import CommonTitle from '@/views/common/common-title.vue'
		import LineChart from '@/views/modules/vital-signs/comp/line-chart.vue'
		import lightTimeLine from './light-time-line.vue'
		import { commonGatewayApi } from '@/api/common-api'
		import { formatDate } from '@/utils/index.js'
import { timePickerProps } from 'vant'

		const props = defineProps({
			detail: {
				type: Object,
				required: true,
				default: () => { return {} }
			}
		})
    // 初始化data
		const BASE_TIME = formatDate(new Date(), 'yyyy-MM-dd')
		const chartDataList = ref([])
		const activeIndex = ref(0)
		const options = ref([])
		const tabLists = ref([])
		let dianluSelect = reactive('')
		const jcInfo = ref({})
		const arraylist = ref({})
		const isBeApart = ref(false)
		const eOptions = {
			yAxis: [
				{
					type: 'time',
					splitNumber: 5,
					min: `${BASE_TIME} 00:00:00`,
					max: `${BASE_TIME} 23:59:59`,
					axisLabel: {
						show: true,
						formatter: function (value) {
							return formatDate(value, 'hh:mm')
						}
					}
				}
			],
			tooltip: {
				// 这里建立一个自定义属性，用于格式化浮窗里面的值
				_formatterValue(v) {
					return formatDate(v, 'hh:mm')
				}
			}
		}

		const tableHeader = ref([
			{ label: '序号' },
			{ label: '时间段' },
			{ label: '通断' }
		])
		const tabConfigList = [
			{ key: 'd7', text: '近7日', code: '23660cb6aa', customForm: { date_flag: '1' } },
			{ key: 'd30', text: '近30日', code: '23660cb6aa' }
		]
		
		
		const getMonitors = () => {
			const { detail: { factory_name, factory_id } } = props
			commonGatewayApi('23795023f4', {
        name: factory_name,
        channel_number: factory_id
      }).then(res => {
        options.value = (res || []).map(item => {
          item.text = item.sw,
          item.value = item.sw
          return item
        })
				dianluSelect = res[0].sw
				getShiRonDengJCZB()
				getChartData(tabConfigList[0], [])
      })
		}
		// 获取检测信息
    const getShiRonDengJCZB = () => {
      const { detail: { factory_id } } = props
			const mainParams = {
				class_code: factory_id,
				flag: dianluSelect 
			}
			Promise.all([
				commonGatewayApi('218b575c65', {
					mod_code: 'KGX_JCXX',
					...mainParams
				}),
				commonGatewayApi('218b575c65', {
					mod_code: 'KGX_ZRTDQK',
					...mainParams
				})
			]).then(dataList => {
				if (Array.isArray(dataList)) { 
					const [detail, areaList] = dataList
					jcInfo.value = Object.assign({}, detail[0] || {})
					setAreaListkgxtdd(detail[0], areaList)
				}
			})
    }
		
		const setAreaListkgxtdd = (detail,areaList) => {
			const getTime = (dateTime) => {
				// 创建一个 Date 对象
				let date = new Date(dateTime)
				// 获取时间戳
				let timestamp = date.getTime()
				return timestamp
			}
			tabLists.value = areaList
			const list = (areaList || []).map((item, index) => {
				const curDate = item.STATISTIC_TIME.split('~')
				// 通电 | 断电 开始-结束
				const sDD = curDate[0]
				const eDD = curDate[1]

				let sT1 = [sDD,'00'].join(':')
				let sT2 = [eDD,'00'].join(':')
				
				const useData = {
					startTime: sT1, // 开始日期  完整格式
					endTime: sT2,
					startTimestamp: getTime(sT1),
					totalTimestamp: getTime(sT2) - getTime(sT1) // 毫秒数
				}

				useData.grade = [
					// - 实际亮灯时间需要拉一根实线做标记，颜色为绿色
					// - 意外灭灯时间需要拉一根实线做标记，颜色为红色
					{
						type: '1',
						text: item.NUM_2,
						posi:  item.STATISTIC_TIME ? getTime((item.STATISTIC_TIME).split('~')[0]) : '' // 1级
					},
					// 应亮未亮10分钟、30分钟、60分钟分别需要拉一根虚线做标记，颜色跟三级、二级、一级对应
					// 注意顺序
					{
						type: '2',
						text: '三级警告',
						lv: '3',
						posi:  item.UNIT_2 ? getTime(item.UNIT_2) : '' // 3级
					},
					{
						type: '2',
						text: '二级警告',
						lv: '2',
						posi: item.NUM_3 ? getTime(item.NUM_3) : ''  // 2级
					},
					{
						type: '2',
						text: '一级警告',
						lv: '1',
						posi: item.UNIT_3 ? getTime(item.UNIT_3) : '' // 1级
					}
				]
				
				if(item.NUM === '通电') {
					if(eDD.split(' ')[1].split(':')[0] < 10 && eDD.split(' ')[1].split(':')[0] > 0) {
						let sThisDay = !1
					}else {
						let isThisDay = !0
					}
				}

				return {
					useData,
					...item
				}
			}) 
			//  formatDate(r, 'yyyy-MM-dd hh:mm:ss'),
			// 通断时间进度
			const TimePeriods = {}
			list.map(item=>{
				if(!TimePeriods[item.UNIT]) {
					TimePeriods[item.UNIT] = [item.STATISTIC_TIME.split('~')]
				}else {
					TimePeriods[item.UNIT].push(item.STATISTIC_TIME.split('~'))
				}
			})

			// 是否隔天
			let isBeApartA = detail.IS_N.split('-')[0].split(':')[0] - detail.IS_N.split('-')[1].split(':')[0] > 0 

			TimePeriods['计划亮灯时间'] = detail.IS_N.split('-').map( (item, index) => {
				let toDay = dayjs().format('YYYY-MM-DD')
				let beforeDay = dayjs().add(-1, 'day').format('YYYY-MM-DD')
				return ((item.split(':')[0] - 12 > 0 ? beforeDay : toDay) ) + ' ' + item + ':00'
			})
			TimePeriods['实际亮灯时间'] = detail.NUM_3.split('-').map( (item, index) => {
				let toDay = dayjs().format('YYYY-MM-DD')
				let beforeDay = dayjs().add(-1, 'day').format('YYYY-MM-DD')
				return ((item.split(':')[0] - 12 > 0 ? beforeDay : toDay) ) + ' ' + item + ':00'
			})
			// TimePeriods['计划亮灯时间'] = detail.IS_N.split('~')
			TimePeriods['应亮未亮'] = list[0]?.useData?.grade
			arraylist.value = TimePeriods
			isBeApart.value = isBeApartA
    }

		const getChartData = async (config, data) => {
			chartDataList.value = []
			const { key, code } = config
			const { detail: { factory_name, factory_id } } = props
      const params = {
        name: factory_name,
        channel_number: factory_id,
				flag: dianluSelect,
        date_type: key // 日期（d7,d30）
      }
			const dataList = await commonGatewayApi(code, params)
			chartDataList.value.push({ name: '计划亮灯', list: dataList.map(item => {
				return  { name: item.point_time, value: `${BASE_TIME} ${item.k_time || '00:00'}` }
			}) })
			chartDataList.value.push({ name: '实际亮灯', list: dataList.map(item => {
				return  { name: item.point_time, value:`${BASE_TIME} ${item.sw_time || '00:00'}`}
			}) })
		}

		const changeTab = (index, data) => {
			if (activeIndex.value !== index) {
				activeIndex.value = index
				getChartData(tabConfigList[index], data)
			}
		}
		getMonitors()
</script>
<template>
    <div class="switchbox-info">
			<div class="info-header">
				<common-title text="监测信息">
					<div class="right-select">
						<van-dropdown-menu>
							<van-dropdown-item v-model="dianluSelect" :options="options" />
						</van-dropdown-menu>
					</div>
				</common-title>
				<div class="header-inner">
					<div class="inner-item">
						<div class="item-label">监测时间：</div>
						<div class="item-text">{{ jcInfo.STATISTIC_TIME || '-' }}</div>
					</div>
					<div class="inner-item">
						<div class="item-label">更新频率：</div>
						<div class="item-text">{{ jcInfo.NUM || '-' }}</div>
					</div>
				</div>
			</div>
			<div class="light-plan-box">
				<div class="plan-lightup">
					<p>{{ jcInfo.CLASS_NAME_2 }}</p>
					<p class="tiem-item">{{ jcInfo.IS_N || '-' }}</p>
				</div>
				<div class="reality-lightup">
					<p>{{ jcInfo.CLASS_NAME_3 }}</p>
					<p class="tiem-item">{{ jcInfo.NUM_3 || '-' }}</p>
				</div>
			</div>
			<div class="line-chart-box">
				<div class="chart-title">
					<div class="title-text">亮灯趋势分析</div>
					<div class="title-tabs">
						<div
							v-for="(tab, index) in tabConfigList"
							:key="index"
							:class="[
								'tab-item',
								activeIndex === index ? 'tab-active' : '',
							]"
							@click="changeTab(index, item)"
						>
							{{ tab.text }}
						</div>
					</div>
				</div>
				<line-chart class="chart-inner" :data-list="chartDataList" :eOptions="eOptions"></line-chart>
			</div>

			<div class="light-on-off-timeline">
				<div class="item-title">亮灯情况</div>
				<div class="timeline-box">
					<light-time-line :arraylist="arraylist" :isBeApart="isBeApart"></light-time-line>
				</div> 
			</div>
			<div class="light-on-off-table">
				<div class="item-title">开关箱昨日通断情况</div>
				<div class="table-item">
					<van-grid :column-num="3">
						<van-grid-item v-for="(item, i) in tableHeader" :key="i"> 
							<div>{{ item.label }}</div>
						</van-grid-item>
						<template v-for="(item, index) in tabLists" :key="index">
							<van-grid-item > 
								<div>{{ index+1 }}</div>
							</van-grid-item>
							<van-grid-item > 
								<div>{{ item.STATISTIC_TIME }}</div>
							</van-grid-item>
							<van-grid-item > 
								<div class="light-status" :class="item.NUM === '通电' ? 'item-on' : 'item-off'">{{ item.NUM }}</div>
							</van-grid-item>
						</template>
					</van-grid>
				</div>
			</div>
    </div>
</template>
<style lang="scss" scoped>
	.switchbox-info {
		::v-deep(.right-select) {
			.van-dropdown-menu {
        .van-dropdown-menu__bar {
          box-shadow: none;
					background-color: transparent;
					color: red;
        }
				.van-dropdown-menu__title {
					color: #0482FF;
					&::after {
						border-color: transparent transparent #0482FF #0482FF;
					}
				}
      }
		}
		.info-header {

			.header-inner {
				padding: 0 16px;

				.inner-item {
					display: flex;
					height: 22px;
					align-items: center;
					line-height: 22px;
					color: #666666;
					margin-bottom: 8px;
				}
			}
		}

		.light-plan-box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 16px;
			> div {
				width: 154px;
				height: 74px;
				padding-top: 10px;
				p {
					width: 100%;
					text-align: center;
					margin: 6px 0;
					font-size: 14px;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: Regular;
					color: #666666;
				}
			}
			.plan-lightup {
				background-image: linear-gradient(180deg, #ECFBF8 0%, #F8FDFC 100%);
				.tiem-item {
					font-size: 16px;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: Medium;
					color: #00c1a2;			
				}
			}
			.reality-lightup {
				background-image: linear-gradient(180deg, #FFF9F2 0%, #FFFEFB 100%);
				.time-item {
					font-size: 22px;
					color: #FFB251;
				}
			}
		}

		.line-chart-box {
			width: 100%;
			padding: 0 16px;
			.chart-title {
				height: 22px;
				line-height: 22px;
				margin-top: 8px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title-text {
					font-size: 12px;
					font-weight: 600;
					color: #333333;
				}

				.title-tabs {
					display: grid;
					align-items: center;
					grid-template-columns: repeat(2, 1fr);
					border: 0.5px solid #d9d9d9;
					border-radius: 4px;
					overflow: auto;
					.tab-item {
						width: 48px;
						height: 22px;
						color: #666666;
						font-size: 12px;
						line-height: 22px;
						text-align: center;
						background-color: #ffffff;
					}

					.tab-active {
						color: #ffffff;
						background-color: #0482ff;
						border: 0.5px solid transparent;
					}
				}
			}
			.chart-inner {
				height: 200px;
			}
		}

		.light-on-off-timeline {
			width: 100%;
			padding: 0 16px;
			.item-title {
				font-size: 14px;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: bold;
				color: #333333;
				padding-top: 10px;
			}
			.timeline-box {
				width: 100%;
				height: 150px;
				margin-top: 5px;
			}
		}

		.light-on-off-table {
			width: 100%;
			padding: 0 16px;
			padding-bottom: 16px;
			.item-title {
				font-size: 14px;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: bold;
				color: #333333;
				padding-top: 10px;
			}
			.table-item {
				margin-top: 5px;
				border: 1px solid #d9d9d9;
				border-bottom: 0;
				.light-status {
					width: 40px;
					height: 24px;
					border-radius: 4px;
					font-size: 12px;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: Regular;
					color: #ffffff;
					text-align: center;
					line-height: 24px;
				}
				.item-on {	
					background: #19cc96;
				}
				.item-off {
					background: #999999;
				}
				::v-deep(.van-grid-item) {
					.van-grid-item__content--center {
						padding: 0 5px;
					}
					&:nth-child(1) {
						.van-grid-item__content--center {
							background: #fafafa;
						}
					}	
					&:nth-child(2) {
						.van-grid-item__content--center {
							background: #fafafa;
						}
					}	
					&:nth-child(3) {
						.van-grid-item__content--center {
							background: #fafafa;
						}
					}	
					&:nth-child(3n-2) {
						flex-basis: 18% !important;
						height: 46px;
						background: #fff;
						border-right: 1px solid #d9d9d9;
						border-bottom: 1px solid #d9d9d9;
					}	
					&:nth-child(3n-1) {
						flex-basis: 62% !important;
						height: 46px;
						background: #fff;
						border-bottom: 1px solid #d9d9d9;
						.van-grid-item__content--center {
							align-items: flex-start;
						}
					}	
					&:nth-child(3n) {
						flex-basis: 20% !important;
						height: 46px;
						background: #fff;
						border-left: 1px solid #d9d9d9;
						border-bottom: 1px solid #d9d9d9;
					}	
				}
			}
		}
	}
</style>