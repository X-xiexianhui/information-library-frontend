<template>
    <div>
        <p>数据库管理</p>
        <el-input
            v-model="filterText"
            prefix-icon="el-icon-search"
            placeholder="输入表名进行过滤"
        >
        </el-input>
        <el-divider></el-divider>
        <span style="padding-bottom: 10px">数据库表：</span>
        <el-tree
            ref="tree"
            :data="data"
            :node-key="data.id"
            highlight-current
            :check-on-click-node="true"
            :filter-node-method="filterNode"
            :props="defaultProps"
            @node-click="getCheckedNodes"
        >
        </el-tree>
        <div class="button">
            <el-divider></el-divider>
            <el-button size="mini" @click="rename">重命名</el-button>
            <el-button size="mini" @click="deleteTable">删除表</el-button>
        </div>
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
                selectTable: ''
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            getCheckedNodes(val) {
                this.selectTable = val.label;
                this.$emit('setEditTableNameEvent', this.selectTable);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            rename() {
                console.log(this.selectTable);
            },
            deleteTable() {
                console.log('delete');
            },
        },
    };
</script>

<style scoped>
.button{
    bottom: 5%;
    position: absolute;
}
</style>
