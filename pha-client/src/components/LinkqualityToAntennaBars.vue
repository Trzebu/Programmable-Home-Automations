<script setup lang="ts">
import {
    IconAntennaBarsOff,
    IconAntennaBars1,
    IconAntennaBars2,
    IconAntennaBars3,
    IconAntennaBars4,
    IconAntennaBars5
} from "@tabler/icons-vue";

const props = defineProps<{
    linkquality: number
}>();

</script>

<template>
    <IconAntennaBarsOff v-if="props.linkquality === 0" />
    <IconAntennaBars1 v-else-if="props.linkquality < 50" />
    <IconAntennaBars2 v-else-if="props.linkquality < 100" />
    <IconAntennaBars3 v-else-if="props.linkquality < 150" />
    <IconAntennaBars4 v-else-if="props.linkquality < 200" />
    <IconAntennaBars5 v-else/>
</template>