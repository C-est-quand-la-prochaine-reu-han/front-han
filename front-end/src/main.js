import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();
console.log('Created pinia store')

app.use(pinia)
console.log('Used pinia store')
app.use(router)
app.mount('#app')
