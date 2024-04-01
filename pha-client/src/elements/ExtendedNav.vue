<script setup lang="ts">

const props = defineProps<{
    items: {
        label: string,
        name: string
    }[];
}>();

const selectedItem = defineModel();
selectedItem.value = props.items[0].name;
</script>

<template>
    <div class="nav">
        <span 
            v-for="item in props.items" 
            :key="item.name" 
            :class="item.name === selectedItem ? 'active' : ''"
            @click="() => selectedItem = item.name"
        >
            {{ item.label }}
        </span>
    </div>
</template>

<style scoped>
.nav {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.nav > span {
    flex-grow: 1;
    flex-basis: 0;
    text-align: center;
    background-color: #1a1a1a;
    padding: 10px;
    font-size: 18px;
    color: silver;
    user-select: none;
    transition: .3s all ease;
    border-bottom: 1px solid black;
}

.nav > span:not(.active):hover {
    background-color: #202020;
    cursor: pointer;
}

.nav .active {
    background-color: #232323;
    color: white;
    font-weight: bold;
}
</style>