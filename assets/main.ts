import Vue from "vue";
import VueCompositionAPI, { createApp } from '@vue/composition-api'
import App from '__PREVIEW_App.vue'

import '__PREVIEW_windi.css'

Vue.use(VueCompositionAPI)

createApp(App).mount('#app')
