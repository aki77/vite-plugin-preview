import Vue from 'vue';

export const render = async (components: Record<string, any>, wrapperComponent?: any) => {
  const Wrapper = wrapperComponent ?? 'div'
  const selected = window.location.search.substring(1)
  const Component = (await components[selected]()).default

  const app = new Vue({
    name: 'VWrapper',
    render(h) {
      return h(Wrapper, {}, [h(Component)])
    },
  })
  app.$mount('#app')
}
