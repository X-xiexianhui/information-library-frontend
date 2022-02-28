<template>
    <div>
        <editor-header class="nav"></editor-header>
        <el-container>
            <el-aside>
                <tree-list
                    :data="data"
                    class="tree-list"
                >
                </tree-list>
            </el-aside>
            <el-main>
                <el-tabs
                    v-model="activeName"
                    tab-position="left"
                    style="margin-top: 20px"
                    :before-leave="checkSave"
                    @tab-click="initIsSave"
                >
                    <el-tab-pane label="字段设置" name="createTable">
                        <edit-nest @setCreateTableEvent="setCreateTable"></edit-nest>
                    </el-tab-pane>
                    <el-tab-pane label="外键设置" name="FK">配置管理</el-tab-pane>
                    <el-tab-pane label="索引设置" name="index">角色管理</el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import TreeList from '../../components/treeList';
    import EditNest from '../../components/editNest';
    import EditorHeader from '@/_common/components/EditorHeader';

    export default {
        name: 'AddTable',
        components: { EditorHeader, EditNest, TreeList },
        data() {
            return {
                activeName: 'createTable',
                isSave: {
                    createTable: false,
                    FK: true,
                    index: true,
                },
                tableConfig: {
                    fields: [{
                        name: '',
                        type: '',
                        length: '',
                        restriction: []
                    }],
                    primaryKey: [],
                    foreignKeys: [{
                        key: '',
                        f_table: '',
                        f_key: ''
                    }],
                },
                options: [
                    { label: '整数', value: 'int' },
                    { label: '小数', value: 'numberic' },
                    { label: '字符串', value: 'varchar' },
                    { label: '日期', value: 'date' },
                    { label: '时间', value: 'time' },
                    { label: '日期时间', value: 'datetime' },
                    // 存文件路径，文件存于文件夹
                    { label: '文件', value: 'char' },
                ],
                data: [
                    {
                        id: '1',
                        label: '一级'
                    },
                    {
                        id: '2',
                        label: '二级'
                    },
                    {
                        id: '3',
                        label: '三级'
                    },
                ]
            };
        },
        methods: {
            checkSave(activeName, oldActiveName) {
                if (!this.isSave[oldActiveName]) {
                    this.$alert('请先保存', {});
                }
                console.log(this.isSave[oldActiveName]);
                return this.isSave[oldActiveName];
            },
            initIsSave() {
                this.isSave[this.activeName] = false;
            },
            setCreateTable() {
                this.isSave.createTable = true;
            }
        },
    };
</script>
<style scoped>
.nav{
    top: 0;
    height: 100px;
    width: 100%;
    position: fixed;
}
.tree-list{
    width: 80%;
    color: #8c939d;
    margin-left: 10%;
}
.el-aside{
    width: 200px;
    height:calc(100vh);
    overflow-y: scroll;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-container{
    margin-top: 100px;
    height: calc(100vh - 100px);
}
.el-main{
    padding: 0;
    overflow-y: scroll;
    height: calc(100vh);
}
</style>
