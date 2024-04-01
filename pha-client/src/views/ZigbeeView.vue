<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import CardElement from '@/elements/CardElement.vue';
import LinkqualityToAntennaBars from '@/components/LinkqualityToAntennaBars.vue';
import NewZigbeeDeviceModal from '@/components/NewZigbeeDeviceModal.vue';
import LoadingComponent from '@/elements/LoadingComponent.vue';
import { useZigbeeStore, type Device } from '@/stores/zigbee';
import { _t } from '@/translations/_t';
import { ref } from 'vue';
import {
    IconAntennaBars5,
    IconBatteryAutomotive,
    IconPlug,
    IconEdit,
    IconTrash

} from "@tabler/icons-vue";
import BatteryLvlToBars from '@/components/BatteryLvlToBars.vue';
import { serverTimeDiffForHuman } from '@/utils/ServerTimeDiffForHuman';

const zigbeeStore = useZigbeeStore();
const devices = ref<Device[]>();
const loading = ref(false);

(async () => {
    loading.value = true;
    devices.value = await zigbeeStore.getAddedDevices();
    loading.value = false;
})();

</script>

<template>
    <AppContainer :title="_t('zigbee.devices_managment')">
        <CardElement>
            <template #header>
                All zigbee devices 
            </template>
            <LoadingComponent v-if="loading" />
            <table v-else>
                <colgroup></colgroup>
                <thead>
                    <tr>
                        <th style="width: 25%">Name</th>
                        <th style="width: 25%">Model</th>
                        <th style="width: 25%">Last seen</th>
                        <th style="width: 2%" :title="_t('zigbee.linkquality')">
                            <IconAntennaBars5 />
                        </th>
                        <th style="width: 2%">
                            <IconBatteryAutomotive />
                        </th>
                        <th style="width: 2%">
                            <IconEdit />
                        </th>
                        <th style="width: 2%">
                            <IconTrash />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="device in devices" :key="device.name">
                        <td>{{ device.name }}</td>
                        <td>{{ device.manufacturer }} {{ device.model }}</td>
                        <td>{{ device.last_seen === 0 ? 'offline' : serverTimeDiffForHuman(device.last_seen) }}</td>
                        <td :title="String(device.linkquality)">
                            <LinkqualityToAntennaBars :linkquality="device.linkquality" />
                        </td>
                        <td :title="
                            device.wireless ? 
                                _t('zigbee.voltage_and_battery_percent', [
                                    ['voltage', device.voltage], ['battery_percent', device.battery]
                                ]) 
                            : ''
                        ">
                            <BatteryLvlToBars v-if="device.wireless" :battery="device.battery" />
                            <IconPlug v-else />
                        </td>
                        <td>
                            <IconEdit />
                        </td>
                        <td>
                            <IconTrash />
                        </td>
                    </tr>
                </tbody>
            </table>
            <template #footer>
                <NewZigbeeDeviceModal />
            </template>
        </CardElement>
    </AppContainer>
</template>

<style scoped>
@import '@/assets/table.css';
</style>