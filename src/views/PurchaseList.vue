<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<el-table v-if="isMounted" :data="purchases">
    <el-table-column v-for="key in Object.keys(purchases[0])" :prop="key" :label="key"></el-table-column>
</el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { usePage } from '@/stores/page'

const page = usePage()

const isMounted = ref(false)
const purchases = ref([{bookId: 1, bookName: 'A'}, {bookId: 1, bookName: 'A'}, {bookId: 1, bookName: 'A'}])

onMounted(() => {
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/purchaseList'
    // axios.get('/business/purchaseList', 
    // ).then(response => {
    //     purchases.value = response.data.data
        isMounted.value = true
    // })
    // .catch(error => {alert(error)})
})
</script>