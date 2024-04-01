<script setup lang="ts">
import AppLogo from './AppLogo.vue';

</script>

<template>
    <div class="top-bar">
        <AppLogo />
        <slot />
    </div>
</template>

<style scoped>

.top-bar { 
    grid-area: top-bar;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #232323;
}

</style>