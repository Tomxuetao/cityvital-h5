import { getImgUrlFn } from '@/utils'
import { commonApi } from '@/api/common-api'
import { defineStore, createPinia } from 'pinia'

const getImg = getImgUrlFn('../assets/img')
const imgList = [{ url: getImg('detail-0') }, { url: getImg('detail-1') }]

export const useCommonStore = defineStore('common', {
  state: () => ({
    dataList: []
  }),
  actions: {
    updateDataList(list) {
      this.dataList = list
    },

    async initDataAction() {
      if (this.dataList?.length === 0) {
        const tempList = await commonApi('/city/site/list')
        if (Array.isArray(tempList)) {
          this.dataList = tempList.map(item => {
            return {
              ...item,
              imgList: imgList,
              center: [item.lng, item.lat]
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
