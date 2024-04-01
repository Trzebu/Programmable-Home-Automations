<script setup lang="ts">
import { ref } from "vue";
import { _t } from '@/translations/_t';
import LoadingComponent from "@/elements/LoadingComponent.vue";
import CardElement from '@/elements/CardElement.vue';
import { usePhaespStore, type Device } from "@/stores/phaesp";
import AppContainer from "@/components/AppContainer.vue";
import { useRoute } from 'vue-router';
import PTypography from "@/components/PTypography.vue";
import AddEspRelayModal from "@/components/AddEspRelayModal.vue";

const route = useRoute();
const entityName = route.params.entity_name as string;
const phaEspStore = usePhaespStore();
const device = ref<Device>();
const loading = ref(false);

(async () => {
    loading.value = true;
    device.value = await phaEspStore.getDevice(entityName.split(".")[2]);
    loading.value = false;
})()
</script>

<template>
    <AppContainer :title="_t('pha_esp.title')">
        <CardElement v-if="loading || !device">
            <LoadingComponent v-if="loading" />
            <PTypography v-else-if="!device" :text="_t('no_content')" type="danger" size="big" />
        </CardElement>
        <CardElement v-if="device">
            <template #header>{{ _t("relays") }}</template>
            <template #footer>
                <AddEspRelayModal :esp_name="device.esp_name" />
            </template>
        </CardElement>
    </AppContainer>
</template>

<style scoped>
@import '@/assets/table.css';
</style>