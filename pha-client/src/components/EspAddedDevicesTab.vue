<script setup lang="ts">
import { ref } from "vue";
import { _t } from '@/translations/_t';
import LoadingComponent from "@/elements/LoadingComponent.vue";
import CardElement from '@/elements/CardElement.vue';
import { usePhaespStore, type Device } from "@/stores/phaesp";
import { useRouter } from "vue-router";

const router = useRouter();
const phaEspStore = usePhaespStore();
const devices = ref<Device[]>([]);
const loading = ref(false);

(async () => {
    loading.value = true;
    devices.value = await phaEspStore.getAddedDevices();
    loading.value = false;
})()
</script>

<template>
    <CardElement>
        <LoadingComponent v-if="loading" />
        <table v-else>
            <colgroup></colgroup>
            <thead>
                <tr>
                    <th>{{ _t("entity_name") }}</th>
                    <th>{{ _t("ip_address") }}</th>
                    <th>{{ _t("firmware_version") }}</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    :style="{cursor: 'pointer'}" 
                    v-for="device in devices" :key="device.name" 
                    @click="() => {
                        router.push('/phaesp/' + device.name);
                    }
                ">
                    <td>{{ device.name }}</td>
                    <td>{{ device.ip_address }}</td>
                    <td>{{ device.firmware_version }}</td>
                </tr>
            </tbody>
        </table>
    </CardElement>
</template>

<style scoped>
@import '@/assets/table.css';
</style>