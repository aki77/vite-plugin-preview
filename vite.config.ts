import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/App.svelte',
      name: 'App',
      fileName: (format) => `App.${format}.js`
    }
  },
  plugins: [svelte({
    preprocess: preprocess(),
  })]
})
