import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColor = defineStore('color', () => {
    const palette = ref([
        //灰色，未登录
        {white: '#F3F6F6', light: '#D5DBDB', pale: '#BFC9CA', main: '#A9B7B8', dark: '#748B8D', black: '#424949',
        shadowLight: 'rgba(57, 95, 95, 0.25)', shadowDark: 'rgba(35, 57, 57, 0.25)'},

        //蓝色，管理员
        {white: '#F3F6F6', light: '#AED6F1', pale: '#85C1E9', main: '#2796DF', dark: '#1C71A9', black: '#13222D',
        shadowLight: 'rgba(92, 190, 255, 0.25)', shadowDark: 'rgba(0, 81, 135, 0.25)'}, 

        //棕色，读者
        {white: '#FFF3E0', light: '#F4DA9B', pale: '#E0B469', main: '#C69242', dark: '#956B2B', black: '#57350C',
        shadowLight: 'rgba(238, 178, 0, 0.25)', shadowDark: 'rgba(94, 44, 0, 0.25)'},

        //绿色，支付成功
        {white: '#EAF6DD', light: '#B2DE81', pale: '#82C954', main: '#5CB508', dark: '#428205', black: '#153500',
        shadowLight: 'rgba(79, 206, 0, 0.25)', shadowDark: 'rgba(24, 64, 0, 0.25)'},

        //黄色，评级提高
        {white: '#FBF3CF', light: '#F7E28A', pale: '#F6CC58', main: '#E8B211', dark: '#B7850B', black: '#A86C00',
        shadowLight: 'rgba(255, 191, 15, 0.25)', shadowDark: 'rgba(134, 99, 0, 0.25)'}
    ])

    const paletteOption = ref(0)

    const currentColor = ref(0)

    function setOption(option){
        paletteOption.value = option
    }

    return {palette, paletteOption, currentColor, setOption}
})