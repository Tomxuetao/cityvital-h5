import { createPinia } from 'pinia'

const pinia = createPinia()

import { useCommonStore } from './modules/common'

export { useCommonStore }

export default pinia
