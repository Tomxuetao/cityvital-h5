import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    curActiveIndex: 0,
    eventTypeMap: new Map(),
    regionListMap: new Map()
  }),
  actions: {
    updateActiveIndex(index) {
      this.curActiveIndex = index
    },
    
    updateEventType(key, list) {
      const tempList = list.map(({ THIRD_CODE, SECOND_NAME, THIRD_NAME }) => {
        const temp = `${SECOND_NAME}-${THIRD_NAME}`
        return {
          name: temp,
          text: temp,
          value: THIRD_CODE
        }
      })
      this.eventTypeMap.set(key, tempList)
    },
    
    updateRegionList(key, list) {
      const tempList = list.map(({ DISTRICT_NAME, DISTRICT_NO }) => {
        return {
          name: DISTRICT_NAME,
          text: DISTRICT_NAME,
          value: DISTRICT_NO
        }
      })
      
      this.regionListMap.set(key, tempList)
    }
  }
})
