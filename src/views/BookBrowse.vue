<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" :ellipsis="false" class="sub-menu">
    <el-menu-item index="/bookBrowse">图书列表</el-menu-item>
    <el-menu-item index="/bookCart">购物车</el-menu-item>
</el-menu>
<el-pagination :total="50" :page-size="7" @current-change="getBookList"
    layout="prev, pager, next"></el-pagination>
<main-button @click="getSearchBook" class="right" style="margin-left: 20px;">搜索</main-button>
<el-input v-model="searchText" placeholder="搜索图书..." clearable class="search right"/>
<el-scrollbar v-if="isMounted" height="100%" class="scroll">
    <el-descriptions v-for="book in books" :column="4" border>
        <el-descriptions-item label="i" :rowspan="2" label-width="25px" width="250px">
            <h3>{{ book.name }}</h3>
            <main-button v-if="book.count===0" @click="addToCart(book)" class="right">+</main-button>
            <el-input-number v-else v-model="book.count" @change="handelChange(book)" :max="book.inventory"
                class="right small-input"/>
        </el-descriptions-item>
        <el-descriptions-item label="作者" label-width="75px" width="200px">{{ book.author }}</el-descriptions-item>
        <el-descriptions-item label="出版社" label-width="75px" width="200px">{{ book.publish }}</el-descriptions-item>
        <el-descriptions-item label="价格" label-width="75px" width="100px">
            <h4>￥{{ book.price }}</h4>
        </el-descriptions-item>
        <el-descriptions-item label="ISBN">{{ book.isbn }}</el-descriptions-item>
        <el-descriptions-item label="标签">{{ book.keyword }}</el-descriptions-item>
        <el-descriptions-item label="库存">{{ book.inventory }}本</el-descriptions-item>
    </el-descriptions>
</el-scrollbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { useUser } from '@/stores/user'
import axios  from 'axios'

const page = usePage()
const color = useColor()
const user = useUser()

const isMounted = ref(false)

const books = ref([
    {bookId: 4, isbn: "978-7-108-04348-1", name: "活着", publish: "作家出版社", price: 29.0,
    inventory: 40, author: "余华", keyword: "小说 人生", count: 0}
])

const searchText = ref('')

onMounted(() => {
    page.currentUser = 'Reader'
    page.currentPage = '/bookBrowse'
    page.currentSubPage = '/bookBrowse'
    color.setOption(2)

    getBookList(1)
    isMounted.value = true
})

function getBookList(value){
    if(searchText.value === ""){    
        axios.get('/customer/book/order/0', {params:{ps:7,pn:value}}
        ).then(response => {
            books.value = response.data.data
            initializeBooks()
        })
        .catch(error => {alert(error)})
    }
    else{
        getSearchBook(value)
    }
}

function getSearchBook(value){
    axios.get(`/customer/book/${searchText.value}`, {params:{ps:7,pn:value}}
    ).then(response => {
        books.value = response.data.data
        initializeBooks()
    })
    .catch(error => {alert(error)})
}

function initializeBooks(){
    for(let i = 0; i < books.value.length; i++){
        books.value[i]['count'] = 0
        for(let j = 0; j < user.bookCart.length; j++){
            if(books.value[i].bookId === user.bookCart[j].bookId){
                books.value[i].count = user.bookCart[j].count
            }
        }
    }
}

function addToCart(book){
    for(let i = 0; i < books.value.length; i++){
        if(books.value[i].bookId === book.bookId){
            books.value[i].count++
        }
    }
    user.bookCart.push(book)
}

function handelChange(book){
    for(let i = 0; i < user.bookCart.length; i++){
        if(user.bookCart[i].bookId === book.bookId){
            if(book.count === 0){
                user.bookCart.splice(i, 1)
            }
            else{
                user.bookCart[i].count = book.count
            }
        }
    }
}
</script>