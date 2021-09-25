import App from '@aki77/vite-plugin-preview/dist/App.es.js'

import '@aki77/vite-plugin-preview/assets/windi.css'

const components: Record<string, any> = Object.fromEntries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries((import.meta as any).glob('__PREVIEW_PATTERN__')).map(([path, component]) => {
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
