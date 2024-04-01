<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IconCircleCheck, IconInfoCircle, IconAlertCircle, IconCircleXFilled, IconX } from "@tabler/icons-vue";

const props = defineProps<{
    text: string,
    type: "success" | "info" | "warning" | "error",
    timeSec?: number
}>();
const isMounted = ref(false);
const isHidden = ref(false);
const time = props.timeSec ? props.timeSec : 6;

const hide  = () => isHidden.value = true;

onMounted(() => isMounted.value = true);


setTimeout(() => hide(), time * 1000);
</script>

<template>
    <Teleport to="#notifications">
        <div class="content-container" v-if="!isHidden">
            <div :class="`content ${props.type}`">
                <IconCircleCheck v-if="props.type === 'success'" class="icon" />
                <IconInfoCircle v-else-if="props.type === 'info'" class="icon" />
                <IconAlertCircle v-else-if="props.type === 'warning'" class="icon" />
                <IconCircleXFilled v-else-if="props.type === 'error'" class="icon" />
                <span>{{ props.text }}</span>
                <button @click="hide">
                    <IconX />
                </button>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.content-container {
    width: 100%;
}

.content {
    width: 100%;
    border: 1px solid;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 12px;
}

.content > span {
    color: rgba(255, 255, 255, 0.85);
    flex: 1;
    min-width: 0;
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    word-wrap: break-word;
    font-size: 14px;
}

.icon {
    margin-inline-end: 8px;
}

button {
    margin-inline-start: 8px;
    overflow: hidden;
    font-size: 12px;
    line-height: 12px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.45);
    transition: color 0.2s;
}

button:hover {
    color: rgba(255, 255, 255, 0.85);
}

.success {
    background-color: #162312;
    border-color: #274916;
}

.info {
    background-color: #111a2c;
    border-color: #15325b;
}

.warning {
    background-color: #2b2111;
    border-color: #594214;
}

.error {
    background-color: #2c1618;
    border-color: #5b2526;
}

.success > .icon { color: #49aa19; }
.info > .icon { color: #1668dc; }
.warning > .icon { color: #d89614; }
.error > .icon { color: #dc4446; }
</style>