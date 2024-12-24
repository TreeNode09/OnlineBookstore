<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" :ellipsis="false" class="sub-menu">
    <el-menu-item index="/bookBrowse">图书列表</el-menu-item>
    <el-menu-item index="/bookCart">购物车</el-menu-item>
</el-menu>
<el-descriptions v-for="book in books" border>
    <el-descriptions-item label="书名" label-width="50px" width="200px">{{ book.name }}</el-descriptions-item>
    <el-descriptions-item label="作者" label-width="75px">{{ book.author }}</el-descriptions-item>
    <el-descriptions-item label="出版社" label-width="100px">{{ book.publish }}</el-descriptions-item>
    <el-descriptions-item label="ISBN">{{ book.isbn }}</el-descriptions-item>
</el-descriptions>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

const isMounted = ref(false)

const books = ref([
    {bookId: 4, isbn: "978-7-108-04348-1", name: "活着", publish: "作家出版社", price: 29.0,
    inventory: 40, author: "余华", keyword: "小说 人生"},
    {bookId: 5, isbn: "978-7-5063-4079-4", name: "百年孤独", publish: "南海出版公司", price: 39.5,
    inventory: 50, author: "加西亚·马尔克斯", keyword: "魔幻现实主义 文学"},
    {bookId: 6, isbn: "978-7-5321-0295-8", name: "围城", publish: "人民文学出版社", price: 32.0,
    inventory: 60, author: "钱钟书", keyword: "讽刺 小说"},
    {bookId: 7, isbn: "978-7-02-010804-5", name: "三体", publish: "重庆出版社", price: 68.0,
    inventory: 80, author: "刘慈欣", keyword: "科幻 小说"},
    {bookId: 8, isbn: "978-7-108-04348-1", name: "平凡的世界", publish: "人民文学出版社", price: 39.8,
    inventory: 70, author: "路遥", keyword: "现实主义 小说"},
    {bookId: 9, isbn: "978-7-123-45678", name: "新书", publish: "新出版社", price: 45.0,
    inventory: 252, author: "新作者", keyword: "新书 出版"}
])

onMounted(() => {
    page.currentUser = 'Reader'
    page.currentPage = '/bookBrowse'
    page.currentSubPage = '/bookBrowse'
    color.setOption(2)

    //getStockList()
    isMounted.value = true
})
</script>