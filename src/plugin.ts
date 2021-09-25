import type { Plugin } from "vite";
import path from 'path'
import { readFile } from "fs/promises";

const ASSETS_PREFIX = '__PREVIEW_'

type PreviewPluginConfig = {
  pattern: string
  head?: string
}

const readAssetsCode = async (filename: string) => {
  const code = await readFile(path.resolve(__dirname, `../assets/${filename}`))
  return code.toString()
}

export const PreviewPlugin = (config: PreviewPluginConfig): Plugin => {
  const PREVIEW_CONTENT = `
import Vue from "vue";
import VueCompositionAPI, { createApp } from '@vue/composition-api'
import Wrapper from '__PREVIEW_wrapper.vue'
${config.head ? `import '${config.head}'` : ''}

Vue.use(VueCompositionAPI)

const selected = window.location.search.substring(1)
if (selected.length > 0) {
  createApp(Wrapper, { selected }).mount('#app')
}
`

  return {
    name: 'vite-plugin-vue2-preview',
    apply: 'serve',
    resolveId(id) {
      const normalizedId = id.replace(/^\//, '')
      if (normalizedId.startsWith(ASSETS_PREFIX) && !normalizedId.includes('?')) {
        return normalizedId
      }
    },
    async load(id) {
      if (id === '__PREVIEW_component.ts') {
        return PREVIEW_CONTENT
      }

      if (id.startsWith(ASSETS_PREFIX) && !id.includes('?')) {
        const filename = id.replace(ASSETS_PREFIX, '')
        const code = await readAssetsCode(filename)
        return id.endsWith('.vue') ? code.replace('__PREVIEW_PATTERN__', config.pattern) : code
      }
    },
    async configureServer(server) {
      server.middlewares.use('/__preview', async (req, res) => {
        res.write(await readAssetsCode('index.html'))
        res.end()
      })
      server.middlewares.use('/__preview_iframe', async (req, res) => {
        res.write(await readAssetsCode('iframe.html'))
        res.end()
      })
    }
  }
}
