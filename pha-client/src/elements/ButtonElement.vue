<script setup lang="ts">

const props = defineProps<{
    text: string,
    type: "primary" | "danger" | "success",
    disabled?: boolean,
    onClick?: (e: MouseEvent) => void
}>();

const handleOnClick = (e: MouseEvent) => {
    if (props.onClick)
        props.onClick(e);
}

</script>

<template>
    <button @click="handleOnClick" :class="props.type" :disabled="props.disabled">
        <span>
            {{ props.text }}
        </span>
    </button>
</template>

<style scoped>
button {
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
    color: #fff;
    font-size: 14px;
    height: 32px;
    padding: 4px 15px;
    border-radius: 6px;
    outline: none;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    line-height: 1.57;
}

button:disabled {
    background-color: #838383!important;
    color: silver!important;
}

button:disabled:hover {
    cursor: wait!important;
}

.primary { background-color: #1668dc;; }
.primary:hover { background-color: #3c89e8; }
.success { background-color: #01a024; }
.success:hover { background-color: #00ce2d; }

.danger { 
    color: #fff;
    border-color: #ff4d4f;
    background-color: #dc4446;
}

.danger:hover {
    border-color: #ffa39e;
    background-color: #e86e6b;
}
</style>