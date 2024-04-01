<script setup lang="ts">

const props = defineProps<{
    name: string,
    label: string
}>();
const value = defineModel();

</script>

<template>
    <div class="group">
        <label :for="props.name">{{ props.label }}</label>
        <input v-model="value" :name="props.name" :id="props.name" type="text" />
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

.group > label {
    width: 30%;
    user-select: none;
}

.group > input {
    width: 70%;
    background-color: #383838;
    border: 2px solid black;
    border-radius: 10px;
    height: 30px;
    color: silver;
}

</style>