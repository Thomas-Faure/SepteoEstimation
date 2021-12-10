import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

var appli =createApp(App);
appli.use(store).use(router).mount('#app')


appli.config.isCustomElement = tag => tag.startsWith('Compo')
