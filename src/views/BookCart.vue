<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" :ellipsis="false" class="sub-menu">
    <el-menu-item index="/bookBrowse">图书列表</el-menu-item>
    <el-menu-item index="/bookCart">购物车</el-menu-item>
</el-menu>
<el-table :data="user.bookCart" style="margin-bottom: 20px;">
    <el-table-column prop="name" label="书名"></el-table-column>
    <el-table-column prop="count" label="数量"></el-table-column>
    <el-table-column prop="price" label="单价"></el-table-column>
    <el-table-column width="75px" fixed="right" >
        <template #default="scope">
            <el-button @click="deleteBook(scope.row.bookId)"
                type="danger" size="small">删除</el-button>
        </template>
    </el-table-column>
</el-table>
<h4>总价:</h4><h3>￥{{ totalPrice }}</h3>
<main-button class="right" @click="payOrder">立即支付</main-button>
<main-button class="right" @click="postOrder" style="margin-right: 10px;">确认订单</main-button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'

import { useUser } from '@/stores/user'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()
const user = useUser()

const isMounted = ref(false)

const totalPrice = ref(0)

onMounted(() => {
    page.currentUser = 'Reader'
    page.currentPage = '/bookBrowse'
    page.currentSubPage = '/bookCart'
    color.setOption(2)

    isMounted.value = true
    calcTotalPrice()
})

function postOrder(){
    router.push('/orderSucceed')
}

function payOrder(){
    postOrder()
}

function deleteBook(bookId){
    for(let i = 0; i < user.bookCart.length; i++){
        if(user.bookCart[i].bookId === bookId){
            user.bookCart.splice(i, 1)
        }
    }
    calcTotalPrice()
}

function calcTotalPrice(){
    totalPrice.value = 0
    for(let i = 0; i < user.bookCart.length; i++){
        totalPrice.value += user.bookCart[i].price * user.bookCart[i].count
    }
}
</script>