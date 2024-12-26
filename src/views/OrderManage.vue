<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/userManage">客户管理</el-menu-item>
    <el-menu-item index="/orderManage">订单管理</el-menu-item>
</el-menu>
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