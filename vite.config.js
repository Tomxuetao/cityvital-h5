import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import { visualizer } from 'rollup-plugin-visualizer'
import ViteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  base: '/vital-h5',
  server: {
    open: false,
    host: true,
    proxy: {
      // 数字城管图片
      '/szcg': {
        secure: false,
        changOrigin: true,
        target: 'http://172.18.16.15'
      },
      // 三中心服务
      '/oauth2': {
        secure: false,
        changOrigin: true,
        target: 'http://10.54.38.116'
      },
      // 第三方图片
      '/taiyuan_rongliangfugai': {
        secure: false,
        changOrigin: true,
        target: 'http://10.54.38.113:8991/'
      },
      // 水设施河道下的设施图片
      '/water-img': {
        secure: false,
        changeOrigin: true,
        target: 'https://ywtg.citybrain.hangzhou.gov.cn',
        rewrite: (path) => path.replace(/^\/water-img/, '')
      },
      '/szys_img1': {
        target: 'http://www.szys.ren:30065/',
        rewrite: (path) => path.replace(/^\/szys_img1/, ''),
        changOrigin: true
      },
      
      '/szys_img2': {
        target: 'https://www.szys.ren/',
        rewrite: (path) => path.replace(/^\/szys_img2/, ''),
        changOrigin: true
      },
      
      '/szys_img3': {
        target: 'http://183.134.200.102:8080/',
        rewrite: (path) => path.replace(/^\/szys_img3/, ''),
        changOrigin: true
      },
      '/szys_pdf1': {
        target: 'https://ywtg.citybrain.hangzhou.gov.cn/',
        changOrigin: true
      },
      // 后端服务
      '/back-server': {
        secure: false,
        changeOrigin: true,
        target: 'https://ywtg.citybrain.hangzhou.gov.cn',
        rewrite: (path) => path.replace(/^\/back-server/, '')
      },
      // 指标平台服务
      '/gateway-server': {
        secure: false,
        changeOrigin: true,
        target: 'https://ywtg.citybrain.hangzhou.gov.cn',
        rewrite: (path) => path.replace(/^\/gateway-server/, '')
      }
    }
  },
  plugins: [
    vue(),
    legacy({
      targets: ['chrome 58', 'not IE 11']
    }),
    visualizer({
      open: true,
      gzipSize: true
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    ViteCompression({
      algorithm: 'gzip',
      filter: /\.(js|mjs|json|css)$/i,
      deleteOriginFile: false
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/scss/_mixins.scss" as *;'
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    targets: 'modules',
    outDir: 'dist',
    assetsInlineLimit: 2048,
    cssCodeSplit: true
  }
})
