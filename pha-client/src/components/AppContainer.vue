<script setup lang="ts">
import NavMenu from "@/components/NavMenu.vue";
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import TopBar from "./TopBar.vue";
import { SERVER } from '@/utils/constants';

const props = defineProps<{
    title: string
}>();
const user = useAuthStore();
const { isLogged } = storeToRefs(user);

</script>

<template>
    <div v-if="isLogged" class="container">
        <div class="main">
            <slot />
        </div>
        <TopBar>
            <div class="title">
                {{ props.title }}
            </div>
            <div class="user-icon">
                <img :src="SERVER.HOST + SERVER.IMAGES_PATH + '/rias.jpg'" />
            </div>
        </TopBar>
        <div class="nav-bar">
            <NavMenu />
        </div>
    </div>
    <div id="notifications"></div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: grid; 
    grid-template-columns: 0.4fr 1.4fr 1fr; 
    grid-template-rows: 0.2fr 0.9fr 1.9fr; 
    gap: 0px 0px; 
    grid-template-areas: 
        "top-bar top-bar top-bar"
        "nav-bar main main"
        "nav-bar main main";
    background-color: #121212;
    color: white;
}
.main { 
    grid-area: main;
}
.nav-bar { 
    grid-area: nav-bar; 
    background-color: #232323;
}

.user-icon:hover {
    cursor: pointer;
}

.user-icon > img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid black;
}

.title {
    font-weight: bold;
    font-size: 20px;
}

#notifications {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 10px;
}
</style>