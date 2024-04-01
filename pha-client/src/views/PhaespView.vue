<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import PhaespUnaddedDevicesTab from '@/components/PhaespUnaddedDevicesTab.vue';
import EspAddedDevicesTab from '@/components/EspAddedDevicesTab.vue';
import ExtendedNav from "@/elements/ExtendedNav.vue";
import { _t } from '@/translations/_t';
import { ref } from 'vue';

const selectedCard = ref<"added" | "unadded">();
</script>

<template>
    <AppContainer :title="_t('pha_esp.title')">
        <ExtendedNav v-model="selectedCard" :items="[{
            label: _t('added_devices'),
            name: 'added'
        }, {
            label: _t('unadded_devices'),
            name: 'unadded'
        }]" />
        <PhaespUnaddedDevicesTab v-if="selectedCard === 'unadded'" />
        <EspAddedDevicesTab v-else />
    </AppContainer>
</template>