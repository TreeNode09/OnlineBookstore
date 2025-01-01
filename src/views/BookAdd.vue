<template>
    <el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/bookManage">图书删除</el-menu-item>
    <el-menu-item index="/bookAdd">图书入库</el-menu-item>
</el-menu>
<el-form :model="form" label-width="auto">

        <el-form-item label="书号">
            <el-input v-model="form.isbn"/>
        </el-form-item>

        <el-form-item label="书名">
            <el-input v-model="form.name"/>
        </el-form-item>

        <el-form-item label="出版社">
            <el-input v-model="form.publish"/>
        </el-form-item>

        <el-form-item label="作者">
            <el-input v-model="form.author"/>
        </el-form-item>

        <el-form-item label="价格">
            <el-input-number v-model="form.price"/>
        </el-form-item>

        <el-form-item label="入库数量">
            <el-input-number v-model="form.inventory"/>
        </el-form-item>

        <el-form-item label="关键词">
            <el-input v-model="form.keyword"/>
        </el-form-item>

        <el-form-item>
            <main-button @click="appendBook" style="margin-left: 70px;">确定入库</main-button>       
        </el-form-item>
</el-form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { ElMessage } from 'element-plus'

const page = usePage()
const color = useColor()

const form = ref({isbn: '', name: '', publish: '', author: '', price: '', inventory: 0, keyword: ''})
onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/bookManage'
    page.currentSubPage = '/bookAdd'
    color.setOption(1)
})

const appendBook = () => {
    console.log(form.value)
    axios.post('/business/appendBook', form.value
    ).then(response => {
        ElMessage.success('入库成功')
    }).catch(error => {
        ElMessage.error('入库失败')
    })
}
</script>

<style scoped>
.sub-menu
{
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 20px;
    margin-left: -20px;
    margin-right: -75px;

    background-color: #FFF;
    
    --el-menu-active-color: var(--main);
    --el-menu-hover-bg-color: var(--shadowLight);
    --el-menu-hover-text-color: var(--dark);
}
</style>