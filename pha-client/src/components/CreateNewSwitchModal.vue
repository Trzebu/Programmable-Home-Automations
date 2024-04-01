<script setup lang="ts">
import { ref } from "vue";
import ModalElement from "@/elements/ModalElement.vue"
import ButtonElement from "@/elements/ButtonElement.vue";
import InputGroup from "@/elements/InputGroup.vue";
import { _t } from "@/translations/_t";
import { useSwitchStore, type SwElement } from "@/stores/switch";
import InputSelectSearch from "@/elements/InputSelectSearch.vue";
import PTypography from "@/components/PTypography.vue";
import { request } from "@/utils/request";
import { IconTrash } from "@tabler/icons-vue";
import NotificationElement from "@/elements/NotificationElement.vue";

const isModalOpened = ref(false);
const processing = ref(false);
const loading = ref(true);
const switchCreateSuccess = ref(false);
const errorMessage = ref("");
const errorMessageState = ref("");
const entities = ref<string[]>([]);
const switchStore = useSwitchStore();
/**
 * inputs
 */
const entityName = ref();
const state = ref("");
const selectedEntity = ref("");
const states = ref<SwElement[]>([]);

const openModal = () => { isModalOpened.value = true; }
const closeModal = () => { isModalOpened.value = false; }
const handleCreateSwitch = async () => {
    processing.value = true;
    errorMessage.value = await switchStore.createNewSwitch(entityName.value, states.value);
    if (errorMessage.value === "") {
        switchCreateSuccess.value = true;
        closeModal();
    }
    processing.value = false;
}
const handleAddState = () => {
    errorMessageState.value = "";
    if (state.value.length === 0)
        return errorMessageState.value = _t("switch.state_name_too_short");
    for (const i in states.value) {
        if (states.value[i].state === state.value)
            return errorMessageState.value = _t("switch.state_already_added");
    }
    if (!entities.value.includes(selectedEntity.value))
        return errorMessageState.value = _t("switch.action_not_found");
    states.value.push({
        state: state.value,
        action: selectedEntity.value
    });
}
const handleRemoveState = (state: string) => {
    states.value.forEach((v, i, a) => {
        if (v.state === state)
            a.splice(i, 1);
    });
}
(async () => {
    entities.value = await request<string[]>("/event", "GET");
    entities.value.unshift("dummy");
    loading.value = false;
})()

</script>

<template>
    <NotificationElement v-if="switchCreateSuccess" :text="_t('switch.sw_create_success', [['name', entityName]])" type="success"  />
    <ButtonElement :text="_t('add')" type="primary" :onClick="openModal" />
    <ModalElement
        :title="_t('switch.create_new_switch')" 
        :isOpen="isModalOpened"
        @modal-close="closeModal"
    >
        <InputGroup name="entity_name" :label="_t('entity_name')" v-model="entityName"/>
        <PTypography v-if="errorMessage !== ''" :text="errorMessage" type="danger" />
        <PTypography :text="_t('switch.add_state')" type="text" weight="bold" :centered="true" />
        <InputGroup name="state" :label="_t('state')" v-model="state"/>
        <InputSelectSearch 
            name="action" 
            v-model:value="selectedEntity"
            :label="_t('switch.select_action')" 
            :options="entities ? entities.map(entity => {
                return {
                    label: entity,
                    value: entity
                }
        }) : []"/>
        <PTypography v-if="errorMessageState !== ''" :text="errorMessageState" type="danger" />
        <div class="footer">
            <ButtonElement :text="_t('switch.add_state')" type="primary" :onClick="handleAddState" :disabled="loading"/>
        </div>
        <PTypography :text="_t('switch.added_states')" type="text" weight="bold" :centered="true" />
        <PTypography v-if="states.length === 0" :text="_t('switch.no_states_added')" type="primary"/>
        <table v-else>
            <thead>
                <th>{{ _t("name") }}</th>
                <th>{{ _t("action") }}</th>
                <th><IconTrash /></th>
            </thead>
            <tbody>
                <tr v-for="state in states" :key="state.state">
                    <td>{{ state.state }}</td>
                    <td>{{ state.action }}</td>
                    <td class="click" :title="_t('delete')">
                        <IconTrash @click="() => handleRemoveState(state.state)" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="footer">
            <ButtonElement :text="_t('cancel')" type="danger" :onClick="closeModal" />
            <ButtonElement :text="_t('create')" type="success" :onClick="handleCreateSwitch" :disabled="processing"/>
        </div>
    </ModalElement>
</template>

<style scoped>
@import '@/assets/table.css';

.footer {
    display: flex;
    justify-content: right;
    margin-top: 10px;
}

button {
    margin-left: 10px;
}
</style>