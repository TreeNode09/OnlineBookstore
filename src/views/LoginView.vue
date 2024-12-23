<template>
<div class = "login-container" style="display: flex; justify-content: center; align-items: center;">
    <div class="logo-container" >
        <h1 style="font-weight:bold; color:rgba(0,0,0,0.5); font-style: italic">誉达网上书店</h1>
    </div>
    <div class="login-form">
        <div class="form-group" style="display: flex; justify-content: center;">
            <label for="login_user">用户名</label>
            <el-input id="login_user" v-model="user.userInfo.username"
                style="width: 240px" placeholder="input Username or email address"/>
        </div>
        <div class="form-group" style="display: flex; justify-content: center;">
            <label for="login_password">密码</label>
            <el-input id="login_password" v-model="user.userInfo.password" type="password"
                style="width: 240px" placeholder="input password" show-password/>
        </div>
        <div style="opacity: 0.4;display: flex; justify-content: center; align-items: center;">
            <el-button @click="toHome" :color="color.palette[color.paletteOption].pale">登录</el-button>
        </div>
    </div>
</div>
</template>
    
<script setup>
import { onMounted } from 'vue'
import router from '@/router'

import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { useUser } from '@/stores/user'

const page = usePage()
const color = useColor()
const user = useUser()
    
onMounted(() => {
    page.currentPage = '/login'
})

function toHome(){
    router.push('/reader')
}
</script>

<style scoped>
.login-container
{
    display: flex;
    flex-direction: column;
}

.logo-container
{
    color:var(--dark);
}

.login-form
{
    padding: 30px;
    background-color: var(--white);
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 var(--shadowLight);
}

.form-group
{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.form-group label
{
    color: var(--dark);
    font-size: 17px;
    font-style: italic;
    font-weight: 500;
    margin-bottom: 8px;
}
</style>