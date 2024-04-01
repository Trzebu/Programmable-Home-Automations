<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";


const items = [
    ["/", "Home"],
    ["/switch", "Switches"],
    ["/zigbee", "Zigbee"],
    ["/phaesp", "PHA-ESP"]
]

</script>

<template>
    <ul>
        <li 
            v-for="item in items" :key="item[1]" 
            @click="$router.push(item[0])"
            :class="item[0].includes($route.fullPath as string) ? 'active' : ''"
        >
            {{ item[1] }}
            <IconChevronRight />
        </li>
    </ul>
</template>

<style scoped>
ul {
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    padding: 0;
    color: rgba(255, 255, 255, 0.85);
    font-size: 14px;
    list-style: none;
    padding-inline-start: 0;
    outline: none;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

ul > li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
}

ul > li:hover, ul > .active {
    background-color: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
}
</style>