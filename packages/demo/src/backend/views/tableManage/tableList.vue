<template>
    <el-container>
        <el-aside width="200px">
            <tree-list
                :data="data"
            ></tree-list>
        </el-aside>
        <el-main></el-main>
    </el-container>
</template>

<script>
    import TreeList from '../../components/treeList';

    export default {
        name: 'TableList',
        components: { TreeList },
        data() {
            return {
                data: [
                    { id: 1, label: '一级' },
                    { id: 2, label: '二级' },
                    { id: 3, label: '三级' },
                ],
            };
        },
    };
</script>

<style scoped>

</style>
