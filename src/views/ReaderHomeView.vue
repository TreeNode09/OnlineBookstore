<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/reader">个人信息</el-menu-item>
</el-menu>
<main-button v-if="!isEditing" style="margin-bottom: 20px;" @click="startEdit">修改信息</main-button>
<plain-button v-if="isEditing" style="margin-bottom: 20px;" @click="endEdit">取消修改</plain-button>
<main-button v-if="isEditing" style="margin-bottom: 20px;" @click="saveEdit">确认修改</main-button>
<el-descriptions :column="3" border>
    <el-descriptions-item label="用户名" label-width="80px" width="300px">
        <div v-if="!isEditing">
            <h3>{{ user.userInfo.userName }}&emsp;</h3>
            <span>ID: {{ user.userInfo.customerId }}</span>
        </div>
        <el-input v-else v-model="newInfo.userName"></el-input>
    </el-descriptions-item>
    <el-descriptions-item label="默认收货地址" label-width="110px">
        <span v-if="!isEditing">{{ user.userInfo.address }}</span>
        <el-input v-else v-model="newInfo.address"></el-input>
    </el-descriptions-item>
    <el-descriptions-item label="信用等级" :rowspan="3" label-width="20px" width="150px">
        <h3>Lv.{{ user.userInfo.creditLevel }}</h3>
        <el-progress :percentage="100*user.userInfo.total/user.userRight[user.userInfo.creditLevel].nextLevel"
            :format="handelFormat" type="circle" :color="color.palette[color.paletteOption].main"/>
    </el-descriptions-item>
    <el-descriptions-item label="账户余额" :span="user.userInfo.balance>0?2:1">
        <h3 v-if="user.userInfo.balance>=0">￥{{ user.userInfo.balance.toFixed(2) }}</h3>
        <h3 v-else>￥0</h3>
    </el-descriptions-item>
    <el-descriptions-item v-if="user.userInfo.balance<0" label="透支金额">
        <h3>￥{{ -user.userInfo.balance.toFixed(2) }}/{{ user.userRight[user.userInfo.creditLevel].overdraw }}</h3>
    </el-descriptions-item>
    <el-descriptions-item :span="2" label="充值">
        <el-radio-group v-model="selectedCharge">
            <el-radio-button v-for="option in chargeOptions" :label="'￥'+option.toString()" :value="option"/>
        </el-radio-group>
        <main-button class="right" @click="saveCharge">确认充值</main-button>
        <plain-button v-if="selectedCharge>0" @click="endCharge"
            class="right" style="margin-right: 10px;">取消充值</plain-button>
    </el-descriptions-item>
</el-descriptions>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { useUser } from '@/stores/user'

const page = usePage()
const color = useColor()
const user = useUser()

const isMounted = ref(false)
const isEditing = ref(false)

const chargeOptions = ref([50, 100, 200, 500, 1000])
const selectedCharge = ref(0)

const newInfo = ref({customerId: 4, password: '', userName: '', address:'', balance: -250, creditLevel:4, total: 4799})

onMounted(() => {
    page.currentPage = '/reader'
    page.currentUser = 'Reader'
    page.currentSubPage = '/reader'
    color.setOption(2)

    //getUserInfo()
    isMounted.value = true
})

function getUserInfo(){
    axios.get('', 
    ).then(response => {
        newInfo.value = user.userInfo
    })
    .catch(error => {alert(error)})
}

function postCharge(){
    axios.post('', 
    ).then(response => {
        
    })
    .catch(error => {alert(error)})
}

function handelFormat(percentage){
    return user.userInfo.total.toString() + '/' + user.userRight[user.userInfo.creditLevel].nextLevel.toString()
}

function startEdit(){
    newInfo.value = user.userInfo
    isEditing.value = true
}

function endEdit(){
    isEditing.value = false
}

function saveEdit(){
    user.userInfo = newInfo.value
    endEdit()
}

function endCharge(){
    selectedCharge.value = 0
}

function saveCharge(){
    //postCharge()
    endCharge()
}
</script>