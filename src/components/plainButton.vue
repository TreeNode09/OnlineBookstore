<template>
<el-button :color="color.palette[color.paletteOption].main" plain>
    <slot></slot>
</el-button>
</template>
    
<script setup>
import { useColor } from '@/stores/color'
    
const color = useColor()
</script>