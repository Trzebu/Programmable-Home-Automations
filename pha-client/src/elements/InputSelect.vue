<script setup lang="ts">

const props = defineProps<{
    name: string,
    label: string,
    options: string[] | number[]
}>();
const selected = defineModel("selected");

</script>

<template>
    <div class="group">
        <label :for="props.name">{{ props.label }}</label>
        <select v-model="selected">
            <option v-for="(option) in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
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

.group > select {
    width: 70%;
    background-color: #383838;
    border: 2px solid black;
    border-radius: 10px;
    height: 30px;
    color: silver;
}

</style>