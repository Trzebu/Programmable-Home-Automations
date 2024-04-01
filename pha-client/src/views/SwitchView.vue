<script setup lang="ts">
import { ref } from "vue";
import AppContainer from '@/components/AppContainer.vue';
import CreateNewSwitchModal from '@/components/CreateNewSwitchModal.vue';
import CardElement from '@/elements/CardElement.vue';
import { useSwitchStore, type Switch } from '@/stores/switch';
import { _t } from "@/translations/_t";
import LoadingComponent from "@/elements/LoadingComponent.vue";
import SwitchingElement from "@/elements/SwitchingElement.vue";

const swStore = useSwitchStore();
const switches = ref<Switch[]>();
const loading = ref(true);

(async () => {
    switches.value = await swStore.getSwitches();
    loading.value = false;
})();

</script>

<template>
    <AppContainer :title="_t('switch.manage_switches')">
        <CardElement>
            <template #header>{{ _t("switch.switches") }}</template>
            <LoadingComponent v-if="loading" />
            <table v-else>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>States</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sw in switches" :key="sw.name">
                        <td>{{ sw.name }}</td>
                        <td>
                            <SwitchingElement :sw="sw" />
                        </td>
                    </tr>   
                </tbody>
            </table>
            <template #footer>
                <CreateNewSwitchModal />
            </template>
        </CardElement>
    </AppContainer>
</template>

<style scoped>
@import "@/assets/table.css";

</style>