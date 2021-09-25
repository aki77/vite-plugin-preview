# vite-plugin-vue2-preview

## Usage

`vite.config.ts`

```typescript
import { PreviewPlugin } from '@aki77/vite-plugin-vue2-preview'
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
