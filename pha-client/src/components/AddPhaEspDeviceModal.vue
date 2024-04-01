<script setup lang="ts">
import { ref } from "vue";
import { _t } from "@/translations/_t";
import ButtonElement from "@/elements/ButtonElement.vue";
import ModalElement from "@/elements/ModalElement.vue";
import { usePhaespStore } from "@/stores/phaesp";
import InputGroup from "@/elements/InputGroup.vue";
import PTypography from "./PTypography.vue";

const props = defineProps<{
    ip: string
}>();
const phaEspStore = usePhaespStore();
const isModalOpened = ref(false);
const processing = ref(false);
const isDeviceCompatible = ref(false);
const entityName = ref();
const addingErrors = ref();

const openModal = () => { isModalOpened.value = true; }
const closeModal = () => { isModalOpened.value = false; }
const handleAddDevice = async () => {
    processing.value = true;
    addingErrors.value = await phaEspStore.addNewDevice(props.ip, entityName.value);
    processing.value = false;
}

(async () => {
    processing.value = true;
    isDeviceCompatible.value = await phaEspStore.isDeviceCompatible(props.ip);
    processing.value = false;
})();

</script>

<template>
    <ButtonElement :text="_t('add')" type="primary" :onClick="openModal" />
    <ModalElement
        :title="_t('add_new_device')" 
        :isOpen="isModalOpened"
        @modal-close="closeModal"
    >
        <PTypography :text="_t('ip_address') + ': ' + props.ip" type="primary"/>
        <PTypography v-if="!isDeviceCompatible" :text="_t('pha_esp.device_is_incompatible')" type="danger" />
        <InputGroup v-if="isDeviceCompatible" name="entity_name" :label="_t('entity_name')" v-model="entityName"/>
        <PTypography v-if="addingErrors" :text="addingErrors" type="danger" />
        <PTypography v-if="addingErrors === ''" :text="_t('device_add_success', [['name', entityName]])" type="success" />
        <div class="footer" v-if="isDeviceCompatible">
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