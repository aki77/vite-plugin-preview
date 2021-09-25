import type { Plugin } from "vite";
import path from 'path'
import { readFile } from "fs/promises";

const ASSETS_PREFIX = '__PREVIEW_'
const FW_PREFIX = 'FW_'

type PreviewPluginConfig = {
  pattern: string
  head?: string
  framework: 'vue' | 'react'
}

const readAssetsCode = async (filename: string) => {
  const code = await readFile(path.resolve(__dirname, `../assets/${filename}`))
  return code.toString()
}

export const PreviewPlugin = (config: PreviewPluginConfig): Plugin => {
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

      const filename = id.replace(ASSETS_PREFIX, '').replace(FW_PREFIX, `${config.framework}/`)
      const code = await readAssetsCode(filename)

      if (id === '__PREVIEW_FW_component.ts') {
        const headImport = config.head ? `import '${config.head}';` : ''
        return [headImport, code].join("\n")
      }

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
