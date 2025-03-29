<script setup>
import { ref } from 'vue'

import { commonBackEndApi } from '@/api/common-api'

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  emergencyDegree: {
    required: true
  }
})
/**
 * 计算当前激活的步骤
 * @param dataList
 */
const computeCurActive = (dataList) => {
  let hasActive = false
  for (let i = dataList.length - 1; i >= 0; i--) {
    const tempData = dataList[i]
    const { list } = dataList[i]
    if (!hasActive && list.find(item => item.time)) {
      hasActive = true
      tempData.isCurStep = true
    }
  }
}

/**
 * 组装处置、监管数据
 * @param data
 * @param title
 * @param handleDept
 * @param index
 * @returns {{unitName: string, isRead: boolean, time: string, title, taskNum: (*|string), content: (string|string)}}
 */
const assembleData = (data, title, handleDept = '', index = 0) => {
  const { read, operator, operateTime, eventRemark, extraMap } = data
  return {
    title: title,
    index: index,
    time: operateTime || '',
    unitName: handleDept,
    taskNum: extraMap?.taskNum || '',
    isRead: !!operateTime || read, // 有操作时间就已读
    content: operateTime ? `【${handleDept}】${operator}进行${title}操作，处理意见: ${eventRemark}` : (handleDept ? `【${handleDept}】${title.replace('中', '')}` : '')
  }
}

/**
 * 组装列表数据 - [派遣、处置\监管、结案]
 * @param list
 * @param emergencyDegree
 * @returns {[{list: [{title: string}], isCurStep: boolean},{list: *[], isCurStep: boolean},{list: [{title: string}], isCurStep: boolean}]}
 */
const assembleList = (list, emergencyDegree) => {
  const tempList = [...list]
  const resList = [
    { list: [{ title: '派遣' }], isCurStep: false },
    { list: [], isCurStep: false },
    { list: [{ title: '结案' }], isCurStep: false }
  ]

  const firstStep = tempList.find(({ procedure }) => ['派发', '自动派发'].includes(procedure)) || {}

  // 节点1 - 派遣数据处理
  const { extraMap, operateTime } = firstStep
  const { nextUnitId, nextUnitRead, nextUnitName, nextActDefName } = extraMap || {
    nextUnitId: '',
    nextUnitRead: '',
    nextUnitName: '',
    nextActDefName: ''
  }

  // 下一阶段的部门ID处理
  const tempIds = nextUnitId?.split(',') || []
  const unitIds = tempIds.length > 1 ? tempIds : ['', '']

  // 下一阶段已读未读处理
  const tempReads = nextUnitRead?.split(',') || []
  const unitReads = tempReads.length > 1 ? tempReads : ['', '']

  // 下一阶段的部门名称处理
  const tempNames = nextUnitName?.split(',') || []
  const unitNames = tempNames.length > 1 ? tempNames : ['', '']

  // 下一阶段激活的步骤（处置/监管）
  const tempDefNames = nextActDefName.split(',')
  const defNames = tempDefNames.length > 1 ? tempDefNames : ['', '']
  const tempIndex = defNames[0].includes('处置') ? 1 : 0

  if (operateTime) {
    resList[0] = {
      list: [
        {
          title: '派遣',
          isRead: undefined,
          time: operateTime,
          content: `处理意见：【${unitNames[tempIndex]}】进行处置${emergencyDegree !== 3 ? `，【${unitNames[1 - tempIndex]}】进行监管` : ''}`
        }
      ]
    }
  }

  // 正在处理（监管/处置）
  const processingList = tempList.filter(({ procedure }) => procedure === '处理中')

  // 节点2 - 处置、监管数据处理
  if (emergencyDegree === 3) {
    const tempData = processingList.find(({ procedure }) => procedure === '处理中') || {}
    resList[1].list.push(assembleData(tempData, `处置${tempData.operateTime ? '' : '中'}`, unitNames[tempIndex], tempIndex))
  } else {
    // 处置数据
    const disposeData = processingList.find(({ extraMap }) => extraMap?.curActDefName.includes('处置')) || {}
    resList[1].list.push(assembleData(disposeData, `处置${disposeData.operateTime ? '' : '中'}`, unitNames[tempIndex], tempIndex))
    // 监管数据
    const superviseData = processingList.find(({ extraMap }) => extraMap?.curActDefName.includes('监管')) || {}
    resList[1].list.push(assembleData(superviseData, `监管${superviseData?.operateTime ? '' : '中'}`, unitNames[1 - tempIndex], 1 - tempIndex))
  }

  // 对处置、监管数据处理进行二次处理（添加isRead、unitId）
  resList[1].list.forEach(item => {
    Object.assign(item, {
      unitId: unitIds[item.index],
      isRead: item.isRead ? item.isRead : unitReads[item.index] === 'true'
    })
  })

  // 节点3 - 结案数据处理
  const thirdStep = tempList.find(({ procedure }) => procedure === '结案')
  if (thirdStep) {
    const { operateTime } = thirdStep
    if (operateTime) {
      resList[2] = {
        list: [
          {
            title: '结案',
            isRead: undefined,
            time: operateTime,
            content: '【自动结案】体征监测值已恢复正常，完成结案操作。'
          }
        ],
        isCurStep: true
      }
    }
  }

  computeCurActive(resList)

  return resList
}

const processList = ref(assembleList(props.list, props.emergencyDegree) || [])

const getReaderList = ({ unitId, taskNum, unitName }) => {
  commonBackEndApi('api/v1/event/reads', {
    unitId,
    taskNum,
    unitName,
    eventId: props.eventId
  })
}
</script>

<template>
  <div class="process-card">
    <div class="card-steps">
      <div class="step-item" v-for="(item, index) in processList" :key="index">
        <div class="item-round">
          <div :class="['round-inner', item.isCurStep ? 'inner-active' : '']"></div>
        </div>
        <div class="ctx-wrap">
          <div
            class="ctx-item"
            v-for="(ctx, index2) in item.list"
            :key="index2"
          >
            <div class="item-header">
              <div class="header-ctx">
                <div class="header-title">{{ ctx.title }}</div>
                <div class="header-time">{{ ctx.time }}</div>
              </div>
              <div
                v-if="ctx.isRead !== undefined"
                :class="['header-status', ctx.isRead ? 'status-read' : '']"
                @click="getReaderList(ctx)"
              >
                {{ ctx.isRead ? '已读' : '未读' }}
              </div>
            </div>
            <div class="item-text">
              {{ ctx.content }}
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
          width: 14px;
          height: 14px;

          &:after {
            position: absolute;
            content: "";
            top: 3px;
            left: 3px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(1, 193, 163, 1);
          }
        }

        .inner-active {
          display: flex;
          align-items: center;

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
            left: 50%;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            transform: translate(-50%, 0);
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
            justify-content: space-between;

            .header-ctx {
              display: flex;
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

            .header-status {
              padding: 0 8px;
              height: 24px;
              color: #FFFFFF;
              font-size: 12px;
              border-radius: 4px;
              line-height: 24px;
              background-color: #FF5167;
            }

            .status-read {
              background-color: #0482FF;;
            }
          }

          .item-text {
            font-size: 14px;
            color: #666666;
            line-height: 22px;
          }
        }
      }

      &:not(:last-child) {
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
