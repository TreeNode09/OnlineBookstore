<template><div :style="{
    '--white': color.palette[color.paletteOption].white,
    '--light': color.palette[color.paletteOption].light,
    '--pale': color.palette[color.paletteOption].pale,
    '--main': color.palette[color.paletteOption].main,
    '--dark': color.palette[color.paletteOption].dark,
    '--black': color.palette[color.paletteOption].black,
    '--shadowLight': color.palette[color.paletteOption].shadowLight,
    '--shadowDark': color.palette[color.paletteOption].shadowDark}">

<el-menu :default-active="page.currentPage" :ellipsis="false" :router="true"
    mode="horizontal" :active-text-color="color.palette[color.paletteOption].white">
    <el-menu-item index="/reader" :disabled="page.currentUser==='No login'"
        :class="{'is-active': page.currentUser==='Reader'}">读者</el-menu-item>
    <el-menu-item index="/admin" :disabled="page.currentUser==='No login'"
        :class="{'is-active': page.currentUser==='Admin'}">管理员</el-menu-item>
    <el-menu-item v-if="page.currentUser==='No login'" index="/login">登录</el-menu-item>
    <el-menu-item v-else index="/">退出</el-menu-item>
</el-menu>
<div class="full">
    <div class="inline aside">
        <el-menu v-if="page.currentUser==='Reader'" :default-active="page.currentPage" :router="true"
            :active-text-color="color.palette[color.paletteOption].black">
            <el-menu-item v-for="page in page.readerPage" :index="page.path"
                :class="{'is-active': page.currentPage===page.path}">{{ page.text }}</el-menu-item>
        </el-menu>
        <el-menu v-if="page.currentUser==='Admin'" :default-active="page.currentPage" :router="true"
            :active-text-color="color.palette[color.paletteOption].black">
            <el-menu-item v-for="page in page.adminPage" :index="page.path"
                :class="{'is-active': page.currentPage===page.path}">{{ page.text }}</el-menu-item>
        </el-menu>
    </div>   
    <div class="inline main">
        <router-view/>
    </div>
</div>

</div></template>

<script setup>
import { ref } from 'vue'
import { useColor } from '@/stores/color'
import { usePage } from '@/stores/page'

const color = useColor()
const page = usePage()
</script>

<style>
*
{
    box-sizing: border-box;
}

body
{
    margin: 0;
}
</style>

<!-- 自定义样式 -->
<style>
.el-table,
.el-form
{
    --el-text-color-regular: var(--dark);
    --el-color-primary: var(--main);
}

.el-table
{
    margin-top: 20px;

    box-shadow: 0 3px 10px var(--shadowLight);

    --el-table-header-text-color: var(--dark);
    --el-table-border-color: var(--white);
}

.el-table th, .el-table td
{
    transition: width 0.2s;
}

.el-table .ascending .sort-caret.ascending
{
    border-bottom-color: var(--main);
}

.el-table .descending .sort-caret.descending
{
    border-top-color: var(--main);
}

.el-table .selected
{
    color: var(--black);
    
    --el-table-tr-bg-color: var(--light);
    --el-table-row-hover-bg-color: var(--light);
}

.el-form
{
    --el-border-color: var(--light);
    --el-border-color-hover: var(--main);
    --el-text-color-placeholder: var(--pale);
}

.sub-menu
{
    margin-bottom: 20px;
    margin-left: -20px;
    margin-right: -75px;

    --el-menu-active-color: var(--main);
    --el-menu-hover-bg-color: var(--shadowLight);
    --el-menu-hover-text-color: var(--dark);
}

.el-input
{
    --el-input-border-color: var(--light);
    --el-input-text-color: var(--dark);
    --el-input-placeholder-color: var(--pale);
}

.el-input:hover,
.el-input__wrapper.is-focus
{
    --el-input-hover-border-color: var(--pale);
    --el-input-focus-border-color: var(--main);
}

.el-input-number
{
    --el-fill-color-light: var(--white);
    --el-border: var(--pale);
    --el-color-primary: var(--main);
}

.el-scrollbar.scroll
{
    height: calc(100% - 181px);
    margin-top: 20px;

    border: 1px solid var(--main);
    border-radius: 10px;
}

.el-descriptions
{
    margin-bottom: 10px;
    box-shadow: 0 3px 10px var(--shadowLight);

    --el-text-color-primary: var(--black);
    --el-text-color-regular: var(--dark);
    --el-border-color-lighter: var(--light);
    --el-descriptions-item-bordered-label-background: var(--white);

    transition: border-color 0.5s;
}

.el-descriptions:hover
{
    --el-border-color-lighter: var(--pale);
}

.el-button
{
    --el-button-text-color: var(--white);
}

.el-pagination
{
    display: inline-flex;

    --el-pagination-hover-color: var(--main);
    --el-text-color-primary: var(--black);
    --el-fill-color-blank: rgba(0, 0, 0, 0);
    --el-pagination-button-disabled-color: var(--pale);
}

.el-collapse-item
{
    margin-bottom: 10px;

    border: 1px solid var(--light);
    box-shadow: 0 3px 10px var(--shadowLight);
}

.el-collapse-item__content
{
    padding-bottom: 0;
}

.el-collapse .el-descriptions
{
    margin: auto 0;
}

.el-collapse .el-table{
    margin-top: 0;
}

.el-progress--circle
{
    vertical-align: top;
}

.el-radio-button
{
    --el-radio-button-checked-bg-color: var(--main);
    --el-radio-button-checked-border-color: var(--dark);
}

.el-radio-button__inner
{
    border: 1px solid var(--light);
}

.el-radio-button__inner:hover
{
    color: var(--pale);
}

.right
{
    float: right;
}

.search
{
    width: 30%;
}

.small-input
{
    width: 100px;
}
</style>

<!-- 字体 -->
 <style>
h1, h2, h3, h4, h5, h6
{
    display: inline;
    margin: 0;
}
</style>

<!-- 布局样式 -->
<style scoped>
.el-menu--horizontal
{
    padding-left: 200px;
    padding-right: 100px;

    background-color: var(--main);

    transition: background-color 0.5s;
}

.el-menu--horizontal .el-menu-item
{
    color: var(--white);

    width: 100px;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):hover
{
    color: var(--white);

    background-color: var(--shadowDark);
}

.sub-title
{
    color: var(--white);
}

.el-menu--horizontal .el-menu-item:not(.is-disabled).is-active
{
    background-color: var(--dark);
}

.el-menu--horizontal > .el-menu-item:nth-child(2)
{
    margin-right: auto;
}

.full
{
    height: calc(100vh - 61px);

    background-color: var(--white);

    transition: background-color 0.5s;
}

.inline
{
    display: inline-block;
    vertical-align: top;
    
    height: 100%;
}

.aside
{
    width: 200px;

    background-color: var(--light);

    transition: background-color 0.5s;
}

.main
{
    color: var(--black);

    width: calc(100vw - 250px);
    padding: 0 75px 0 20px;
}

.el-menu--vertical
{
    width: 200px;
    height: 100%;

    background-color: rgba(0, 0, 0, 0);
}

.el-menu--vertical .el-menu-item
{
    color: var(--black);
    justify-content: center;
}

.el-menu--vertical .el-menu-item:not(.is-disabled):hover
{
    color: var(--black);

    background-color: var(--shadowLight);
}

.el-menu--vertical .el-menu-item:not(.is-disabled).is-active
{
    text-decoration: underline solid 1px;
    background-color: var(--pale);
}
</style>
