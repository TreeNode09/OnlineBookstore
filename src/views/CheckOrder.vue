<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/checkOrder">订单</el-menu-item>
</el-menu>
<el-select v-model="orderState" placeholder="订单完成状态" @change="getOrders" style="width: 200px; margin-bottom: 10px;">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
</el-select>
<el-scrollbar class="scroll" max-height="100%">
    <el-collapse v-if="orderState!==''" accordion>
        <el-collapse-item v-for="order in orders">
            <template #title>
                <el-descriptions :column="5" border style="width: calc(100% - 50px);">
                    <el-descriptions-item label="订单号" label-width="75px" width="100px">{{ order.orderId }}</el-descriptions-item>
                    <el-descriptions-item label="地址" label-width="55px">{{ order.orderAddress }}</el-descriptions-item>
                    <el-descriptions-item label="订单金额" label-width="80px" width="100px">￥{{ order.totalPrice }}</el-descriptions-item>
                    <el-descriptions-item label="状态" label-width="55px" width="75px">{{ order.state }}</el-descriptions-item>
                    <el-descriptions-item label-width="0" width="75px">
                        <main-button v-if="order.state==='未支付'" @click="payOrder(order.orderId,order.totalPrice)"
                            class="right" size="small">支付</main-button>
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
</el-scrollbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import {useUser} from '@/stores/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'


const page = usePage()
const color = useColor()

const isMounted = ref(false)

const user = useUser()

const orderState = ref('')

const options = [
    {value: '未支付', label: '未支付'},
    {value: '已支付', label: '已支付'},
    {value: '已完成', label: '已完成'}
]

const getOrders  = () =>{
    if(orderState.value === "未支付"){
        getCartOrders()
    }
    else if(orderState.value === "已支付"){
        getHistoryOrders()
    }
}

onMounted(() => {
    page.currentPage = '/checkOrder'
    page.currentUser = 'Reader'
    page.currentSubPage = '/checkOrder'
    color.setOption(2)
    isMounted.value = true
})
    
const orders =ref([
    // {orderId: 13, customerId: "1870726102738018305", state: 0, orderAddress : '北京市朝阳区望京街道', totalPrice: 10.0,
    // orderItems:[
    //     {orderItemId: 1984016385,orderId: 13,bookId: 4,orderNum: 2},
    //     {orderItemId: 2025959426, orderId: 13, bookId: 5, orderNum: 3}]
    // },
    // {orderId: 14, customerId: "1870726102738018305", state: 0, orderAddress : '北京市朝阳区望京街道', totalPrice: 20.0,
    // orderItems:[
    //     {orderItemId: 1984016385,orderId: 13,bookId: 4,orderNum: 2},
    //     {orderItemId: 2025959426, orderId: 13, bookId: 5, orderNum: 3}]
    // },
    // {orderId: 15, customerId: "1870726102738018305", state: 1, orderAddress : '北京市朝阳区望京街道', totalPrice: 10.5,
    // orderItems:[
    //     {orderItemId: 1984016385,orderId: 13,bookId: 4,orderNum: 2},
    //     {orderItemId: 2025959426, orderId: 13, bookId: 5, orderNum: 3}]
    // }
])

async function payOrder(orderId) {
  try {
    // postOrder完成后，继续执行下面的代码
    axios.get('/customer/payBill', { params: { orderId: orderId } })
      .then(response => {
        if (response.data.rs) {
          ElMessage({
            message: response.data.msg,
            type: 'success'
          });
          page.pushOption = 'pay';
          router.push('/orderSucceed');
        } else {
          ElMessage({
            message: response.data.msg,
            type: 'success'
          });
        }
      })
      .catch(error => {
        // 处理get请求的错误
        console.error(error);
        ElMessage({
          message: '支付请求失败',
          type: 'error'
        });
      });
  } catch (error) {
    // 处理post请求的错误
    console.error(error);
    ElMessage({
      message: '订单创建失败',
      type: 'error'
    });
  }
}

const getCartOrders = () =>{
    axios.get(`/customer/cartOrder/${user.userInfo.customerId}`)
    .then(response =>{
        orders.value = response.data.data
        switchOrderState()
    })
}

const getHistoryOrders = () =>{
    axios.get(`/customer/historyOrder/${user.userInfo.customerId}`)
    .then(response =>{
        orders.value = response.data.data
        switchOrderState()
    })
}

function switchOrderState(){
    for(let i = 0; i < orders.value.length; i++){
        if(orders.value[i].state === 0){
            orders.value[i].state = '未支付'
        }
        else{
            orders.value[i].state = '已支付'
        }
    }
}
</script>
