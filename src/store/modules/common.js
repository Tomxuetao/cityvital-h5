import { defineStore } from 'pinia'

import { commonGatewayApi } from '@/api/common-api'

export const useCommonStore = defineStore('common', {
  state: () => ({
    // 领域分类
    areaListState: []
  }),
  getters: {},
  actions: {
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
    }
  }
})
