import { createApp } from 'vue'
import VConsole from 'vconsole'

import App from './App.vue'

import pinia from './store'
import router from '@/router'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

import '@/assets/font/index.css'
import '@/assets/scss/index.scss'

new VConsole({ theme: 'dark' })

const app = createApp(App)

app.use(router).use(pinia).mount('#app')
