<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/supplierManage">供书商</el-menu-item>
</el-menu>
<el-table v-if="isMounted" :data="suppliers" style="width: 100%">
    <el-table-column prop="supplierId" label="ID" width="75px"/>
    <el-table-column prop="supplierName" label="供书商名称" width="200px"/>
    <el-table-column prop="address" label="地址"/>
    <el-table-column>
        <template #default="scope" fixed="right">
            <el-button  @click="getBooksBySupplierId(scope.row.supplierId)"
                type="default">查看书目信息</el-button>
        </template>
    </el-table-column>
</el-table>
<el-dialog
    v-model="dialogVisible"
    title="供书商书目信息"
    width= "60%"
    :show-close="false"
    :before-close="handleClose"
  >
  <el-table :data="supplierBooks" style="width: 100%">
        <el-table-column prop="name" label="书名" width="200px"/>
        <el-table-column prop="isbn" label="ISBN" width="175px"/>
        <el-table-column prop="publish" label="出版社" width="200px"/>
        <el-table-column prop="price" label="售价/元" width="100px" sortable/>
        <el-table-column prop="inventory" label="库存量" width="75px"/>
        <el-table-column prop="author" label="作者" width="150px"/>
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" style="margin-right: 20px;">取消查看书目信息</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'

import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

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

const dialogVisible = ref(false)

const supplierBooks = ref([])

onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/supplierManage'
    page.currentSubPage = '/supplierManage'
    color.setOption(1)
    getSuppliers()
    isMounted.value = true
})

const getBooksBySupplierId = (value) =>{
    dialogVisible.value = true
    // console.log(value)
    axios.get(`/business/supplierBooks/${value}`)
    .then(response =>{
        supplierBooks.value = response.data.data
    })

}
function getSuppliers(){
    axios.get('/business/supplierList')
    .then(response => {
        suppliers.value = response.data.data
    })
    .catch(error => {alert(error)})
}

const appendBook = (value)=>{
    console.log(value)
}

const handleClose = () =>{

}
</script>

<style>
span.el-dialog__title {
    --el-text-color-primary: #1C71A9;
}
</style>