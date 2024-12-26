import axios from "axios"
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
        creditLevel:5
    })
    const getUserINFO = () => {
        axios.get(`/customer/getINFO/${userInfo.value.customerId}`)
        .then(response =>{
            userInfo.value = response.data.data
        })
    }
    const bookCart = ref([])

    return {userInfo, bookCart,getUserINFO}
})