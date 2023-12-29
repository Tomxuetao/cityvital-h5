import { defineStore } from 'pinia'

import { commonGatewayApi } from '@/api/common-api'

export const useCommonStore = defineStore('common', {
  state: () => ({
    // 领域分类
    areaListState: [],
    // 告警设施
    alarmListState: []
  }),
  actions: {
    /**
     * 获取领域分类
     * @returns {Promise<unknown>}
     */
    initAreaListAction() {
      return new Promise((resolve) => {
        if (!this.areaListState.length) {
          commonGatewayApi('21f7ec0b97')
            .then((dataList) => {
              if (Array.isArray(dataList)) {
                this.areaListState = dataList
                resolve(dataList)
              } else {
                resolve([])
              }
            })
            .catch(() => {
              resolve([])
            })
        } else {
          resolve(this.areaListState)
        }
      })
    },
    /**
     * 获取异常设施
     * @returns {Promise<unknown>}
     */
    initAlarmListAction() {
      return new Promise((resolve) => {
        if (!this.alarmListState.length) {
          commonGatewayApi('24810089d7')
            .then((dataList) => {
              if (Array.isArray(dataList)) {
                this.alarmListState = dataList
                resolve(dataList)
              } else {
                resolve([])
              }
            })
            .catch(() => {
              resolve([])
            })
        } else {
          resolve(this.alarmListState)
        }
      })
    }
  }
})
