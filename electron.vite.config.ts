import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },

  renderer: {
    resolve: {
      // alias: [
      //   {
      //     find: '@/',
      //     replacement: resolve(__dirname, '/src/renderer/src/')
      //   }
      // ]
      alias: {
        // '@renderer/': resolve('src/renderer/src/')
        // '@/': resolve('/src/renderer/src'),
        // 'custom/': resolve('/src/renderer/src/hooks/custom'),
        // 'components/': resolve('/src/renderer/src/components'),
        // 'reducers/': resolve('/src/renderer/src/store/reducers')
      }
    },
    plugins: [react()]
  }
})
