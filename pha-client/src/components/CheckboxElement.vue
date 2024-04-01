<script setup lang="ts">

const model = defineModel();
const props = defineProps<{
    name: string,
    label: string,
    checked?: boolean
}>();

</script>

<template>
    <div class="container">
        <label>
            <input v-model="model" :name="props.name" type="checkbox" :checked="props.checked ? true : false"/>
            <span class="indicator-wrapper">
                <span></span>
            </span>
            <span class="label">
                <p>{{ props.label }}</p>
            </span>
        </label>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

label {
    color: white;
    box-sizing: border-box;
    align-items: center;
    display: flex;
    padding-block: 4px;
    position: relative;
    min-block-size: 32px;
}

input {
    border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    width: 1px;
}

.indicator-wrapper {
    border-radius: 11px;
    block-size: 16px;
    min-inline-size: 30px;
    position: relative;
}

input:checked ~ .indicator-wrapper {
    background-color: #1ed760;
}

input:not(:checked) ~ .indicator-wrapper {
    background-color: #727272;
}

.indicator-wrapper > span {
    background: #121212;
    border-radius: inherit;
    block-size: 12px;
    position: absolute;
    top: 2px;
    inline-size: 12px;
}
input:checked ~ .indicator-wrapper > span {
    right: 2px;
    left: auto;
}

input:not(:checked) ~ .indicator-wrapper > span {
    left: 2px;
    right: auto;
}

.label {
    color: #ffffff;
    font-size: 0.6875rem;
    font-weight: 400;
    padding-inline-start: 12px;
    padding-inline-end: 24px;
    min-inline-size: 0px;
    overflow-wrap: break-word;
}

.label > p {
    display: inline;
    color: white;
    margin-block: 0px;
    font-size: 0.875rem;
    font-weight: 400;
    user-select: none;
}

</style>