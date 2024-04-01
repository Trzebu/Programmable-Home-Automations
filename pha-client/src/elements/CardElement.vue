<template>
    <div class="card-container">
        <div class="card">
            <div class="header" v-if="$slots.header">
                <slot name="header"></slot>
            </div>
            <div class="content">
                <slot />
            </div>
            <div class="footer" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-container {
    width: 100%;
    padding: 10px 10px 0 10px;
}

.card {
    width: 100%;
    background-color: #232323;
    padding: 10px;
    border-radius: 5px;
}

.header {
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 1px solid rgb(22, 22, 22);
    padding: 5px;
}

.content {
    margin: 10px 0;
}

.footer {
    border-top: 1px solid rgb(22, 22, 22);
    padding-top: 10px;
    display: flex;
    justify-content: right;
}
</style>