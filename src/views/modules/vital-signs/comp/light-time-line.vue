<script setup>
	import { ref, watch, reactive } from 'vue'
	import dayjs from 'dayjs'
	const props = defineProps({
		arraylist: {
			type: Object,
			required: true
		},
		isBeApart: {
			typeo: Boolean,
			required: true
		}
	})
	watch(() => props.arraylist, (list) => {
		const newLists = JSON.parse(JSON.stringify(list))
		setTimePeriods(newLists)
	}, { deep: true })
	const timeArrs = ref([])
	let firstOffLight = reactive({})
	let secondOnLight = reactive({})
	let thirdOnLight = reactive({})
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
	const timeLines = ref([])
	const setTimePeriods = (newLists) => { 
		const startTime = new Date(newLists['计划亮灯时间'][0]).getTime()
		const endTime = new Date(newLists['计划亮灯时间'][1]).getTime()
		const length = endTime - startTime

		const atimeArrs = [{ left: 0, width: newLists['实际亮灯时间'][1] ? 100 : 0, color: '#FFB251', zIndex: 1 }]

		timeLines.value = getTimePeriodArr(dayjs(startTime).format('HH')-0, dayjs(endTime).format('HH')-0, props.isBeApart, dayjs(startTime).get('minute')-0)

		Object.keys(newLists).forEach(key => { 
			if (key === '计划亮灯时间') return
			if (key === '实际亮灯时间') return
			const timeType = timeTypes.find(item => item.name === key)
			if (!timeType || !Array.isArray(newLists[key])) return
			if (key === '应亮未亮') {
				newLists[key].forEach(item => {
					const left = Math.max(0, (item.posi - startTime) * 100 / length).toFixed(2)
					switch(item.lv) {
						case '1': firstOffLight = { left: left, width: '2%', zIndex: 1}; break
						case '2': secondOnLight = { left: left, width: '2%', zIndex: 1}; break
						case '3': thirdOnLight = { left: left, width: '2%', zIndex: 1}; break
					}
				})
				return
			}
			newLists[key].forEach(item => {
				const time1 = new Date(item[0]).getTime()
				const time2 = new Date(item[1]).getTime()
				const left = Math.max(0, (time1 - startTime) / length)
				const right = (time2 - startTime) / length
				const width = Math.max(1, ((right - left) * 100).toFixed(2))
				const color = timeType.color
				const zIndex = width <= 1 ? 3 : 2
				atimeArrs.push({ left: (left * 100).toFixed(2), width, color, zIndex })
			})
		})
		timeArrs.value = atimeArrs
	}
	const getTimePeriodArr = (start, end, isBeApart, m) => {
		// eslint-disable-next-line no-param-reassign
		end = isBeApart ? (24 + end) : end

		let timeArrs = []
		let period = parseInt((end - start) / 8) + 1
		timeArrs.push(start + ':' + m)
		for( let i = 1; i<7; i++) {
			timeArrs.push((i*period + start > 24 ? (i*period + start - 24 + ':00') : (i*period + start + ':00')))
		}
		timeArrs.push(end > 24 ? (end - 24 + ':00') : (end + ':00'))
		return timeArrs
	}
</script>
<template>
  <div class="timeline">
		<div class="time-x-line">
			<div v-for="(i, index) in timeLines" :key="i" :style="'width:' + parseInt(100 / timeLines.length) + '%'">
				<p class="y-grid-line" :class="{ 'solid': index === 0 }"></p>
				{{ i }}
			</div>
			<div class="first-time-line">
					<!-- 计划亮灯时间 -->
					<div class="plan-on-light"></div>
					<!-- 应亮未亮 -->
					<div class="first-off-light" :style="{ 'left': firstOffLight.left + '%', 'width': firstOffLight.width }"></div>
					<div class="second-on-light" :style="{ 'left': secondOnLight.left + '%', 'width': secondOnLight.width }"></div>
					<div class="third-on-light" :style="{ 'left': thirdOnLight.left + '%', 'width': thirdOnLight.width }"></div>
			</div>
			<div class="second-time-line">
				<template v-for="( item, index ) in timeArrs" :key="index">
					<div :style="`width: ${item.width}%;left: ${item.left}%;background-color: ${item.color};z-index: ${item.zIndex}`">
						
					</div>
				</template>
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
				width: 84%;
				height: 12px;
				// background-color: #3196FA;
				position: absolute;
				left: 6%;
				top: 10px;
				> div {
					position: absolute;
					height: 100%;
					top: 0;
				}
				.plan-on-light {
					width: 100%;
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
				width: 84%;
				height: 12px;
				position: absolute;
				left: 6%;
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
