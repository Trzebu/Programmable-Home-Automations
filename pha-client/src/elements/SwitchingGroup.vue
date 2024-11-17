<script setup lang="ts">
import type { Switch } from '@/stores/switch';
import SwitchingElement from './SwitchingElement.vue';


const props = defineProps<{
    label: string,
    switch: Switch
}>();

</script>

<template>
    <div class="group">
        <span>{{ props.label }}</span>
        <div class="sw">
            <SwitchingElement :sw="props.switch" />
        </div>
    </div>
</template>

<style scoped>
.group {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px;
    align-items: center;
}

.group > span {
    width: 30%;
    user-select: none;
}

.group > .sw {
    width: 70%;
    display: flex;
    justify-content: flex-end;
}

</style>