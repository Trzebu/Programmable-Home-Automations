<script setup lang="ts">
import { ref } from "vue";
import { _t } from '@/translations/_t';
import { usePhaespStore } from "@/stores/phaesp";
import LoadingComponent from "@/elements/LoadingComponent.vue";
import CardElement from '@/elements/CardElement.vue';
import AddPhaEspDeviceModal from '@/components/AddPhaEspDeviceModal.vue';
import ButtonElement from "@/elements/ButtonElement.vue";

const phaEspStore = usePhaespStore();
const unaddedDevices = ref<{
    ip: string,
    firmware_version: string
}[]>([]);
const loading = ref(false);

const refresh = async () => {
    loading.value = true;
    unaddedDevices.value = await phaEspStore.getUnaddedDevices();
    loading.value = false;
};

refresh();
</script>

<template>
    <CardElement>
        <template #header>{{ _t("devices_found") }}</template>
        <LoadingComponent v-if="loading" :info="_t('pha_esp.scanning_lan')" />
        <table v-else>
            <colgroup></colgroup>
            <thead>
                <tr>
                    <th>{{ _t("ip_address") }}</th>
                    <th>{{ _t("firmware_version") }}</th>
                    <th>{{ _t("add") }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="device in unaddedDevices" :key="device.ip">
                    <td>{{ device.ip }}</td>
                    <td>{{ device.firmware_version }}</td>
                    <td>
                        <AddPhaEspDeviceModal :ip="device.ip" />
                    </td>
                </tr>
            </tbody>
        </table>
        <template #footer>
            <ButtonElement :text="_t('refresh')" type="primary" :onClick="refresh" :disabled="loading"/>
        </template>
    </CardElement>
    <CardElement>
        <template #header>{{ _t("pha_esp.add_device_manual") }}</template>
    </CardElement>
</template>

<style scoped>
@import '@/assets/table.css';
</style>