<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";

const components: Record<string, any> = Object.fromEntries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries((import.meta as any).glob('__PREVIEW_PATTERN__')).map(([path, component]) => {
    const name = path.split('/').slice(-1)[0].split('.')[0]
    return [name, component]
  }),
)
const previewNames = Object.keys(components)

type State = {
  selected: string | undefined
}

export default defineComponent({
  components,
  setup() {
    const state = reactive<State>({
      selected: undefined,
    })
    const handleClick = (name: string) => {
      state.selected = name
    }
    return { previewNames, state, handleClick }
  },
})
</script>

<template>
<div class="h-screen flex overflow-hidden bg-white text-gray-900">
  <div class="hidden md:flex md:flex-shrink-0 border-r border-gray-200">
    <div class="flex flex-col w-48">
      <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <h2 class="font-light text-xl">Vue Preview</h2>
        </div>
        <div class="mt-5 flex-1 flex flex-col">
          <nav class="flex-1 px-2 space-y-1">
            <a href="#" @click.prevent="handleClick(name)" v-for="name in previewNames" :key="name" class="hover:text-gray-900 group flex items-center px-2 py-2 text-base leading-tight rounded-md" :class="state.selected === name ? 'text-gray-900' : 'text-gray-500'">
              {{name}}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <main class="flex-1 relative overflow-y-auto focus:outline-none">
    <div class="py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 class="text-2xl text-gray-900">{{state.selected ? state.selected : 'Select Component...'}}</h1>
      </div>
      <div class="max-w-7xl mx-auto mt-4 px-4 sm:px-6 md:px-8">
        <div class="flex border-2 border-dashed border-gray-200 rounded-lg h-90vh">
          <iframe :src="`__preview_iframe.html?${state.selected ? state.selected : ''}`" frameborder="0" width="100%" height="100%"></iframe>
        </div>
      </div>
    </div>
  </main>
</div>
</template>
