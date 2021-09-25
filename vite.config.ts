import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { PreviewPlugin } from "./src/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  alias: [
    {
      find: '@/',
      replacement: '/Users/aki/src/github.com/SonicGarden/sonic/app/javascript/',
    },
  ],
  plugins: [
    PreviewPlugin({
      pattern: '../sonic/app/javascript/src/**/*.preview.vue'
    }),
    createVuePlugin()
  ]
})
