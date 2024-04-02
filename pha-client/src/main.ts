import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { request } from './utils/request'
import type { AddonView } from './stores/addon'
import { translations } from './translations/_t'

(async () => {
    await translations.load();
    const app = createApp(App)
    const addonsViews = await request<AddonView[]>("/addon/enabled/views", "GET");

    addonsViews.forEach(view => {
        router.addRoute({
            path: view.path,
            name: view.path,
            component: () => import("./addons" + view.view)
        })
    })
        
    app.use(createPinia())
    app.use(router)

    app.mount('#app')
})()
