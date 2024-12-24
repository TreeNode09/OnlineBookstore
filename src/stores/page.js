import { defineStore } from "pinia"
import { ref } from "vue"

export const usePage = defineStore('page', () => {
    const readerPage = ref([
        {path: '/reader', text: '读者中心'},
        {path: '/bookBrowse', text: '浏览图书'}
    ])
    
    const adminPage = ref([
        {path: '/admin', text: '管理中心'},
        {path: '/bookManage', text: '供书管理'},
        {path: '/outOfStock', text: '采购管理'}
    ])

    const currentUser = ref('No login')
    const currentPage = ref('/')
    const currentSubPage = ref('')

    return {readerPage, adminPage, currentUser, currentPage, currentSubPage}
})