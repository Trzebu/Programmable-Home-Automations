<script setup lang="ts">

const props = defineProps<{
    text: string,
    type: "text" | "danger" | "primary" | "success",
    size?: "small" | "regular" | "big",
    weight?: "bold",
    centered?: true
}>();

const classes: any = [
    props.type,
    typeof props.size === 'undefined' ? 'regular' : props.size
];

if (typeof props.weight !== 'undefined')
    classes.push(props.weight);
if (props.centered)
    classes.push("center");

</script>

<template>
    <p :class="classes.join(' ')">{{ props.text }}</p>
</template>

<style scoped>

.text { color: white; }
.danger { color: #ff0000; }
.primary { color: rgb(112, 112, 255); }

.success { color: green; }
.small { font-size: 10px }
.regular { font-size: 14px }
.big { font-size: 25px }

.bold { font-weight: bold; }

.center { text-align: center; }

</style>