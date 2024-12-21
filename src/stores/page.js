import { defineStore } from "pinia"
import { ref } from "vue"

export const usePage = defineStore('page', () => {
    const readerPage = ref([
        {path: '/reader', text: '读者中心'},
        {path: '/search', text: '搜索图书'}
    ])
    
    const adminPage = ref([
        {path: '/admin', text: '管理中心'},
        {path: '/outOfStock', text: '采购管理'}
    ])

    const currentUser = ref('No login')
    const currentPage = ref('/')
    const currentSubPage = ref('')

    return {readerPage, adminPage, currentUser, currentPage, currentSubPage}
})