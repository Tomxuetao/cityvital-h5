import { commonApi } from '@/api/common-api'
import { defineStore, createPinia } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    dataList: []
  }),
  actions: {
    updateDataList(list) {
      this.dataList = list
    },

    updateDataById(data) {
      const tempData = this.dataList.find(item => item.id === data?.id)
      if (tempData) {
        Object.assign(tempData, data)
      }
    },

    async initDataAction() {
      if (this.dataList?.length === 0) {
        const tempList = await commonApi('/city/site/list')
        if (Array.isArray(tempList)) {
          this.dataList = tempList.map(item => {
            return {
              ...item,
              center: [item.lng, item.lat],
              imgList: item.files ? (JSON.parse(item.files) || []) : []
            }
          })
        }
      }
      return this.dataList
    }
  }
})

const pinia = createPinia()

export default pinia
