<script setup>
    import { ref } from 'vue'
    import dayjs from 'dayjs'
    import { useRoute } from 'vue-router'
		import CommonTitle from '@/views/common/common-title.vue'
		import LineChart from '@/views/modules/vital-signs/comp/line-chart.vue'

    // 初始化data
		const chartDataList = ref([])
		const activeIndex = ref(0)
		const tableHeader = ref([
			{ label: '序号' },
			{ label: '时间段' },
			{ label: '通断' }
		])
		const tabConfigList = [
			{ key: '_weekData', text: '近7日', code: '211ae2f909', customForm: { date_flag: '1' } },
			{ key: '_monthData', text: '近30日', code: '211ae2f909' }
		]
		
		const getChartData = async (config, data) => {
			chartDataList.value = []
			setTimeout(() => {
				chartDataList.value.push({ name: '计划亮灯', list: [
					{name: '00:01', value: '0.01'},
					{name: '04:01', value: '0.02'},
					{name: '08:01', value: '0.03'},
					{name: '12:01', value: '0.04'}] })

				chartDataList.value.push({ name: '实际亮灯', list: [
					{name: '00:01', value: '0.02'},
					{name: '04:01', value: '0.03'},
					{name: '08:01', value: '0.02'},
					{name: '12:01', value: '0.05'}] })
			}, 1000)
		}

		getChartData(tabConfigList[0], [])
</script>
<template>
    <div class="switchbox-info">
			<div class="info-header">
				<common-title text="监测信息">
					<div class="right-select">111</div>
				</common-title>
				<div class="header-inner">
					<div class="inner-item">
						<div class="item-label">监测时间：</div>
						<div class="item-text">2023-12-25 22:23:47</div>
					</div>
					<div class="inner-item">
						<div class="item-label">更新频率：</div>
						<div class="item-text">15分钟</div>
					</div>
				</div>
			</div>
			<div class="light-plan-box">
				<div class="plan-lightup">
					<p>昨日计划亮灯时间</p>
					<p class="tiem-item">昨日无亮灯计划</p>
				</div>
				<div class="reality-lightup">
					<p>昨日实际亮灯时间</p>
					<p class="tiem-item">00:00 ~ 24:00</p>
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
				<line-chart class="chart-inner" :data-list="chartDataList"></line-chart>
			</div>

			<div class="light-on-off-timeline">
				<div class="item-title">亮灯情况</div>
				<div class="timeline-box"></div>
			</div>
			<div class="light-on-off-table">
				<div class="item-title">开关箱昨日通断情况</div>
				<div class="table-item">
					<van-grid :column-num="3">
						<van-grid-item v-for="(item, i) in tableHeader" :key="i"> 
							<div>{{ item.label }}</div>
						</van-grid-item>
						<van-grid-item v-for="i in 9" :key="i"> 
							<div>1</div>
						</van-grid-item>
					</van-grid>
				</div>
			</div>
    </div>
</template>
<style lang="scss" scoped>
	.switchbox-info {
		.info-header {
			border-bottom: 0.5px solid #eeeeee;

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

					.tab-item {
						width: 48px;
						height: 22px;
						color: #666666;
						font-size: 12px;
						line-height: 22px;
						text-align: center;
						border: 0.5px solid #d9d9d9;
						background-color: #ffffff;

						&:nth-child(2) {
							border-left: 0;
							border-right: 0;
						}

						&:nth-child(1) {
							border-radius: 4px 0 0 4px;
						}

						&:nth-child(3) {
							border-radius: 0 4px 4px 0;
						}
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
				::v-deep(.van-grid-item) {
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
						flex-basis: 57% !important;
						height: 46px;
						background: #fff;
						border-bottom: 1px solid #d9d9d9;
						.van-grid-item__content--center {
							align-items: flex-start;
						}
					}	
					&:nth-child(3n) {
						flex-basis: 25% !important;
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