<script setup lang="ts">
import { IconX } from "@tabler/icons-vue";

const props = defineProps<{
    title: string,
    isOpen: boolean
}>();
const emit = defineEmits(["modal-close"]);

</script>

<template>
    <Teleport to="body">
        <div class="modal" v-if="props.isOpen">
            <div class="mask" @click="emit('modal-close')"></div>
            <div class="content">
                <div class="header">
                    {{ props.title }}
                    <div class="close" @click="emit('modal-close')">
                        <IconX />
                    </div>
                </div>
                <slot />
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.mask {
    background-color: rgba(0, 0, 0, 0.45);
    width: 100%;
    height: 100%;
}

.content {
    position: fixed;
    top: 0;
    margin-top: 100px;
    width: 520px;
    color: #fff;
    background-color: #3f3f3f;
    padding: 15px;
    border: 1px solid black;
    border-radius: 10px;
}

.header {
    margin: 0;
    color: silver;
    font-weight: bold;
    font-size: 17px;
    line-height: 1.5;
    word-wrap: break-word;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.close {
    cursor: pointer;
    color: silver;
    transition: all .5s ease;
}

.close:hover {
    color: white;
}
</style>