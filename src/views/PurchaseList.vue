<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<main-button v-if="!isSelect" @click="startSelect">更新采购单</main-button>
<plain-button v-if="isSelect" @click="endSelect">取消更新</plain-button>
<main-button v-if="isSelect" @click="postSelect">完成采购</main-button>
<el-table v-if="isMounted" :data="purchases" ref="tableRef"
    :row-class-name="setRowClass" @selection-change="handleSelectionChange">
    <el-table-column v-if="isSelect" type="selection" :selectable="isSelectable" width="50px"></el-table-column>
    <el-table-column v-else width="50px"></el-table-column>
    <el-table-column prop="stockId" label="缺货记录号"></el-table-column>
    <el-table-column prop="name" label="书名"></el-table-column>
    <el-table-column prop="isbn" label="书号"></el-table-column>
    <el-table-column prop="publish" label="出版社"></el-table-column>
    <el-table-column prop="supplierName" label="供应商"></el-table-column>
    <el-table-column prop="date_" label="缺货日期" sortable></el-table-column>
    <el-table-column prop="finished" label="状态" :filters="inListFilters" :filter-method="filterHandler"></el-table-column>
</el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

const tableRef = ref()

const isMounted = ref(false)
const isSelect = ref(false)
const purchases = ref([
    // {purchaseId: 20241223, stockId: 1, bookId: 9, supplierId: "4", num: 81, date_: "2024-12-20 00:00:10", isbn: "978-7-123-45678",
    // name: "新书", publish: "新出版社", price: 45.0, author: "新作者", supplierName: "新华书店", address: "北京市西城区西长安街丙17号",
    // quantity: 81, finished: false}
])

const selectedRow = ref([])
const selectedIndex = ref([])

onMounted(() => {
    page.currentUser = 'Admin'
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/purchaseList'
    color.setOption(1)

    getPurchaseList()
    isMounted.value = true

    for(let i = 0; i < purchases.value.length; i++){
        if(purchases.value[i].finished === true) {purchases.value[i].finished = '已完成'}
        else {purchases.value[i].finished = '采购中'}
    }
})

function getPurchaseList(){
    axios.get('/business/purchaseList', 
    ).then(response => {
        purchases.value = response.data.data
    })
    .catch(error => {alert(error)})
}

function postPurchaseList(){
    for(let i = 0; i < selectedRow.value.length; i++){
        if(selectedRow.value[i].finished === '已完成') {selectedRow.value[i].finished = true}
        else {selectedRow.value[i].finished = false}

        axios.post('', 
        ).then(response => {
            
        })
        .catch(error => {alert(error)})
    }
}

const inListFilters = [{text: '已完成', value: '已完成'}, {text: '采购中', value: '采购中'}]
function filterHandler(value, row, column){
    return (row[column['property']] === value)
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

function isSelectable(row)
{
    if(row.finished === '采购中') {return true}
    else {return false}
}

function handleSelectionChange(rows)
{
    selectedRow.value = rows

    selectedIndex.value = []
    for(let i = 0; i < rows.length; i++){
        for(let j = 0; j < purchases.value.length; j++){
            if(rows[i].purchaseId === purchases.value[j].purchaseId){
                selectedIndex.value.push(j)
            }
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
    postPurchaseList()
    endSelect()
    getPurchaseList()
}
</script>