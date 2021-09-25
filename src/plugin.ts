import type { Plugin } from "vite";
import path from 'path'
import { readFile } from "fs/promises";

const ASSETS_PREFIX = '__PREVIEW_'

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
  const renderContent = `
${config.head ? `import '${config.head}'` : ''}
${config.wrapper ? `import Wrapper from '${config.wrapper}'` : ''}
import { render } from '@aki77/vite-plugin-preview/renderers/${config.framework}'

const components: Record<string, any> = Object.fromEntries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      if (normalizedId.startsWith(ASSETS_PREFIX) && !normalizedId.includes('?')) {
        return normalizedId
      }
    },
    async load(id) {
      if (!id.startsWith(ASSETS_PREFIX) || id.includes('?')) return

      if (id === '__PREVIEW_RENDER.ts') {
        return renderContent
      }

      const filename = id.replace(ASSETS_PREFIX, '')
      const code = await readAssetsCode(filename)
      return code.replace('__PREVIEW_PATTERN__', config.pattern)
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
