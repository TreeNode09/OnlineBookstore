<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/userManage">客户管理</el-menu-item>
    <el-menu-item index="/orderManage">订单管理</el-menu-item>
</el-menu>
<el-select v-model="orderState" placeholder="订单完成状态" @change="getOrders" style="width: 200px; margin-bottom: 10px;">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
</el-select>
<el-collapse v-if="orderState!==''" accordion>
    <el-collapse-item v-for="order in orders">
        <template #title>
            <el-descriptions :column="5" border style="width: calc(100% - 50px);">
                <el-descriptions-item label="订单号" label-width="75px" width="100px">{{ order.orderId }}</el-descriptions-item>
                <el-descriptions-item label="地址" label-width="55px">{{ order.orderAddress }}</el-descriptions-item>
                <el-descriptions-item label="订单金额" label-width="80px" width="100px">￥{{ order.totalPrice }}</el-descriptions-item>
                <el-descriptions-item label="状态" label-width="55px" width="75px">{{ order.state }}</el-descriptions-item>
                <el-descriptions-item label-width="0" width="75px">
                    <main-button v-if="order.state==='已支付'" @click="finishOrder(order.orderId)"
                        class="right" size="small">完成</main-button>
                </el-descriptions-item>
            </el-descriptions>
        </template>
        <el-table :data="order.orderItems">
            <el-table-column prop="name" label="书名"/>
            <el-table-column prop="isbn" label="ISBN"/>
            <el-table-column prop="orderNum" label="数量"/>
            <el-table-column prop="price" label="单价"/>
        </el-table>
    </el-collapse-item>
</el-collapse>
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

const userId = ref(0)
const orderList = ref([])

onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/orderManage'
    page.currentSubPage = '/orderManage'
    color.setOption(1)

    userId.value = page.pushOption
    page.pushOption = ''
    //getOrderList()
    isMounted.value = true
})

function getOrderList(){
    axios.get('', 
    ).then(response => {
        orderList.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function finishOrder(orderId){
    for(let i = 0; i < orderList.value.length; i++){
        if(orderList.value[i].orderId === orderId){
            orderList.value[i].state = '已完成'
        }
    }
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