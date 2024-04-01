<script setup lang="ts">
import { ref } from "vue";
import type { SwElement } from "@/stores/switch";
import { type Switch } from "@/stores/switch";
import { request } from "@/utils/request";
import { _t } from "@/translations/_t";
import NotificationElement from "./NotificationElement.vue";

const props = defineProps<{
    sw: Switch
}>();
const state = ref(props.sw.state);
const loading = ref(false);
const error = ref("");

const handleSwitchState = async (sw: SwElement) => {
    if (loading.value) return;
    if (sw.state === state.value.state) return;

    loading.value = true;
    state.value = sw;
    const res = await request<{
        error?: string
    }>(`/switch/${props.sw.name}/${sw.state}`, "POST");
    if (res.error)
        error.value = _t(res.error);
    loading.value = false;
}

</script>

<template>
    <NotificationElement v-if="error !== ''" :text="error" type="error"/>
    <div class="container">
        <div 
            v-for="sw in props.sw.sw_elements" 
            :class="`switch ${state.state === sw.state ? 'active' : ''} ${loading ? 'disabled' : ''}`" 
            :key="sw.state"
            @click="handleSwitchState(sw)"
        >
            {{ sw.state }}
        </div>
    </div>
</template>

<style scoped>
.container {
    display: inline-flex;
    flex-direction: row;
    border: 1px solid black;
    border-radius: 5px;
    color: silver;
}

.switch {
    padding: 10px;
    user-select: none;
}

.switch:not(.active):hover {
    cursor: pointer;
    background-color: #414141;
}

.active {
    color: white;
    background-color: rgba(255, 255, 255, 0.12);
}

.disabled { cursor: not-allowed;}

</style>