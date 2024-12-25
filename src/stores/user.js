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
        balance:250,
        creditLevel:4
    })

    const bookCart = ref([])

    return {userInfo, bookCart}
})