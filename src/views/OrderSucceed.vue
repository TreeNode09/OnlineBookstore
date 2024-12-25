<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" :ellipsis="false" class="sub-menu">
    <el-menu-item index="/bookBrowse">图书列表</el-menu-item>
    <el-menu-item index="/bookCart">购物车</el-menu-item>
    <el-menu-item index="/orderSucceed">成功</el-menu-item>
</el-menu>
<el-result v-if="isMounted" icon="success" :title="message.title" :sub-title="message.subtitle">
        <template #extra>
          <main-button @click="toReader">返回首页</main-button>
        </template>
      </el-result>
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

const message = ref({title: '', subtitle: ''})

onMounted(() => {
    page.currentUser = 'Reader'
    page.currentPage = '/bookBrowse'
    page.currentSubPage = '/orderSucceed'
    color.setOption(3)

    if(page.pushOption === 'pay'){
        message.value.title = '支付成功！'
        message.value.subtitle = '我们正在准备您的图书...'
    }
    else if(page.pushOption === 'unpay'){
        message.value.title = '下单成功！'
        message.value.subtitle = '您可稍后支付订单。'
    }
    page.pushOption = ''
    
    isMounted.value = true
})

function toReader(){
    router.push('/reader')
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