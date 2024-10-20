import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import AddFriendsComponent from '@/components/profile/AddFriendsComponent.vue';

const app = createApp(App)
app.component("AddFriendsComponent", AddFriendsComponent);
const pinia = createPinia();

app.use(pinia)
app.use(router)
app.mount('#app')
