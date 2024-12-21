<template>
<h1>Reader</h1>
<el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }">
    <el-table-column sortable prop="date" label="日期"/>
</el-table>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

onMounted(() => {
    page.currentPage = '/reader'
    page.currentUser = 'Reader'
    color.setOption(2)
})

const tableData = [
  {date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
]

</script>

<style scoped>

</style>