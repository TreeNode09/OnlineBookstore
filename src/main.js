import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios  from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import mainButton from '@/components/mainButton.vue'
import plainButton from '@/components/plainButton.vue'

axios.defaults.baseURL = 'http://localhost:8001'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.component('main-button', mainButton)
    .component('plain-button', plainButton)

app.mount('#app')
