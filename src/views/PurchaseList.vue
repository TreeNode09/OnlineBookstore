<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<h1>采购单</h1>
<el-table v-if="isMounted" :data="purchases">
    <el-table-column v-for="key in Object.keys(purchases[0])" :prop="key" :label="key"></el-table-column>
</el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { usePage } from '@/stores/page'

const page = usePage()

const purchases = ref([])

const isMounted = ref(false)

onMounted(() => {
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/purchaseList'
    axios.get('/business/purchaseList', 
    ).then(responce => {
        purchases.value = responce.data.data
        isMounted.value = true
    })
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