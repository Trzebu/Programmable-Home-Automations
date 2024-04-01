<script setup lang="ts">

const props = defineProps<{
    text: string,
    type: "primary" | "danger",
    disabled?: boolean,
    onClick?: (e: MouseEvent) => void
}>();

const handleClick = (e: MouseEvent) => {
    if (!props.onClick) return;

    props.onClick(e);
}
console.log(props.disabled)
</script>

<template>
    <div class="container">
        <button @click="handleClick" :disabled="props.disabled">
            <span class="button-inner">
                <span>{{ props.text }}</span>
            </span>
            <span class="focus"></span>
        </button>
    </div>
</template>

<style scoped>
.container {
    text-align: center;
    padding: 32px 0px;
}

button {
    width: 100%;
    font-size: 1rem;
    font-weight: 700;
    background-color: transparent;
    border: 0px;
    border-radius: 500px;
    display: inline-block;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    touch-action: manipulation;
    transition-duration: 33ms;
    transition-property: background-color, border-color, color, box-shadow, filter, transform;
    user-select: none;
    vertical-align: middle;
    transform: translate3d(0px, 0px, 0px);
    padding: 0px;
    min-inline-size: 0px;
}

.button-inner {
    position: relative;
    background-color: #1ed760;
    color: #000000;
    display: flex;
    border-radius: 500px;
    font-size: inherit;
    min-block-size: 48px;
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: center;
    justify-content: center;
    padding-block: 8px;
    padding-inline: 32px;
}

.button-inner > span {
    text-transform: none;
    letter-spacing: 0px;
    margin-block: 0px;
    font-size: 1rem;
    color: inherit;
    font-weight: 700;
}

.focus {
    display: block;
    position: absolute;
    pointer-events: none;
    transition: border-color 200ms ease-in 0s;
    box-sizing: border-box;
    inline-size: calc(100% + 12px);
    block-size: calc(100% + 12px);
    top: -6px;
    left: -6px;
    background: transparent;
    border-radius: 500px;
    border: 3px solid transparent;
}

button:not(:disabled):hover .focus, 
button:not(:disabled):hover .button-inner {
    transform: scale(1.04);
    cursor: pointer;
}

button[disabled] > .button-inner {
    background-color: #6e6e6e;
    cursor: not-allowed;
}
</style>