import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import {ElMessage} from 'element-plus'

export const useUser = defineStore('user', () => {
    const userInfo = ref({
        customerId: 4,
    })

    const getUserInfo = () => {
        axios.get(`/customer/getINFO/${userInfo.value.customerId}`)
        .then(response =>{
            userInfo.value = response.data.data
        })
    }

    const postUserInfo = (newInfo) => {
        axios.put('/customer/updateCustomerINFO' , newInfo)
        .then(response =>{
            ElMessage({
                message: response.data.msg,
                type: 'success'
            })
        })
    }

    const userRight = ref([
        {discount: 0, overdraw: 0, nextLevel: 100},
        {discount: 0.1, overdraw: 0, nextLevel: 500},
        {discount: 0.15, overdraw: 0, nextLevel: 2000},
        {discount: 0.15, overdraw: 100, nextLevel: 5000},
        {discount: 0.2, overdraw: 200, nextLevel: 10000},
        {discount: 0.25, overdraw: '∞', nextLevel: 10000}  
    ])

    const bookCart = ref([])

    return {userInfo,userRight,bookCart,getUserInfo, postUserInfo}
})