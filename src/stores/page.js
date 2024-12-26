import { defineStore } from "pinia"
import { ref } from "vue"

export const usePage = defineStore('page', () => {
    const readerPage = ref([
        {path: '/reader', text: '客户中心'},
        {path: '/bookBrowse', text: '购买图书'},
        {path: '/checkOrder', text: '查看订单'}
    ])
    
    const adminPage = ref([
        {path: '/admin', text: '管理中心'},
        {path: '/bookManage', text: '供书管理'},
        {path: '/outOfStock', text: '采购管理'},
        {path: '/userManage', text: '客户管理'},
        {path: '/supplierManage', text: '供书商管理'}
    ])

    const currentUser = ref('No login')
    const currentPage = ref('/')
    const currentSubPage = ref('')

    const pushOption = ref('')

    return {readerPage, adminPage, currentUser, currentPage, currentSubPage, pushOption}
})