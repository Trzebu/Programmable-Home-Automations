<script setup lang="ts">
import { ref } from "vue";
import { _t } from "@/translations/_t";
import ButtonElement from "@/elements/ButtonElement.vue";
import ModalElement from "@/elements/ModalElement.vue";
import { usePhaespStore, type Device } from "@/stores/phaesp";
import InputGroup from "@/elements/InputGroup.vue";
import PTypography from "./PTypography.vue";
import InputSelectSearch from "@/elements/InputSelectSearch.vue";
import NotificationElement from "@/elements/NotificationElement.vue";

const props = defineProps<{
    esp_name: string
}>();
const espStore = usePhaespStore();
const isModalOpened = ref(false);
const processing = ref(false);
const relayName = ref("");
const gpio = ref();
const addingErrors = ref();
const device = ref<Device>();
const relayAdded = ref(false);

const openModal = () => { isModalOpened.value = true; }
const closeModal = () => { isModalOpened.value = false; }
const handleAddDevice = async () => {
    if (!device.value) return;
    gpio.value = parseInt(gpio.value);
    if (!device.value.unused_gpio.includes(gpio.value)) {
        addingErrors.value = _t("pha_esp.gpio_error");
        return;
    }
    processing.value = true;
    addingErrors.value = await espStore.addNewRelay(relayName.value, gpio.value, props.esp_name);
    if (addingErrors.value === "") {
        relayAdded.value = true;
        closeModal();
    }
    processing.value = false;
}

(async () => {
    processing.value = true;
    device.value = await espStore.getDevice(props.esp_name);
    processing.value = false;
})();

</script>

<template>
    <NotificationElement v-if="relayAdded" :text="_t('pha_esp.new_relay_adding_success', [['name', relayName]])" type="success"/>
    <ButtonElement :text="_t('add')" type="primary" :onClick="openModal" />
    <ModalElement
        :title="_t('pha_esp.add_new_relay')" 
        :isOpen="isModalOpened"
        @modal-close="closeModal"
    >
        <InputGroup name="relay_name" :label="_t('pha_esp.relay_name')" v-model="relayName" />
        <InputSelectSearch :label="_t('pha_esp.select_gpio')" name="gpio_pin" v-model:value="gpio" :options="device ? device.unused_gpio.map(gpio => {
            return { label: gpio.toString(), value: gpio }
        }) : []"/>
        <PTypography v-if="addingErrors" :text="addingErrors" type="danger" />
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