<template>
<h1>Admin</h1>
<el-form :model="form">
    <el-form-item label="书号">
        <el-input v-model="form.isbn"/>
    </el-form-item>
    <el-form-item label="书名">
        <el-input v-model="form.bookName"/>
    </el-form-item>
    <el-form-item label="出版社">
        <el-select v-model="form.press">
            <el-option v-for="press in presses" :label="press.pressName" :value="press.pressName"/>
        </el-select>
    </el-form-item>
    <el-form-item label="供应商">
        <el-select v-model="form.supplier">
            <el-option v-for="supplier in suppliers" :label="supplier.supplierName" :value="supplier.supplierId"/>
        </el-select>
    </el-form-item>
    <el-form-item label="数量">
        <el-input-number v-model="form.count"/>
    </el-form-item>
    <el-form-item>
        <el-button :color="color.palette[color.paletteOption].main">创建</el-button>
    </el-form-item>
</el-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { usePage } from '@/stores/page'
import { useColor } from '@/stores/color'

const page = usePage()
const color = useColor()

onMounted(() => {
    page.currentPage = '/admin'
    page.currentUser = 'Admin'
    color.setOption(1)
})

const form = reactive({isbn: '', bookName: '', press: '', supplier: '', count: 0, date: ''})
const presses = ref([
    {pressName: '铁道出版社', pressId: 4},
    {pressName: '人民邮电出版社', pressId: 5},
    {pressName: '电子工业出版社', pressId: 6},
    {pressName: '民族出版社', pressId: 7}
])
const suppliers = ref([
    {supplierName: '主图', supplierId: 1},
    {supplierName: '东图', supplierId: 2}
])
</script>

<style scoped>

</style>