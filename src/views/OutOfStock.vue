<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<main-button v-if="!isSelect" @click="startSelect">创建采购单</main-button>
<plain-button v-if="isSelect" @click="endSelect">取消选择</plain-button>
<main-button v-if="isSelect" @click="postSelect">确认选择</main-button>
<main-button @click="toAdd" class="right">添加缺书记录</main-button>
<el-table v-if="isMounted" :data="stocks" ref="tableRef"
    :row-class-name="setRowClass" @selection-change="handleSelectionChange">
    <el-table-column v-if="isSelect" type="selection" :selectable="isSelectable" width="50px"></el-table-column>
    <el-table-column v-else width="50px"></el-table-column>
    <el-table-column prop="bookId" label="书号"></el-table-column>
    <el-table-column prop="bookName" label="书名"></el-table-column>
    <el-table-column label="数量">
        <template #default="scope">
            <el-input-number v-model="stocks[scope.$index].count"/>
        </template>
    </el-table-column>
    <el-table-column prop="inList" label="状态" :filters="inListFilters" :filter-method="filterHandler"></el-table-column>
    <el-table-column prop="stockId" label="缺货记录号"></el-table-column>
    <el-table-column prop="name" label="书名"></el-table-column>
    <el-table-column prop="isbn" label="书号"></el-table-column>
    <el-table-column prop="publish" label="出版社"></el-table-column>
    <el-table-column prop="supplierName" label="供应商"></el-table-column>
    <el-table-column prop="date_" label="生成日期"></el-table-column>
    <!-- <el-table-column v-for="key in Object.keys(stocks)" :prop="key" :lable="key"></el-table-column> -->
    <!-- <el-table-column prop="inList" label="状态" :filters="inListFilters" :filter-method="filterHandler"></el-table-column> -->
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
<<<<<<< HEAD
    {bookId: 1, bookName: 'AL', inList: '采购中', count: 10},
    {bookId: 2, bookName: 'AH', inList: '未采购', count: 10},
    {bookId: 3, bookName: 'AX', inList: '未采购', count: 10}
=======
    
>>>>>>> 89af9631dc1ccf8d419289aa519ac3914b93b00a
])

const inListFilters = [{text: '采购中', value: '采购中'}, {text: '未采购', value: '未采购'}]
function filterHandler(value, row, column){
    return row[column['property']] === value
}

const selectedRow = ref([])
const selectedIndex = ref([])
    
onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/outOfStock'
    color.setOption(1)

    getStockList()
    isMounted.value = true
})

function getStockList()
{
    axios.get('business/stockList'
    ).then(response => {
        stocks.value = response.data.data      
    })
    .catch(error => {alert(error)})
}

function setRowClass({row, rowIndex})
{
    let color = ''
    for(let i = 0; i < selectedIndex.value.length; i++){
        if(selectedIndex.value[i] === row.bookId){
            color = 'selected'
        }
    }
    return color
}

function startSelect()
{
    isSelect.value = true
}

function isSelectable(row)
{
    if(row.inList === '采购中') {return false}
    else {return true}
}

function handleSelectionChange(rows)
{
    selectedRow.value = rows

    selectedIndex.value = []
    if(rows.length > 0){
        for(let i = 0; i < rows.length; i++){
            selectedIndex.value.push(rows[i].bookId)
        }
    }
}

function endSelect()
{
    isSelect.value = false
    tableRef.value.clearSelection()
}

function postSelect()
{
    endSelect()
}

function toAdd(){
    router.push('/addOutOfStock')
}
</script>