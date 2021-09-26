# vite-plugin-preview

![demo](https://i.gyazo.com/c19f905288bde120e192b137a4768747.png)

## Usage

`vite.config.ts`

```typescript
import { PreviewPlugin } from '@aki77/vite-plugin-preview'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [
    PreviewPlugin({
      pattern: './src/**/*.preview.vue',
      head: 'src/preview',
    }),
    createVuePlugin(),
  ],
})
```

`src/preview.ts`

```typescript
import 'src/stylesheets/preview.css'
```
