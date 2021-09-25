import Vue from "vue";
import VueCompositionAPI, { createApp } from '@vue/composition-api'
import Wrapper from '__PREVIEW_FW_wrapper.vue'

Vue.use(VueCompositionAPI)

const selected = window.location.search.substring(1)
if (selected.length > 0) {
  createApp(Wrapper, { selected }).mount('#app')
}
