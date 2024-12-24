<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" :ellipsis="false" class="sub-menu">
    <el-menu-item index="/bookBrowse">图书列表</el-menu-item>
    <el-menu-item index="/bookCart">购物车</el-menu-item>
    <el-menu-item index="/orderSucceed">成功</el-menu-item>
</el-menu>
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

onMounted(() => {
    page.currentUser = 'Reader'
    page.currentPage = '/bookBrowse'
    page.currentSubPage = '/orderSucceed'
    color.setOption(3)

    isMounted.value = true
})
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