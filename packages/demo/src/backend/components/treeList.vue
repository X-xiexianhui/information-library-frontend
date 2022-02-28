<template>
    <div>
        <p>数据库导航</p>
        <el-input
            v-model="filterText"
            prefix-icon="el-icon-search"
            placeholder="输入表名进行过滤"
        >
        </el-input>
        <el-divider></el-divider>
        <el-tree
            ref="tree"
            :data="data"
            node-key="id"
            highlight-current
            :check-on-click-node="true"
            :filter-node-method="filterNode"
            :props="defaultProps"
            @node-click="getCheckedNodes"
        >
        </el-tree>
    </div>
</template>

<script>
    export default {
        name: 'TreeList',
        props: {
            data: {
                type: Array,
                default: () => ([])
            }
        },
        data() {
            return {
                filterText: '',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            getCheckedNodes(data) {
                console.log(data);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        },
    };
</script>

<style scoped>

</style>
