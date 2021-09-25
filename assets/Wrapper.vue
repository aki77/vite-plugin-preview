<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const components: Record<string, any> = Object.fromEntries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries((import.meta as any).glob('__PREVIEW_PATTERN__')).map(([path, component]) => {
    const name = path.split('/').slice(-1)[0].split('.')[0]
    return [name, component]
  }),
)

export default defineComponent({
  components,
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
})
</script>

<template>
  <Component :is="selected"></Component>
</template>
