<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/addOutOfStock">添加缺书记录</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<el-form v-if="isMounted" :model="form">
    <el-form-item label="ISBN">
        <el-input v-model="form.isbn"/>
    </el-form-item>
    <el-form-item label="书名">
        <el-select filterable @change="handleChange">
            <el-option v-for="book in books" :label="book.bookName" :value="book.bookId"/>
        </el-select>
    </el-form-item>
    <el-form-item label="时间">
        <el-date-picker v-model="form.date_" type="datetime":shortcuts="shortcuts"/>
    </el-form-item>
    
    <el-form-item label="数量">
        <el-input-number v-model="form.count"/>
    </el-form-item>
    <el-form-item>
        <plain-button @click="toStock">返回</plain-button>
        <main-button @click="postStock">创建</main-button>       
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

const isMounted = ref(false)

const books = ref([])
const form = reactive({isbn: '', bookName: '', date_: '', count: 0})

const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      return date
    },
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 7)
      return date
    },
  },
]

onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/addOutOfStock'
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

function postStock(){

}

function handleChange(value){
    for(let i = 0; i < books.value.length; i++){
        if(books.value[i].bookId === value){
            form.value = books.value[i]
        }
    }
}

function toStock()
{
    router.push('/outOfStock')
}
</script>