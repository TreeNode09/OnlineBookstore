<template>
      <el-result icon="info" title="誉达网上书店">
        <template #sub-title>
          <p>欢迎使用</p>
        </template>
      </el-result>
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