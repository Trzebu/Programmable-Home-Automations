<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth';

const router = useRouter();
const user = useAuthStore();

(async () => {
    const res = await user.get();

    if (!res)
        router.push("/login");
})();

</script>

<template>
    <RouterView />
</template>
