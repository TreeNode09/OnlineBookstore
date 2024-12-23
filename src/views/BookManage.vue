<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/bookManage">供书目录</el-menu-item>
</el-menu>
<el-button v-if="!isDelete" type="danger" @click="startDelete">删除图书</el-button>
<el-button v-if="isDelete" type="danger" plain @click="endDelete">完成删除</el-button>
<main-button @click="searchBook" class="right">搜索</main-button>
<el-input v-model="searchText" placeholder="搜索图书..." clearable class="right search"/>
<el-table v-if="isMounted" :data="books" style="width: 100%">
    <el-table-column prop="bookId" label="书号" width="75px"></el-table-column>
    <el-table-column prop="name" label="书名" width="200px"></el-table-column>
    <el-table-column prop="isbn" label="ISBN" width="175px"></el-table-column>
    <el-table-column prop="publish" label="出版社" width="200px"></el-table-column>
    <el-table-column prop="price" label="售价" width="100px" sortable></el-table-column>
    <el-table-column prop="inventory" label="库存量" width="75px"></el-table-column>
    <el-table-column prop="author" label="作者" width="150px"></el-table-column>
    <el-table-column prop="keyword" label="关键词" width="200px"></el-table-column>
    <el-table-column width="75px" fixed="right" >
        <template #default="scope">
            <el-button :disabled="!isDelete" @click="deleteBook(scope.row.bookId)"
                type="danger" size="small" >删除</el-button>
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

const page = usePage()
const color = useColor()

const isMounted = ref(false)
const isDelete = ref(false)

const books = ref([
    // {bookId: 4, isbn: "978-7-108-04348-1", name: "活着", publish: "作家出版社", price: 29.0,
    // inventory: 40, author: "余华", keyword: "小说 人生"},
    // {bookId: 5, isbn: "978-7-5063-4079-4", name: "百年孤独", publish: "南海出版公司", price: 39.5,
    // inventory: 50, author: "加西亚·马尔克斯", keyword: "魔幻现实主义 文学"},
    // {bookId: 6, isbn: "978-7-5321-0295-8", name: "围城", publish: "人民文学出版社", price: 32.0,
    // inventory: 60, author: "钱钟书", keyword: "讽刺 小说"},
    // {bookId: 7, isbn: "978-7-02-010804-5", name: "三体", publish: "重庆出版社", price: 68.0,
    // inventory: 80, author: "刘慈欣", keyword: "科幻 小说"},
    // {bookId: 8, isbn: "978-7-108-04348-1", name: "平凡的世界", publish: "人民文学出版社", price: 39.8,
    // inventory: 70, author: "路遥", keyword: "现实主义 小说"},
    // {bookId: 9, isbn: "978-7-123-45678", name: "新书", publish: "新出版社", price: 45.0,
    // inventory: 252, author: "新作者", keyword: "新书 出版"}
])

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
        // books.value.
    })
    .catch(error => {alert(error)})
}

function deleteBook(bookId){
    console.log(bookId)
    axios.delete(`/business/deleteBook/${bookId}`,    
    ).then(response => {
        alert(response.data.msg)
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