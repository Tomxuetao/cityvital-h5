import 'core-js/stable/symbol'
import 'core-js/stable/promise'
import { createApp } from 'vue'
import App from './App.vue'

import pinia from './store'
import router from './router'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import 'normalize.css/normalize.css'

import './assets/font/index.css'
import './assets/scss/index.scss'

import components from '@/views/common'

const app = createApp(App)

app.use(components).use(router).use(pinia).mount('#app')
