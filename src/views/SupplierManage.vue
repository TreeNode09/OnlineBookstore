<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/supplierManage">供书商</el-menu-item>
</el-menu>
<el-table v-if="isMounted" :data="suppliers" style="width: 100%">
    <el-table-column prop="supplierId" label="ID" width="75px"/>
    <el-table-column prop="supplierName" label="供书商名称" width="200px"/>
    <el-table-column prop="address" label="地址"/>
</el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'

import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

const page = usePage()
const color = useColor()

const isMounted = ref(false)
const isDelete = ref(false)

const suppliers = ref([
    {supplierId: 4, supplierName: "新华书店", address: "北京市西城区西长安街丙17号"},
    {supplierId: 5, supplierName: "当当网", address: "北京市朝阳区酒仙桥路2号"},
    {supplierId: 6, supplierName: "京东图书", address: "北京市大兴区亦庄经济开发区科创十一街18号院"}
])

const searchText = ref('')

onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/supplierManage'
    page.currentSubPage = '/supplierManage'
    color.setOption(1)

    getSuppliers()
    isMounted.value = true
})

function getSuppliers(){
    axios.get('/business/supplierList')
    .then(response => {
        suppliers.value = response.data.data
    })
    .catch(error => {alert(error)})
}
</script>