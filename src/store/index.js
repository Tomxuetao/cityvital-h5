import { createPinia } from 'pinia'

const pinia = createPinia()

import { useCommonStore } from '@/store/modules/common'

export { useCommonStore }

export default pinia
