import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/main.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('AutoComplete', AutoComplete)

app.mount('#app')
