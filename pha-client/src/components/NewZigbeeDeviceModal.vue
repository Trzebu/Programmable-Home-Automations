<script setup lang="ts">
import { ref } from "vue";
import ModalElement from "@/elements/ModalElement.vue"
import ButtonElement from "@/elements/ButtonElement.vue";
import InputGroup from "@/elements/InputGroup.vue";
import { _t } from "@/translations/_t";
import { useZigbeeStore, type SupportedDevice } from "@/stores/zigbee";
import InputSelectSearch from "@/elements/InputSelectSearch.vue";
import PTypography from "@/components/PTypography.vue";
import AlertBox from "@/elements/AlertBox.vue";

const zigbeeStore = useZigbeeStore();

const supportedDevicesList = ref<SupportedDevice[]>();
const loadingSupportedDevicesList = ref(true);
const isModalOpened = ref(false);
const errorMessage = ref("");
const processing = ref(false);
const success = ref(false);

const friendlyName = ref();
const mqttName = ref();
const selectedDevice = ref<{ manufacturer: string, model: string }>();

zigbeeStore.getSupportedDevicesList().then(list => {
    supportedDevicesList.value = list;
    loadingSupportedDevicesList.value = false;
});

const openModal = () => { isModalOpened.value = true; }
const closeModal = () => { isModalOpened.value = false; }
const handleAddDevice = async () => {
    processing.value = true;
    if (!selectedDevice.value) return;
    errorMessage.value = await zigbeeStore.handleAddNewDevice(
        friendlyName.value as string, mqttName.value as string, selectedDevice.value
    );
    if (errorMessage.value.length === 0) {
        success.value = true;
        closeModal();
    }
    processing.value = false;
}

</script>

<template>
    <AlertBox v-if="success" :text="_t('zigbee.device_add_success', [['name', mqttName]])" type="success" />
    <ButtonElement :text="_t('add_new_device')" type="primary" :onClick="openModal" />
    <ModalElement
        :title="_t('zigbee.add_new_zigbee_device')" 
        :isOpen="isModalOpened"
        @modal-close="closeModal"
    >
        <InputGroup name="friendly_name" :label="_t('zigbee.friendly_name')" v-model="friendlyName"/>
        <InputGroup name="mqtt_name" :label="_t('zigbee.mqtt_name')" v-model="mqttName"/>
        <InputSelectSearch 
            name="device_select" 
            v-model:value="selectedDevice"
            :label="_t('zigbee.select_device')" 
            :options="supportedDevicesList ? supportedDevicesList.map(device => {
            return {
                label: `${device.manufacturer} ${device.model}`,
                value: { 
                    manufacturer: device.manufacturer,
                    model: device.model
                }
            }
        }) : []"/>
        <PTypography :text="errorMessage" type="danger" />
        <div class="footer">
            <ButtonElement :text="_t('cancel')" type="danger" :onClick="closeModal" />
            <ButtonElement :text="_t('add')" type="success" :onClick="handleAddDevice" :disabled="processing"/>
        </div>
    </ModalElement>
</template>

<style scoped>
.footer {
    display: flex;
    justify-content: right;
    margin-top: 10px;
}

button {
    margin-left: 10px;
}
</style>