<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/checkOrder">订单</el-menu-item>
</el-menu>
<el-collapse v-if="isMounted" accordion>
    <el-collapse-item v-for="order in orders">
        <template #title>
            <el-descriptions border>
                <el-descriptions-item label="订单号">{{ order.orderId }}</el-descriptions-item>
                <el-descriptions-item label="地址">{{ order.orderAddress }}</el-descriptions-item>
                <el-descriptions-item label="订单金额">￥{{ order.totalPrice }}</el-descriptions-item>
            </el-descriptions>
        </template>
        <el-table :data="order.orderItems">
            <el-table-column prop="bookId" label="书号"/>
            <el-table-column prop="orderNum" label="数量"/>
        </el-table>
    </el-collapse-item>
</el-collapse>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

const isMounted = ref(false)

onMounted(() => {
    page.currentPage = '/checkOrder'
    page.currentUser = 'Reader'
    page.currentSubPage = '/checkOrder'
    color.setOption(2)

    isMounted.value = true
})
    
const orders =[
    {orderId: 13, customerId: "1870726102738018305", state: null, orderAddress : '北京市朝阳区望京街道', totalPrice: 10.0,
    orderItems:[
        {orderItemId: 1984016385,orderId: 13,bookId: 4,orderNum: 2},
        {orderItemId: 2025959426, orderId: 13, bookId: 5, orderNum: 3}]
    },
    {orderId: 14, customerId: "1870726102738018305", state: null, orderAddress : '北京市朝阳区望京街道', totalPrice: 20.0,
    orderItems:[
        {orderItemId: 1984016385,orderId: 13,bookId: 4,orderNum: 2},
        {orderItemId: 2025959426, orderId: 13, bookId: 5, orderNum: 3}]
    },
    {orderId: 15, customerId: "1870726102738018305", state: null, orderAddress : '北京市朝阳区望京街道', totalPrice: 10.5,
    orderItems:[
        {orderItemId: 1984016385,orderId: 13,bookId: 4,orderNum: 2},
        {orderItemId: 2025959426, orderId: 13, bookId: 5, orderNum: 3}]
    }
]
    
</script>