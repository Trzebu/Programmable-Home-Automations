//import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { _t } from '../translations/_t';
import { request } from '@/utils/request';
import { ref } from 'vue';

export interface User {
    username: string;
}

export const useAuthStore = defineStore('auth', () => {
    let user: User;
    const isLogged = ref(false);

    const get = async () => {
        user = await request("/auth/user", "GET");
        if (!user.username)
            return false;
        isLogged.value = true;
        return user;
    }

    const login = async (
        username: string, password: string, rememberMe: boolean
    ) => {
        if (!login.length)
            return _t("auth.login_is_empty");
        if (!password.length)
            return _t("auth.password_is_empty");
        
        const response = await request<null | {
            msg: string,
            inputName: String
        }>("/auth/login", "POST", {
            username, password, rememberMe
        });

        if (response) {
            if (response.inputName)
                return _t(response.msg, [["inputName", _t("auth." + response.inputName)]]);
            else
                return _t(response.msg);    
        }
        
        return "";
    }

  return { login, get, isLogged }
})
