# vite-plugin-preview

![demo](https://i.gyazo.com/c19f905288bde120e192b137a4768747.png)

## Installation

```
yarn add -D @aki77/vite-plugin-preview
```

```typescript
// vite.config.ts
import { PreviewPlugin } from '@aki77/vite-plugin-preview'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [PreviewPlugin(/*options*/)],
})
```

## Usage

```
yarn vite --open /__preview
```

## Options Examples

### Chakra UI + Next.js

```typescript
// vite.config.ts
import path from 'path'
import { PreviewPlugin } from '@aki77/vite-plugin-preview'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
    ],
  },
  define: {
    'process.env': {},
  },
  plugins: [
    PreviewPlugin({
      pattern: './src/**/*.preview.tsx',
      wrapper: path.resolve(__dirname, '__preview__/Wrapper.tsx'),
      framework: 'react',
    }),
  ],
})
```

```typescript
// __preview__/Wrapper.tsx
import { Center, ChakraProvider } from '@chakra-ui/react'
import React, { ReactNode, VFC } from 'react'
import { chakraTheme } from '../src/chakraTheme'

type WrapperProps = {
  children: ReactNode
}

const Wrapper: VFC<WrapperProps> = ({ children }) => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <Center p="4">
        {children}
      </Center>
    </ChakraProvider>
  )
}

export default Wrapper
```

### Vue2

```typescript
//vite.config.ts
import path from 'path'
import { PreviewPlugin } from '@aki77/vite-plugin-preview'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
    ],
  },
  plugins: [
    PreviewPlugin({
      pattern: './src/**/*.preview.vue',
      head: '@/previews/head',
      wrapper: '@/previews/Wrapper.vue',
      framework: 'vue2',
    }),
    createVuePlugin(),
  ],
})
```

```typescript
// src/previews/head.ts
import VueCompositionApi from '@vue/composition-api'
import Vue from 'vue'

import '@/stylesheets/main.scss'

Vue.use(VueCompositionApi)
```

```vue
// src/previews/Wrapper.vue
<template>
  <div class="p-4">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
```
