<template>
    <div>
        <editor-header class="nav"></editor-header>
        <el-container>
            <el-aside>
                <tree-list
                    :data="data"
                    class="tree-list"
                    @setEditTableNameEvent="setEditTableName"
                >
                </tree-list>
            </el-aside>
            <el-main>
                <el-tabs
                    v-model="activeName"
                    tab-position="left"
                    style="margin-top: 20px"
                    :before-leave="checkSave"
                >
                    <el-tab-pane label="字段设置" name="field">
                        <edit-nest
                            :save-type="'edit'"
                            :edit-table-name="editTableName"
                            @setEditTableEvent="setIsSave"
                        ></edit-nest>
                    </el-tab-pane>
                    <el-tab-pane label="外键设置" name="FK">
                        <fk-nest
                            :save-type="'edit'"
                            :edit-table-name="editTableName"
                            @setEditFkEvent="setIsSave"
                        ></fk-nest>
                    </el-tab-pane>
                    <el-tab-pane label="索引设置" name="index">
                        <index-nest
                            :save-type="'edit'"
                            :edit-table-name="editTableName"
                        ></index-nest>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import TreeList from '../../components/treeList';
    import EditNest from '../../components/editNest';
    import EditorHeader from '@/_common/components/EditorHeader';
    import FkNest from '../../components/FkNest';
    import IndexNest from '../../components/indexNest';

    export default {
        name: 'AddTable',
        components: {
            IndexNest,
            FkNest,
            EditorHeader,
            EditNest,
            TreeList
        },
        data() {
            return {
                activeName: 'field',
                isSave: {
                    field: true,
                    FK: true,
                    index: true,
                },
                editTableName: '',
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
                data: [{
                           id: '2',
                           label: '一级'
                       },
                       {
                           id: '3',
                           label: '二级'
                       },
                       {
                           id: '4',
                           label: '三级'
                       }],
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
            setIsSave(key, value) {
                this.isSave[key] = value;
            },
            setEditTableName(value) {
                this.editTableName = value;
            }
        },
    };
</script>
<style scoped>
@import "backend.css";
</style>
