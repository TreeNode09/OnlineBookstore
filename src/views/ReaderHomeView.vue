<template>
<h1>Reader</h1>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

const isMounted = ref(false)

onMounted(() => {
    page.currentPage = '/reader'
    page.currentUser = 'Reader'
    color.setOption(2)

    isMounted.value = true
})
</script>