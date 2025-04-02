import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/index.scss'

import { registerCustomElement } from '@/views/common'

registerCustomElement()

const app = createApp(App)

app.use(router).mount('#app')
