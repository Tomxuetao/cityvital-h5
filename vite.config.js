import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import { visualizer } from 'rollup-plugin-visualizer'
import ViteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  base: '/city-vital',
  server: {
    open: false,
    host: true,
    proxy: {
      // 水设施河道下的设施图片
      '/water-img': {
        secure: false,
        changeOrigin: true,
        target: 'https://ywtg.citybrain.hangzhou.gov.cn/cv_res/img/zscqj',
        rewrite: (path) => path.replace(/^\/water-img/, '')
      },
      '/oauth-server': {
        secure: false,
        changOrigin: true,
        target: 'http://10.54.38.116',
        rewrite: (path) => path.replace(/^\/oauth-server/, '')
      },
      '/back-server': {
        secure: false,
        changeOrigin: true,
        target: 'https://ywtg.citybrain.hangzhou.gov.cn',
        rewrite: (path) => path.replace(/^\/back-server/, '')
      },
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
