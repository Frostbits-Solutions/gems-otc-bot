import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/gems-otc-bot/',
  plugins: [vue(), vueJsx(), vueDevTools(), ui()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Ensure assets are properly referenced
    assetsDir: 'assets',
  },
})
