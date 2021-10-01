import type { Plugin } from "vite";
import path from 'path'
import { readFile } from "fs/promises";

const PREVIEW_PREFIX = '__PREVIEW_'

type PreviewPluginConfig = {
  pattern: string
  wrapper?: string
  head?: string
  framework: 'vue2' | 'react'
}

const readAssetsCode = async (filename: string) => {
  const code = await readFile(path.resolve(__dirname, `../assets/${filename}`))
  return code.toString()
}

export const PreviewPlugin = (config: PreviewPluginConfig): Plugin => {
  const mainContent = `
import App from '@aki77/vite-plugin-preview/dist/App.es.js'

import '@aki77/vite-plugin-preview/assets/windi.css'

const components: Record<string, any> = Object.fromEntries(
  Object.entries((import.meta as any).glob('${config.pattern}')).map(([path, component]) => {
    const name = path.split('/').slice(-1)[0].split('.')[0]
    return [name, component]
  }),
)

const app = new App({
  target: document.getElementById('app'),
  props: {
    componentNames: Object.keys(components),
  }
})
`

  const renderContent = `
${config.head ? `import '${config.head}'` : ''}
${config.wrapper ? `import Wrapper from '${config.wrapper}'` : ''}
import { render } from '@aki77/vite-plugin-preview/renderers/${config.framework}'

const components: Record<string, any> = Object.fromEntries(
  Object.entries((import.meta as any).glob('${config.pattern}')).map(([path, component]) => {
    const name = path.split('/').slice(-1)[0].split('.')[0]
    return [name, component]
  }),
)

render(components, ${config.wrapper ? 'Wrapper' : undefined})
`

  return {
    name: 'vite-plugin-preview',
    apply: 'serve',
    resolveId(id) {
      const normalizedId = id.replace(/^\//, '')
      if (normalizedId.startsWith(PREVIEW_PREFIX) && !normalizedId.includes('?')) {
        return normalizedId
      }
    },
    async load(id) {
      if (!id.startsWith(PREVIEW_PREFIX) || id.includes('?')) return

      if (id === '__PREVIEW_MAIN.ts') {
        return mainContent
      }

      if (id === '__PREVIEW_RENDER.ts') {
        return renderContent
      }

      const filename = id.replace(PREVIEW_PREFIX, '')
      return await readAssetsCode(filename)
    },
    async configureServer(server) {
      server.middlewares.use('/__preview', async (req, res, next) => {
        try {
          res.write(await readAssetsCode('index.html'))
          res.end()
        } catch (error) {
          return next(error)
        }
      })
      server.middlewares.use('/__preview_iframe', async (req, res, next) => {
        try {
          const code = await readAssetsCode('iframe.html')
          const html = await server.transformIndexHtml(req.url!, code)
          res.write(html)
          res.end()
        } catch (error) {
          return next(error)
        }
      })
    }
  }
}
