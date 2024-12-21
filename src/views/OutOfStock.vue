<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<h1>缺书</h1>
<!-- <el-table :data="stocks">
    <el-table-column v-for="key in Object.keys(stocks[0])" :prop="key" :label="key"></el-table-column>
</el-table> -->
</template>
    
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { usePage } from '@/stores/page'
    
const page = usePage()
    
const stocks = ref([])
    
onMounted(() => {
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/outOfStock'
    axios.get('', 
    ).then(responce => {stocks.value = responce.data.data})
    .catch(error => {alert(error)})
})
</script>

<style scoped>
.el-menu
{
    margin-left: -20px;
    margin-right: -75px;
}
</style>