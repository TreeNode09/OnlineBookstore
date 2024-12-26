<template>
<h1>Admin</h1>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

onMounted(() => {
    page.currentPage = '/admin'
    page.currentUser = 'Admin'
    color.setOption(1)
})
</script>