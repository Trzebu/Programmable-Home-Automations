<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useAddonStore, type Addon } from './stores/addon';
import { ref } from 'vue';
import { _t, translations } from "@/translations/_t";

const router = useRouter();
const user = useAuthStore();
const addonStore = useAddonStore();

const addons = ref<Addon[]>();
const loading = ref(true);

(async () => {
    addons.value = await addonStore.getEnabledAddons();
    addons.value.forEach(async addon => {
        await translations.loadAddonTranslation(addon);
    })
    const res = await user.get();

    if (!res)
        router.push("/login");
    loading.value = false;
})();

</script>

<template>
    <div v-if="loading" class="base-loader">
        {{ _t("base_loading") }}
    </div>
    <RouterView v-else />
</template>

<style scoped>
.base-loader {
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #121212;
    font-size: 50px;
}

</style>