<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/addOutOfStock">添加缺书记录</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<el-form :model="form">
    <el-form-item label="书号">
        <el-input v-model="form.isbn"/>
    </el-form-item>
    <el-form-item label="书名">
        <el-input v-model="form.bookName"/>
    </el-form-item>
    <el-form-item label="出版社">
        <el-select v-model="form.press">
            <el-option v-for="press in presses" :label="press.pressName" :value="press.pressName"/>
        </el-select>
    </el-form-item>
    <el-form-item label="供应商">
        <el-select v-model="form.supplier">
            <el-option v-for="supplier in suppliers" :label="supplier.supplierName" :value="supplier.supplierId"/>
        </el-select>
    </el-form-item>
    <el-form-item label="数量">
        <el-input-number v-model="form.count"/>
    </el-form-item>
    <el-form-item>
        <main-button>创建</main-button>
        <plain-button @click="toStock">返回</plain-button>
    </el-form-item>
</el-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'

import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

const form = reactive({isbn: '', bookName: '', press: '', supplier: '', count: 0})

onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/addOutOfStock'
    color.setOption(1)
})

function toStock()
{
    router.push('/outOfStock')
}
</script>