<script setup lang="ts">

const model = defineModel();
const props = defineProps<{
    name: string,
    type: 'text' | 'password' | 'email',
    label: string,
    placeholder: string,
    onEnterClick?: (e: KeyboardEvent) => void
}>();

defineEmits(['update:modelValue'])

</script>

<template>
    <div class="input-group">
        <div class="label">
            <label v-if="props.label" :for="props.name">
                <span>{{ props.label }}</span>
            </label>
        </div>
        <input 
            v-model="model" 
            :name="props.name" 
            :id="props.name" 
            :type="props.type" 
            :placeholder="placeholder ? placeholder : ''" 
            @keyup="props.onEnterClick"    
        />
    </div>
</template>

<style scoped>
input {
    appearance: none;
    background-image: none;
    border: 0px;
    display: block;
    font-size: 1rem;
    font-weight: 400;
    font-family: CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva;
    transition: box-shadow 0.1s ease-in-out 0s, color 0.1s ease-in-out 0s;
    inline-size: 100%;
    box-sizing: border-box;
    margin-block: 0px;
    border-radius: 4px;
    padding-inline: 14px;
    padding-block-start: 8px;
    padding-block-end: 8px;
    min-block-size: 48px;
    background-color: #121212;
    box-shadow: inset 0 0 0 1px #727272;
    color: white;
}
.input-group {
    padding-bottom: 16px;
}

.label {
    font-size: 0.875rem;
    font-weight: 700;
    font-family: CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva;
    -moz-box-align: center;
    align-items: center;
    display: flex;
    inline-size: 100%;
    padding-block-end: 8px;
}

label {
    color: white;
}

label > span {
    display: inline-block;
    color: white;
}
</style>