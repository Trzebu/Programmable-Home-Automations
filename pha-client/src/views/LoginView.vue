<script setup lang="ts">
import { ref } from 'vue';
import CheckboxElement from '@/components/CheckboxElement.vue';
import InputElement from '@/components/InputElement.vue';
import LoginButtonElement from '@/components/LoginButtonElement.vue';
import PTypography from '@/components/PTypography.vue';
import { _t } from '@/translations/_t';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const login = ref("");
const password = ref("");
const rememberMe = ref(false);
const loading = ref(false);
let errorMessage = "";

const handleLogin = async () => {
    loading.value = true;
    errorMessage = await authStore.login(login.value, password.value, rememberMe.value);

    if (errorMessage.length === 0) {
        await authStore.get();
        router.push("/");
    }

    loading.value = false;
}
const onEnterClick = (e: KeyboardEvent) => {
    if (e.key === "Enter")
        handleLogin();
}

</script>

<template>
    <div class="base">
        <div class="header">
            <div class="logo">
                <img src="../assets/iot-logo-1024.png" />
                PHA
            </div>
        </div>
        <div class="main">
            <div class="login-content">
                <div class="login-form">
                    <h1>{{ _t("auth.title") }}</h1>
                    <div class="inputs-group">
                        <InputElement v-model="login" name="username" type="text" :label="_t('auth.username')" :placeholder="_t('auth.username')" />
                        <InputElement v-model="password" name="password" type="password" :label="_t('auth.password')" :placeholder="_t('auth.password')" :onEnterClick="onEnterClick" />
                        <PTypography :text="errorMessage" type="danger"/>
                        <CheckboxElement v-model="rememberMe" name="remember_me" :label="_t('auth.remember_me')" :checked="true"/>
                        <LoginButtonElement :disabled="loading" :onClick="handleLogin" :text="_t('auth.login')" type="primary"/>
                    </div>
                    <hr>
                    <div class="info-under-form">
                        <h2>{{ _t("auth.register_info") }}</h2>
                    </div>
                    <div class="info-under-form">
                        <h2>{{ _t("auth.forgot_password") }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.base {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-x: hidden;
    background-color: #121212;
}

.header {
    padding: 32px 0px 32px 51px;
    margin-bottom: 0px;
    border-bottom: medium;
    width: 100%;
}

.logo {
    height: 36px;
    text-align: left;
}

.logo > img {
    width: 32px;
    height: 32px;
}

.main {
    background: linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%);
    flex: 3 1 0%;
    display: flex;
    justify-content: center;
    padding: 32px;
}

.login-content {
    max-width: 734px;
    width: 100%;
}

.login-form {
    display: flex;
    flex-direction: column;
    background-color: #121212;
    color: white;
    row-gap: normal;
    border-radius: 8px;
    padding: 32px 0px;
}

.login-form > h1 {
    text-align: center;
    margin: 48px 0px;
    font-size: 3rem;
    margin-block: 0px;
    font-weight: 700;
    font-family: CircularSpTitle,CircularSpTitle-Tall,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,sans-serif;
}

.inputs-group{
    width: 324px;
    margin: 0px auto;
    padding-bottom: 0px;
    color: white;
}

hr {
    margin: 32px 100px;
    border-width: 1px medium medium;
    border-style: solid none none;
    border-color: rgb(41, 41, 41) currentcolor currentcolor;
    border-image: none;
}

.info-under-form {
    padding: 16px 0px;
}

.info-under-form > h2 {
    text-align: center;
    box-sizing: border-box;
    margin-block: 0px;
    font-size: 1rem;
    font-weight: 400;
    color: inherit;
}
</style>