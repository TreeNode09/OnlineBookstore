<template>
<h1>Start</h1>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

onMounted(() => {
    page.currentPage = '/'
    page.currentUser = 'No login'
    color.setOption(0)
})
</script>