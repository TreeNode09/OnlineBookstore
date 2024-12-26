import { defineStore } from "pinia"
import { ref } from "vue"

export const useUser = defineStore('user', () => {
    const userInfo = ref({
        // username: 'UserName',
        // password: 'password'
        customerId:4,
        password:'password1234',
        userName:'张三',
        address:'北京市朝阳区望京街道',
        balance:-250,
        creditLevel:4
    })

    const userRight = ref([
        {discount: 0, overdraw: 0},
        {discount: 0.1, overdraw: 0},
        {discount: 0.15, overdraw: 0},
        {discount: 0.15, overdraw: 100},
        {discount: 0.2, overdraw: 200},
        {discount: 0.25, overdraw: '∞'},
    ])

    const bookCart = ref([])

    return {userInfo, userRight, bookCart}
})