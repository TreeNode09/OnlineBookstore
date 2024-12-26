<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<main-button v-if="!isSelect" @click="startSelect">创建采购单</main-button>
<plain-button v-if="isSelect" @click="endSelect">取消选择</plain-button>
<main-button v-if="isSelect" @click="postSelect">确认选择</main-button>
<el-select v-if="isSelect" v-model="selectedSupplier" placeholder="选择供书商..." class="search">
    <el-option label="不指定" value="-1"/>
    <el-option v-for="supplier in suppliers"
        :label="supplier.supplierName" :value="supplier.supplierId" @change="changeSupplier"/>
</el-select>
<main-button @click="toAdd" class="right">添加缺书记录</main-button>
<el-table v-if="isMounted" :data="filteredStocks" ref="tableRef"
    :row-class-name="setRowClass" @selection-change="handleSelectionChange">
    <el-table-column v-if="isSelect" type="selection" :selectable="isSelectable" width="50px"></el-table-column>
    <el-table-column v-else width="50px"></el-table-column>
    <el-table-column prop="stockId" label="缺货记录号"></el-table-column>
    <el-table-column prop="name" label="书名"></el-table-column>
    <el-table-column prop="isbn" label="ISBN"></el-table-column>
    <el-table-column prop="publish" label="出版社"></el-table-column>
    <el-table-column prop="supplierName" label="供应商"></el-table-column>
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

const stocks = ref([
    {stockId: 1, bookId: 9, supplierId: "4", num: 81, date_: "2024-12-20 00:00:00", isbn: "978-7-123-45678",
    name: "新书", publish: "新出版社", price: 45.0, author: "新作者", supplierName: "新华书店", address: "北京市西城区西长安街丙17号"}
])
const filteredStocks = ref([
{stockId: 1, bookId: 9, supplierId: "4", num: 81, date_: "2024-12-20 00:00:00", isbn: "978-7-123-45678",
name: "新书", publish: "新出版社", price: 45.0, author: "新作者", supplierName: "新华书店", address: "北京市西城区西长安街丙17号"}
])

const suppliers = ref([
    {supplierId: 1, supplierName: '主图'},
    {supplierId: 2, supplierName: '东图'}
])

const selectedRow = ref([])
const selectedIndex = ref([])   //选中项的行号，不是id
const selectedSupplier = ref(-1)
    
onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/outOfStock'
    color.setOption(1)

    //getStockList()
    isMounted.value = true
})

function getStockList()
{
    axios.get('business/stockList'
    ).then(response => {
        stocks.value = response.data.data
        filteredStocks.value = stocks.value
    })
    .catch(error => {alert(error)})
}

function getStockListBySupplier()
{
    
}

function getSuppliers(){
    axios.get(''
    ).then(response => {
        suppliers.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function postStockList(){
    axios.post('/business/appendPurchases',selectedRow.value)
    .then(response => {
        alert(response.data.msg)    
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

function isSelectable(){
    return (selectedSupplier.value !== -1)
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