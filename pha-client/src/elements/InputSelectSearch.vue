<script setup lang="ts">
import { _t } from '@/translations/_t';
import { IconChevronDown } from '@tabler/icons-vue';
import { ref } from 'vue';

const props = defineProps<{
    name: string,
    label: string,
    options: {
        label: string,
        value: any
    }[]
}>();
const firstOption = props.options[0].label;

const isFocused = ref(false);
const selectElement = ref<HTMLElement | null>(null);
const inputValue = defineModel();
const selectedValue = defineModel("value");
const labels = ref(props.options.map(option => option.label));

const onInputFocus = () => isFocused.value = true;
const onInputBlur = () => {
    isFocused.value = false;
    if (!inputValue.value)
        setSelectedOption(firstOption);
}
const onInputType = () => {
    selectedValue.value = null;

    if (!inputValue.value)
        labels.value = props.options.map(option => option.label);
    labels.value = props.options.map(option => option.label).filter(label => {
        return label.toLowerCase().includes(String(inputValue.value).toLowerCase())
    })
    setSelectedOption(inputValue.value as string);
}
const setSelectedOption = (label: string) => {
    inputValue.value = label;
    const value = props.options.filter(
        option => option.label === label
    )[0];

    selectedValue.value = typeof value !== "undefined" ? value.value : label;
}

setSelectedOption(firstOption);
</script>

<template>
    <div class="group">
        <label :for="props.name">{{ props.label }}</label>
        <div ref="selectElement" class="select">
            <input 
                type="text" 
                :id="props.name"
                :name="props.name"
                v-model="inputValue"    
                @focus="onInputFocus"
                @blur="onInputBlur"
                @input="onInputType"
            />
            <IconChevronDown />
        </div>
    </div>
    <Teleport to="body">
        <div 
            v-if="isFocused" 
            class="options" 
            :style="{
                width: selectElement?.offsetWidth + 'px',
                top: (selectElement!.getBoundingClientRect().top + 30) + 'px',
                left: selectElement?.getBoundingClientRect().left + 'px'
            }"
        >
            <div v-if="labels.length === 0" class="option">{{ _t("no_content") }}</div>
            <div 
                class="option" 
                v-for="label in labels" 
                :key="label" 
                @mousedown="() => {
                    setSelectedOption(label);
                }"
            >
                {{ label }}
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.group {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 2%;
    align-items: center;
}

label {
    width: 30%;
    user-select: none;
}

.select {
    width: 70%;
    background-color: #383838;
    border: 2px solid black;
    border-radius: 10px;
    height: 30px;
    display: flex;
    align-items: center;
}

.select > input {
    width: 100%;
    background: none;
    border: none;
    user-select: none;
    outline: none;
    color: silver;
}

.options {
    position: absolute;
    background-color: #383838;
    border: 2px solid black;
    border-radius: 10px;
    height: 300px;
    overflow-y: auto;
}

.option {
    color: silver;
    transition: .2s all ease;
    padding: 5px;
}

.option:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
}

</style>