<script setup>
import { ref } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  emergencyDegree: {
    required: true
  }
})

const assembleData = (data, title, handleDept = '', index = 0) => {
  const { operateTime, operatorOrg, operator, eventRemark, extraMap } = data
  if (operateTime) {
    return {
      title: title,
      time: operateTime,
      isRead: undefined,
      content: `【${operatorOrg}】${operator}进行${title}操作，处理意见: ${eventRemark}`
    }
  } else {
    const { nextUnitRead } = extraMap || { nextUnitRead: '' }
    const nextUnitReadArray = nextUnitRead.split(',')
    return {
      title: title,
      time: '',
      isRead: nextUnitRead ? nextUnitReadArray[index] : 'false',
      content: handleDept ? `【${handleDept}】${title.replace('中', '')}` : ''
    }
  }
}

const assembleList = (list, emergencyDegree) => {
  const tempList = [...list]
  const resList = [
    { list: [{ title: '派遣' }] },
    { list: [] },
    { list: [{ title: '结案' }] }
  ]

  const firstStep =
    tempList.find((item) => ['派发', '自动派发'].includes(item.procedure)) ||
    {}

  // 节点1 - 派遣数据处理
  const { extraMap, operateTime } = firstStep
  const { nextPartName, nextActDefName } = extraMap || {
    nextPartName: '',
    nextActDefName: ''
  }
  const tempNames = nextPartName.split(',')
  const partNames = tempNames.length > 1 ? tempNames : ['', '']
  const tempDefNames = nextActDefName.split(',')
  const defNames = tempDefNames.length > 1 ? tempDefNames : ['', '']
  const tempIndex = defNames[0] === '养护处置' ? 0 : 1

  if (operateTime) {
    resList[0] = {
      list: [
        {
          title: '派遣',
          time: operateTime,
          content: `处理意见：【${partNames[tempIndex]}】进行处置${
            emergencyDegree !== 3
              ? `，【${partNames[1 - tempIndex]}】进行监管`
              : ''
          }`
        }
      ]
    }
  }

  // 节点2 - 处置、监管数据处理
  if (emergencyDegree === 3) {
    const tempData = tempList.find((item) => item.procedure === '处理中') || {}
    resList[1].list.push(assembleData(tempData, '处置', partNames[tempIndex]))
  } else {
    // 处置数据
    const tempDisposeData =
      tempList.find(
        (item) =>
          item.procedure === '处理中' &&
          item.extraMap?.curActDefName === '养护处置'
      ) || {}
    // 监管数据
    const tempSuperviseData =
      tempList.find(
        (item) =>
          item.procedure === '处理中' &&
          item.extraMap?.curActDefName === '行业监管'
      ) || {}

    const disposeData = assembleData(
      tempDisposeData,
      tempDisposeData.operateTime ? '处置' : '处置中',
      partNames[tempIndex],
      tempIndex
    )
    if (disposeData) {
      resList[1].list.push(disposeData)
    }

    const superviseData = assembleData(
      tempSuperviseData,
      tempSuperviseData.operateTime ? '监管' : '监管中',
      partNames[1 - tempIndex],
      1 - tempIndex
    )
    if (superviseData) {
      resList[1].list.push(superviseData)
    }
  }

  // 节点3 - 结案数据处理
  const thirdStep = tempList.find((item) => item.procedure === '结案')
  if (thirdStep) {
    const { operateTime } = thirdStep
    if (operateTime) {
      resList[2] = {
        list: [
          {
            title: '结案',
            time: operateTime,
            content: '【自动结案】体征监测值已恢复正常，完成结案操作。'
          }
        ]
      }
    }
  }

  return resList
}

const processList = ref(assembleList(props.list, props.emergencyDegree) || [])
</script>

<template>
  <div class="process-card">
    <div class="card-steps">
      <div class="step-item" v-for="(item, index) in processList" :key="index">
        <div class="item-round">
          <div class="round-inner"></div>
        </div>
        <div class="ctx-wrap">
          <div
            class="ctx-item"
            v-for="(ctx, index2) in item.list"
            :key="index2"
          >
            <div class="item-header">
              <div class="header-title">{{ ctx.title }}</div>
              <div class="header-time">{{ ctx.time }}</div>
            </div>
            <div class="item-text">
              <div class="text-ctx">{{ ctx.content }}</div>
              <div class="text-read" v-if="ctx.isRead !== undefined">
                {{ ctx.isRead === "true" ? "已读" : "未读" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.process-card {
  .card-steps {
    .step-item {
      display: grid;
      grid-gap: 0 5px;
      grid-template-columns: 14px 1fr;

      .item-round {
        position: relative;

        .round-inner {
          &:before {
            position: absolute;
            content: "";
            width: 14px;
            height: 14px;
            opacity: 0.2;
            border-radius: 50%;
            background-color: rgba(4, 130, 255, 1);
          }

          &:after {
            position: absolute;
            content: "";
            top: 3px;
            left: 3px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(4, 130, 255, 1);
          }
        }
      }

      .ctx-wrap {
        display: grid;
        grid-gap: 8px 0;
        min-height: 84px;
        margin-top: -5px;
        margin-bottom: 24px;

        .ctx-item {
          .item-header {
            display: flex;
            margin-bottom: 4px;
            align-items: center;

            .header-title {
              height: 24px;
              color: #333333;
              font-weight: 600;
              line-height: 24px;
              margin-right: 12px;
            }

            .header-time {
              height: 22px;
              font-size: 14px;
              color: #999999;
              line-height: 22px;
            }
          }

          .item-text {
            font-size: 14px;
            color: #666666;
            line-height: 22px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }

      &:nth-child(-n + 2) {
        .item-round {
          position: relative;

          &:after {
            position: absolute;
            height: calc(100% - 12px);
            content: "";
            left: 50%;
            top: 12px;
            transform: translateX(-50%);
            border: 0.5px dashed #dddddd;
          }
        }
      }
    }
  }
}
</style>
