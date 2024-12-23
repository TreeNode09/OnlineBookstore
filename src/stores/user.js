import { defineStore } from "pinia"
import { ref } from "vue"

export const useUser = defineStore('user', () => {
    const userInfo = ref({
        username: 'UserName',
        password: 'password'
    })

    const bookCart = ref([])

    return {userInfo, bookCart}
})