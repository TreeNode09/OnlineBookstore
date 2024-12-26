import { defineStore } from "pinia"
import { ref } from "vue"

export const useUser = defineStore('user', () => {
    const userInfo = ref({
        customerId: 4,
        password: 'password1234',
        userName: '张三',
        address: '北京市朝阳区望京街道',
        balance: -250,
        creditLevel: 4,
        total: 4799
    })

    const userRight = ref([
        {discount: 0, overdraw: 0, nextLevel: 100},
        {discount: 0.1, overdraw: 0, nextLevel: 500},
        {discount: 0.15, overdraw: 0, nextLevel: 2000},
        {discount: 0.15, overdraw: 100, nextLevel: 5000},
        {discount: 0.2, overdraw: 200, nextLevel: 5000},
        {discount: 0.25, overdraw: '∞'},
    ])

    const bookCart = ref([])

    return {userInfo, userRight, bookCart}
})