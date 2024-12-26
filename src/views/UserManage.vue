<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/userManage">客户管理</el-menu-item>
    <el-menu-item index="/orderManage">订单管理</el-menu-item>
</el-menu>
<div style="display: inline-block; height: 32px;">&emsp;</div>
<main-button @click="getSearchUser" class="right" style="margin-left: 10px;">搜索</main-button>
<el-input v-model="searchText" placeholder="搜索客户..." clearable class="right search"/>
<el-table v-if="isMounted" :data="users" style="width: 100%">
    <el-table-column prop="customerId" label="ID" width="75px"/>
    <el-table-column prop="userName" label="用户名" width="150px"/>
    <el-table-column prop="address" label="地址" min-width="200px"/>
    <el-table-column label="信用等级" width="150px">
        <template #default="scope">
            <span v-if="editIndex!==scope.row.customerId">{{ scope.row.creditLevel }}</span>
            <el-input-number v-else v-model="newInfo.creditLevel" @change="handleChange" :max="5" :min="0"
                style="width: 100px;"/>
        </template>
    </el-table-column>
    <el-table-column prop="total" label="信用积分" width="120px" sortable/>
    <el-table-column prop="balance" label="账户余额" width="200px">
        <template #default="scope">
            <span v-if="editIndex!==scope.row.customerId">{{ scope.row.balance }}</span>
            <el-input v-else v-model="newInfo.balance" style="width: 100px;"/>
        </template>
    </el-table-column>
    <el-table-column width="150px" fixed="right">
        <template #default="scope">
            <main-button v-if="editIndex!==scope.row.customerId" @click="startEdit(scope.row.customerId)"
                size="small" :icon="Edit" round></main-button>
            <main-button v-if="editIndex!==scope.row.customerId" @click="toOrder(scope.row.customerId)"
                size="small" :icon="Memo" round></main-button>
            <el-button v-if="editIndex===scope.row.customerId" @click="endEdit"
                size="small" :icon="CloseBold" type="danger" plain round></el-button>
            <main-button v-if="editIndex===scope.row.customerId" @click="saveEdit(scope.row.customerId)"
                size="small" :icon="Select" round></main-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'

import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { useUser } from '@/stores/user'
import { CloseBold, Edit, Memo, Select } from '@element-plus/icons-vue'

const page = usePage()
const color = useColor()
const user = useUser()

const isMounted = ref(false)
const editIndex = ref(-1)

const users = ref([
    {customerId: 4, password: 'password1234', userName: '张三', address: '北京市朝阳区望京街道',
    balance: -250, creditLevel: 4, total: 4799},
    {customerId: 5, password: 'password1234', userName: '张三', address: '北京市朝阳区望京街道',
    balance: -250, creditLevel: 4, total: 4799},
    {customerId: 6, password: 'password1234', userName: '张三', address: '北京市朝阳区望京街道',
    balance: -250, creditLevel: 4, total: 4799},
    {customerId: 7, password: 'password1234', userName: '张三', address: '北京市朝阳区望京街道',
    balance: -250, creditLevel: 4, total: 4799}
])

const searchText = ref('')
const newInfo = ref({})

onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/userManage'
    page.currentSubPage = '/userManage'
    color.setOption(1)

    //getUserList()
    isMounted.value = true
})

function getUserList(){
    axios.get('', 
    ).then(response => {
        books.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function getSearchUser(){
    axios.get('',
    ).then(response => {
        users.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function postUserInfo(){
    axios.post('',
    ).then(response => {
        users.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function handleChange(currentValue, oldValue){
    if(currentValue > 0){
        newInfo.value.total = user.userRight[currentValue - 1].nextLevel
    }
    else{
        newInfo.value.total = 0
    }
}

function toOrder(customerId){
    page.pushOption = customerId
    router.push('/orderManage')
}

function startEdit(customerId){
    editIndex.value = customerId
    for(let i = 0; i < users.value.length; i++){
        if(users.value[i].customerId === customerId){
            let keys = Object.keys(users.value[i])
            for(let j = 0; j < keys.length; j++){
                newInfo.value[keys[j]] = users.value[i][keys[j]]
            }
        }
    }
}

function saveEdit(customerId){
    //postUserInfo()
    for(let i = 0; i < users.value.length; i++){
        if(users.value[i].customerId === customerId){
            users.value[i] = newInfo.value 
        }
    }
    endEdit()
}

function endEdit(){
    editIndex.value = -1
    newInfo.value = {}
}
</script>