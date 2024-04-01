<script setup lang="ts">
import {
    IconBattery,
    IconBattery1,
    IconBattery2,
    IconBattery3,
    IconBattery4
} from "@tabler/icons-vue";

const props = defineProps<{
    battery: number
}>();

</script>

<template>
    <IconBattery v-if="props.battery === 0" />
    <IconBattery1 v-else-if="props.battery < 25" />
    <IconBattery2 v-else-if="props.battery < 50" />
    <IconBattery3 v-else-if="props.battery < 75" />
    <IconBattery4 v-else />
</template>