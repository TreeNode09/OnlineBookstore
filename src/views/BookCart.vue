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
<el-descriptions :column="2" border>
    <el-descriptions-item label="总价" label-width="80px">
        <h2>￥{{ totalPrice }}</h2>
    </el-descriptions-item>
    <el-descriptions-item label="收货地址" label-width="80px" width="70%">
        <el-input v-model="user.userInfo.address"></el-input>
    </el-descriptions-item>
    <el-descriptions-item label="账户余额">
        <h3>￥{{ user.userInfo.balance }}</h3>
    </el-descriptions-item>
    <el-descriptions-item label="">
        <main-button class="right" @click="payOrder"
            :disabled="user.userInfo.address === '' || user.bookCart.length === 0">立即支付</main-button>
        <main-button class="right" @click="unpayOrder" style="margin-right: 10px;"
            :disabled="user.userInfo.address === '' || user.bookCart.length === 0">确认订单</main-button>
    </el-descriptions-item>
</el-descriptions>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'
import axios from 'axios'
import { useUser } from '@/stores/user'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { ElMessage } from 'element-plus'

const page = usePage()
const color = useColor()
const user = useUser()

const isMounted = ref(false)

const totalPrice = ref(0)

const orderId = ref(0)

onMounted(() => {
    page.currentUser = 'Reader'
    page.currentPage = '/bookBrowse'
    page.currentSubPage = '/bookCart'
    color.setOption(2)

    isMounted.value = true
    calcTotalPrice()
})

async function payOrder() {
  try {
    // 等待postOrder函数中的请求完成
    await postOrder();
    // postOrder完成后，继续执行下面的代码
    axios.get('/customer/payBill', { params: { orderId: orderId.value } })
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
            type: 'warning'
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

// 修改postOrder函数，使其返回一个Promise
function postOrder() {
  console.log(user.bookCart);
  return axios.post(`customer/createOrder/${user.userInfo.customerId}`, user.bookCart, {
    params: {
      totalPrice: totalPrice.value,
      address: user.userInfo.address
    }
  })
  .then(response => {
    orderId.value = response.data.data;
    console.log(orderId.value);
    ElMessage({
      message: response.data.msg,
      type: 'success'
    });
    return response; // 返回响应对象，以便在payOrder中使用
  })
  .catch(error => {
    throw error; // 如果有错误，抛出异常
  });
}

function unpayOrder(){
    postOrder()
    page.pushOption = 'unpay'
    router.push('/orderSucceed')
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
        totalPrice.value += user.bookCart[i].price * user.bookCart[i].orderNum
    }
}
</script>