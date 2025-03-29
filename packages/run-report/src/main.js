import 'core-js/stable/symbol'
import 'core-js/stable/promise'
import { createApp } from 'vue'

import App from './App.vue'

import pinia from './store'
import router from '@/router'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'normalize.css/normalize.css'
import 'vant/es/image-preview/style'

import '@/assets/font/index.css'
import '@/assets/scss/index.scss'

const app = createApp(App)

app.use(router).use(pinia).mount('#app')
