<script setup>
	const props = defineProps({
		detail: {
			type: Object,
			required: true
		}
	})

	// 初始化固定data
	// const timeType = ref([])
	// const timeLines = ref([])
	const timeTypes = [
		{ name: '断电时间', color: '#FF4C63' },
		{ name: '实际亮灯', color: '#FFB251' },
		{ name: '通电时间', color: '#00C1A2' },
		{ name: '未通电时间', color: '#7F58FF' },
		{ name: '计划亮灯', secondName: '时间', color: '#3196fa' },
		{ name: '应亮未亮', secondName: '一级', color: '#486AFF' },
		{ name: '应亮未亮', secondName: '二级', color: '#FFE61A' },
		{ name: '应亮未亮', secondName: '三级',  color: '#FF6161' }
	]
	const timeLines = ['12', '13', '14', '15', '16', '17', '18']
</script>
<template>
  <div class="timeline">
		<div class="time-x-line">
			<div v-for="(i, index) in timeLines" :key="i" :style="'width:' + parseInt(100 / timeLines.length) + '%'">
				<p class="y-grid-line" :class="{ 'solid': index === 0 }"></p>
				{{ i }}:00
			</div>
			<div class="first-time-line">
					<!-- 计划亮灯时间 -->
					<div class="plan-on-light"></div>
					<!-- 应亮未亮 -->
					<div class="first-off-light" style="width: 10px;left: 10%"></div>
					<div class="second-on-light" style="width: 20px;left: 30%"></div>
					<div class="third-on-light" style="width: 30px;left: 50%"></div>
			</div>
			<div class="second-time-line">
				<!-- 断电时间 -->
				<div class="outage-time" style="width: 50px;left: 0%"></div>
				<!-- 实际亮灯 -->
				<div class="real-on-time" style="width: 50px;left: 50px"></div>
				<!-- 通电时间 -->
				<div class="power-on-time" style="width: 50px;left: 100px"></div>
				<!-- 未通电时间 -->
				<div class="off-time" style="width: 50px;left: 150px"></div>
			</div>
		</div>
		<div class="time-legend">
			<div v-for="item in timeTypes" :key="item.name"> 
				<div class="color-item" :style="{ 'backgroundColor': item.color }"></div>
				<div>
					<p>{{item.name}}</p>
					<p v-if="item.secondName">{{item.secondName}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.timeline {
		width: 100%;
		margin-top: 20px;
		.time-x-line {
			width: 100%;
			display: flex;
			align-items: center;
			text-align: center;
			font-size: 12px;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: Regular;
			text-align: center;
			color: #666666;
			position: relative;
			.y-grid-line {
				width: 1px;
				height: 44px;
				border: 1px dashed #d7d7d7;
				margin: auto;
				margin-bottom: 5px;
				transform: scaleX(0.5);
				&.solid {
					border: 1px solid #d7d7d7;
				}
			}
			.first-time-line {
				width: 100%;
				height: 12px;
				// background-color: #3196FA;
				position: absolute;
				left: 7%;
				top: 10px;
				> div {
					position: absolute;
					height: 100%;
					top: 0;
				}
				.plan-on-light {
					width: 70%;
					background-color: #3196fa;
					left: 0;
				}
				.first-off-light {
					background-color: #486AFF;
				}
				.second-on-light {
					background-color: #FFE61A;
				}
				.third-on-light {
					background-color: #FF6161;
				}
			}
			.second-time-line {
				width: 100%;
				height: 12px;
				position: absolute;
				left: 7%;
				top: 25px;
				> div {
					position: absolute;
					height: 100%;
					top: 0;
				}
				.outage-time {
					background-color: #FF4C63;
				}
				.real-on-time {
					background-color: #FFB251;
				}
				.power-on-time {
					background-color: #00C1A2;
				}
				.off-time {
					background-color: #7F58FF;
				}
			}
		}
		.time-legend {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: Regular;
			text-align: center;
			color: #666666;
			flex-wrap: wrap;
			padding-top: 15px;
			>div {
				width: 25%;
				display: flex;
				align-items: center;
				margin: 5px 0;
				.color-item {
					width: 8px;
					height: 8px;
					margin-right: 4px;
				}
				p {
					margin: 0;
					padding: 0;
				}
			}
		}
	}
</style>
