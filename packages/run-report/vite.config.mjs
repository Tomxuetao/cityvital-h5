import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import AutoImport from 'unplugin-auto-import/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import ViteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  base: '/report-h5',
  server: {
    open: false,
    host: true,
    proxy: {
      '/city-vital': {
        secure: false,
        changOrigin: true,
        target: 'http://10.54.38.116'
      },
      '/cv_data': {
        secure: false,
        changOrigin: true,
        target: 'https://ywtg.citybrain.hangzhou.gov.cn'
      },
      '/back-server': {
        secure: false,
        changeOrigin: true,
        target: 'https://ywtg.citybrain.hangzhou.gov.cn',
        rewrite: (path) => path.replace(/^\/back-server/, '')
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
    AutoImport({
      dts: true,
      imports: ['vue', 'vue-router'],
      resolvers: [VantResolver()],
      eslintrc: {
        enabled: true,
        globalsPropValue: true,
        filepath: '../../auto-import.json'
      },
      dirs: ['./src/views/common/**']
    }),
    Components({
      dts: true,
      deep: true,
      extensions: ['vue'],
      dirs: ['src/views/common/**'],
      resolvers: [VantResolver()],
      include: [/\.vue$/, /\.vue\?vue/]
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
