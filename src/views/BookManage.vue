<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/bookManage">供书目录</el-menu-item>
</el-menu>
<el-button v-if="!isDelete" type="danger" @click="startDelete">删除图书</el-button>
<el-button v-if="isDelete" type="danger" plain @click="endDelete">完成删除</el-button>
<main-button @click="searchBook" class="right">搜索</main-button>
<el-input v-model="searchText" placeholder="搜索图书..." clearable class="right search"/>
<el-table v-if="isMounted" :data="books" max-height="600px" style="width: 100%">
    <el-table-column prop="bookId" label="书号" width="75px"/>
    <el-table-column prop="name" label="书名" width="200px"/>
    <el-table-column prop="isbn" label="ISBN" width="175px"/>
    <el-table-column prop="publish" label="出版社" width="200px"/>
    <el-table-column prop="price" label="售价" width="100px" sortable/>
    <el-table-column prop="inventory" label="库存量" width="75px"/>
    <el-table-column prop="author" label="作者" width="150px"/>
    <el-table-column prop="keyword" label="关键词" width="200px"/>
    <el-table-column width="75px" fixed="right" >
        <template #default="scope">
            <el-button :disabled="!isDelete" @click="deleteBook(scope.row.bookId)"
                size="small" :icon="Delete" type="danger"></el-button>
        </template>
    </el-table-column>
</el-table>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'

import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

const page = usePage()
const color = useColor()

const isMounted = ref(false)
const isDelete = ref(false)

const books = ref([])

const searchText = ref('')

onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/bookManage'
    page.currentSubPage = '/bookManage'
    color.setOption(1)

    getBookList()
    isMounted.value = true
})

function getBookList(){
    axios.get('/customer/book/order/0', 
    ).then(response => {
        books.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function getSearchBook(){
    axios.get(`/customer/book/${searchText.value}`,
    ).then(response => {
        books.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function deleteBook(bookId){
    console.log(bookId)
    axios.delete(`/business/deleteBook/${bookId}`,    
    ).then(response => {
        ElMessage({
            message: response.data.msg,
            type: 'successful'
        })
    })
    .catch(error => {alert(error)})
}

function searchBook(){
    getSearchBook()
}

function startDelete(){
    isDelete.value = true
}

function endDelete(){
    isDelete.value = false
}
</script>