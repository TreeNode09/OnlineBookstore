<template>
<!-- <h1>Start</h1> -->
    <div class = "login-container">
        <div class="logo-container" style="display: flex; justify-content: center; align-items: center;">
            <h1 style="font-weight:bold;color:rgba(0,0,0,0.5);font-style: italic">誉达网上书店</h1>
        </div>
        <div class="login-form">
            <div class="form-group" style="display: flex; justify-content: center;">
            <label for="login_user">Username or email address</label>
            <el-input
                id="login_user"
                v-model="userName"
                style="width: 240px"
                placeholder="input Username or email address"
            />
            </div>
            <div class="form-group" style="display: flex; justify-content: center;">
            <label for="login_password">Password</label>
            <el-input
                id="login_password"
                v-model="password"
                type="password"
                style="width: 240px"
                placeholder="input password"
                show-password
            />
            </div>
            <div v-if="loginOrRegister" style="opacity: 0.4;display: flex; justify-content: center; align-items: center;"><el-button round @click="register"><span style="font-style: italic">register</span></el-button></div>
            <div v-else style="opacity: 0.4;display: flex; justify-content: center; align-items: center;"><el-button round @click="login"><span style="font-style: italic">login</span></el-button></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

onMounted(() => {
    page.currentPage = '/'
    page.currentUser = 'No login'
    color.setOption(0)
})
</script>

<style scoped>
.login-container{
  display: flex;
  flex-direction: column;
  padding-right: 150px;
}
.logo-container {
  color:darkgray;
}
.login-form {
  padding: 30px;
  background-color: rgba(0,0,0,0);
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  color:rgb(203, 179, 179);
  font-size: 17px;
  font-style: italic;
  font-weight: 500;
  margin-bottom: 8px;
}
</style>
