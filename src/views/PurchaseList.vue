<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<el-table v-if="isMounted" :data="purchases">
    <el-table-column v-if="isSelect" type="selection" :selectable="isSelectable" width="50px"></el-table-column>
    <el-table-column v-else width="50px"></el-table-column>
    <el-table-column prop="stockId" label="缺货记录号"></el-table-column>
    <el-table-column prop="name" label="书名"></el-table-column>
    <el-table-column prop="isbn" label="书号"></el-table-column>
    <el-table-column prop="publish" label="出版社"></el-table-column>
    <el-table-column prop="supplierName" label="供应商"></el-table-column>
    <el-table-column prop="date_" label="缺货日期"></el-table-column>
    <el-table-column prop="finished" label="采购状态"></el-table-column>
    <!-- <el-table-column v-for="key in Object.keys(purchases[0])" :prop="key" :label="key"></el-table-column> -->
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
    axios.get('/business/purchaseList', 
    ).then(response => {
        purchases.value = response.data.data
        isMounted.value = true
    })
    .catch(error => {alert(error)})
})
</script>