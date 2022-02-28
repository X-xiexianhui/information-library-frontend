<template>
    <el-menu
        :unique-opened="true"
        :default-active="this.$route.path"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-submenu v-for="(item,index) in menuList" :key="index" :index="index.toString()">
            <template slot="title">
                <span>{{ item.label }}</span>
            </template>
            <el-menu-item
                v-for="(subItem,subIndex) in item.children"
                :key="subIndex" :index="subItem.path"
            >
                <a :href="'frontend.html#'+subItem.path+'?form='+subItem.formName"
                   target="_blank" style="text-decoration:none;color:#FFFFFF;"
                >{{ subItem.label }}</a>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>

    export default {
        name: 'Menu',
        data() {
            return {
                menuList: [{
                    label: '多级菜单',
                    children: [{
                                   path: '/home',
                                   label: '首页',
                                   formName: '1'
                               },
                               {
                                   path: '/test',
                                   label: '测试页',
                                   formName: '2'
                               },
                    ]
                }],
            };
        },
    };
</script>

<style scoped>

</style>
