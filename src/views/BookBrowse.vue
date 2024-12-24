<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" :ellipsis="false" class="sub-menu">
    <el-menu-item index="/bookBrowse">图书列表</el-menu-item>
    <el-menu-item index="/bookCart">购物车</el-menu-item>
</el-menu>
<el-pagination :total="50" :page-size="10" @current-change="handleCurrentChange"
    layout="prev, pager, next"></el-pagination>
<main-button @click="searchBook" class="right">搜索</main-button>
<el-input v-model="searchText" placeholder="搜索图书..." clearable class="search right"/>
<el-scrollbar height="100%" class="scroll">
    <el-descriptions v-for="book in books" :column="4" border>
        <el-descriptions-item label="i" :rowspan="2" label-width="25px" width="250px">
            <h3>{{ book.name }}</h3>
            <main-button v-if="book.count===0" @click="addToCart(book)" class="right">+</main-button>
            <el-input-number v-else v-model="book.count" @change="handelChange" class="right small-input"/>
        </el-descriptions-item>
        <el-descriptions-item label="作者" label-width="75px" width="200px">{{ book.author }}</el-descriptions-item>
        <el-descriptions-item label="出版社" label-width="75px" width="200px">{{ book.publish }}</el-descriptions-item>
        <el-descriptions-item label="价格" label-width="75px" width="100px">
            <h4>￥{{ book.price }}</h4>
        </el-descriptions-item>
        <el-descriptions-item label="ISBN">{{ book.isbn }}</el-descriptions-item>
        <el-descriptions-item label="标签">{{ book.keyword }}</el-descriptions-item>
    </el-descriptions>
</el-scrollbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { useUser } from '@/stores/user'

const page = usePage()
const color = useColor()
const user = useUser()

const isMounted = ref(false)

const books = ref([
    {bookId: 4, isbn: "978-7-108-04348-1", name: "活着", publish: "作家出版社", price: 29.0,
    inventory: 40, author: "余华", keyword: "小说 人生", count: 0},
    {bookId: 5, isbn: "978-7-5063-4079-4", name: "百年孤独", publish: "南海出版公司", price: 39.5,
    inventory: 50, author: "加西亚·马尔克斯", keyword: "魔幻现实主义 文学", count: 0},
    {bookId: 6, isbn: "978-7-5321-0295-8", name: "围城", publish: "人民文学出版社", price: 32.0,
    inventory: 60, author: "钱钟书", keyword: "讽刺 小说", count: 0},
    {bookId: 7, isbn: "978-7-02-010804-5", name: "三体", publish: "重庆出版社", price: 68.0,
    inventory: 80, author: "刘慈欣", keyword: "科幻 小说", count: 0},
    {bookId: 8, isbn: "978-7-108-04348-1", name: "平凡的世界", publish: "人民文学出版社", price: 39.8,
    inventory: 70, author: "路遥", keyword: "现实主义 小说", count: 0},
    {bookId: 9, isbn: "978-7-123-45678", name: "新书", publish: "新出版社", price: 45.0,
    inventory: 252, author: "新作者", keyword: "新书 出版", count: 0},
    {bookId: 10, isbn: "978-7-123-45678", name: "新书", publish: "新出版社", price: 45.0,
    inventory: 252, author: "新作者", keyword: "新书 出版", count: 0},
    {bookId: 11, isbn: "978-7-123-45678", name: "新书", publish: "新出版社", price: 45.0,
    inventory: 252, author: "新作者", keyword: "新书 出版", count: 0},
    {bookId: 12, isbn: "978-7-123-45678", name: "新书", publish: "新出版社", price: 45.0,
    inventory: 252, author: "新作者", keyword: "新书 出版", count: 0}
])

const searchText = ref('')

onMounted(() => {
    page.currentUser = 'Reader'
    page.currentPage = '/bookBrowse'
    page.currentSubPage = '/bookBrowse'
    color.setOption(2)

    if(user.bookCart.length > 0){
        for(let i = 0; i < books.value.length; i++){
            for(let j = 0; j < user.bookCart.length; j++){
                if(books.value[i].bookId === user.bookCart[j].bookId){
                    books.value[i].count = user.bookCart[j].count
                }
            }
        }
    }
    //getStockList()
    isMounted.value = true
})

function addToCart(book){
    for(let i = 0; i < books.value.length; i++){
        if(books.value[i].bookId === book.bookId){
            books.value[i].count++
        }
    }
    user.bookCart.push(book)
}

function handleCurrentChange(value){
    console.log(value)
}

function handelChange(currentValue, oldValue){
    if(currentValue === 0){
        for(let i = 0; i < user.bookCart.length; i++){
            if(user.bookCart[i].count === 0){
                user.bookCart.splice(i, 1)
            }
        }
    }
}

function searchBook(){

}
</script>