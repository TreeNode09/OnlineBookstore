<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<main-button v-if="!isSelect" @click="startSelect">创建采购单</main-button>
<el-select v-if="isSelect"v-model="selectedSupplierId" placeholder="供应商" @change="getStockListBySupplier" style="width: 200px;margin-right:16px">
    <el-option
    v-for="item in suppliers"
    :key="item.supplierId"
    :label="item.supplierName"
    :value="item.supplierId"
    />
</el-select>
<plain-button v-if="isSelect" @click="endSelect">取消选择</plain-button>
<main-button v-if="isSelect" @click="postSelect">确认选择</main-button>
<main-button @click="toAdd" class="right">添加缺书记录</main-button>
<el-table v-if="isMounted" :data="stocks" ref="tableRef"
    :row-class-name="setRowClass" @selection-change="handleSelectionChange">
    <el-table-column v-if="isSelect" type="selection" width="50px"></el-table-column>
    <el-table-column v-else width="50px"></el-table-column>
    <el-table-column prop="stockId" label="缺货记录号"></el-table-column>
    <el-table-column prop="name" label="书名"></el-table-column>
    <el-table-column prop="isbn" label="ISBN"></el-table-column>
    <el-table-column prop="publish" label="出版社"></el-table-column>
    <el-table-column label="数量">
        <template #default="scope">
            <span v-if="selectedIndex.length===0||selectedIndex.indexOf(scope.$index)===-1">{{ scope.row.num }}</span>
            <el-input-number v-else v-model="scope.row.num"/>
        </template>
    </el-table-column>
    <el-table-column prop="date_" label="生成日期"></el-table-column>
    <!-- <el-table-column v-for="key in Object.keys(stocks)" :prop="key" :lable="key"></el-table-column> -->
</el-table>
</template>
    
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'

import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'
    
const page = usePage()
const color = useColor()

const tableRef = ref()

const isMounted = ref(false)
const isSelect = ref(false)

const selectedSupplierId = ref()

const stocks = ref([])

const suppliers = ref([
])

const selectedRow = ref([])
const selectedIndex = ref([])   //选中项的行号，不是id
const selectedSupplier = ref(-1)
    
onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/outOfStock'
    color.setOption(1)
    getSuppliers()
    getStockList()
    isMounted.value = true
})
function getStockList()
{
    axios.get(`business/stockList/all`
    ).then(response => {
        stocks.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function getStockListBySupplier()
{
    console.log(selectedSupplierId.value)
    axios.get(`business/stockList/${selectedSupplierId.value}`
    ).then(response => {
        console.log(response.data.data)
        stocks.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function getSuppliers(){
    axios.get('/business/supplierList')
    .then(response => {
        suppliers.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function postStockList(){
    axios.post(`/business/appendPurchases/${selectedSupplierId.value}`,selectedRow.value)
    .then(response => {
        ElMessage({
            message: response.data.msg,
            type: 'successful'
        })
    })
    .catch(error => {alert(error)})
}

function setRowClass({row, rowIndex})
{
    let color = ''
    for(let i = 0; i < selectedIndex.value.length; i++){
        if(selectedIndex.value[i] === rowIndex){
            color = 'selected'
        }
    }
    return color
}

function startSelect()
{
    isSelect.value = true
}

function handleSelectionChange(rows)
{
    selectedRow.value = rows

    selectedIndex.value = []
    for(let i = 0; i < rows.length; i++){
        for(let j = 0; j < stocks.value.length; j++){
            if(rows[i].bookId === stocks.value[j].bookId){
                selectedIndex.value.push(j)
            }
        }
    }
}

function changeSupplier(value){
    selectedSupplier.value = value
    getStockListBySupplier()
}

function endSelect()
{
    isSelect.value = false
    tableRef.value.clearSelection()
}

function postSelect()
{
    postStockList()
    endSelect()
}

function toAdd(){
    router.push('/addOutOfStock')
}
</script>