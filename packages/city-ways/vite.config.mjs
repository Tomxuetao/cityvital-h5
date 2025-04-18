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
  base: '/city-ways',
  server: {
    open: false,
    host: true,
    proxy: {
      '/venus-data': {
        secure: true,
        changeOrigin: true,
        target: 'https://tomxuetao.xyz'
      },
      '/venus-api': {
        secure: true,
        changeOrigin: true,
        target: 'http://localhost:8888',
        rewrite: (path) => path.replace(/^\/venus-api/, '')
      }
    }
  },
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    visualizer({
      open: true,
      gzipSize: true
    }),
    Components({
      dts: true,
      deep: true,
      extensions: ['vue'],
      dirs: ['src/views/common/**'],
      resolvers: [VantResolver()],
      include: [/\.vue$/, /\.vue\?vue/]
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
      dirs: ['src/views/common/**']
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
        additionalData: '@use "@/assets/scss/_mixins" as *;'
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
    outDir: 'city-ways',
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue'],
          'vue-router': ['vue-router']
        }
      }
    }
  }
})
