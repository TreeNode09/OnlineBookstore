<template>
    <h1>Login</h1>
</template>
    
<script setup>
import { onMounted } from 'vue'
import router from '@/router'
import { usePage } from '@/stores/page'
    
const page = usePage()
    
onMounted(() => {
    page.currentPage = '/login'
    
    router.push('/reader')
})
</script>