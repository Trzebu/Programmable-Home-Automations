import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ZigbeeView from '@/views/ZigbeeView.vue'
import PhaespView from '@/views/PhaespView.vue'
import EspEntityView from '@/views/EspEntityView.vue'
import SwitchView from '@/views/SwitchView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        component: HomeView
    }, {
        path: '/login',
        name: 'login',
        component: LoginView
    }, {
        path: '/zigbee',
        name: 'zigbee',
        component: ZigbeeView 
    }, {
        path: '/phaesp',
        name: 'phaesp',
        component: PhaespView 
    }, {
        path: '/phaesp/:entity_name',
        name: 'esp_view_entity',
        component: EspEntityView 
    }, {
        path: '/switch',
        name: 'view_switches',
        component: SwitchView 
    }]
})

export default router
