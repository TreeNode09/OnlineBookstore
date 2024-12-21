<template>
<el-menu :default-active="page.currentSubPage" mode="horizontal" :router="true" class="sub-menu">
    <el-menu-item index="/outOfStock">缺书管理</el-menu-item>
    <el-menu-item index="/purchaseList">采购单管理</el-menu-item>
</el-menu>
<main-button v-if="!isSelect" @click="startSelect">创建采购单</main-button>
<main-button v-if="isSelect" @click="endSelect">取消选择</main-button>
<main-button v-if="isSelect" @click="postSelect">确认选择</main-button>
<el-table v-if="isMounted" :data="stocks" :row-class-name="setRowClass" @selection-change="handleSelectionChange">
    <el-table-column v-if="isSelect" type="selection" :selectable="isSelectable" width="50px"></el-table-column>
    <el-table-column v-else width="50px"></el-table-column>
    <el-table-column prop="bookId" label="书号"></el-table-column>
    <el-table-column prop="bookName" label="书名"></el-table-column>
    <el-table-column prop="inList" label="已加入采购单"></el-table-column>
</el-table>
</template>
    
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { usePage } from '@/stores/page'
    
const page = usePage()

const isMounted = ref(false)
const isSelect = ref(false)

const stocks = ref([
    {bookId: 1, bookName: 'AL', inList: 'Yes'},
    {bookId: 2, bookName: 'AH', inList: 'No'},
    {bookId: 3, bookName: 'AX', inList: 'No'}
])

const selectedRow = ref([])
const selectedIndex = ref([])
    
onMounted(() => {
    page.currentPage = '/outOfStock'
    page.currentSubPage = '/outOfStock'
    // axios.get('business/stockList'
    // ).then(response => {
    //     stocks.value = response.data.data
        isMounted.value = true
    // })
    // .catch(error => {alert(error)})
})

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
    if(row.inList === 'Yes') {return false}
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
}

function postSelect()
{
    endSelect()
}
</script>