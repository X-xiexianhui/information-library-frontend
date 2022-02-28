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
                            ref="field"
                            :new-line="fieldLine"
                            :save-type="'edit'"
                            :edit-table-name="editTableName"
                        ></edit-nest>
                    </el-tab-pane>
                    <el-tab-pane label="外键设置" name="FK">
                        <fk-nest
                            ref="FK"
                            :new-line="fkLine"
                            :save-type="'edit'"
                            :edit-table-name="editTableName"
                        ></fk-nest>
                    </el-tab-pane>
                    <el-tab-pane label="索引设置" name="index">
                        <index-nest
                            ref="index"
                            :new-line="indexLine"
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
    import bus from '@lljj/bus';
    import fieldNewLine from '../../mixin/fieldNewLine';
    import fkNewLine from '../../mixin/fkNewLine';
    import indexNewLine from '../../mixin/indexNewLine';
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
                isSave: false,
                fieldLine: fieldNewLine,
                fkLine: fkNewLine,
                indexLine: indexNewLine,
                activeName: 'field',
                editTableName: '',
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
        created() {
            bus.$on('checkData', (value) => {
                this.isSave = value;
            });
        },
        methods: {
            checkSave(activeName, oldActiveName) {
                this.$refs[oldActiveName].checkData();
                console.log(this.isSave);
                if (!this.isSave) {
                    this.$alert('请先保存', {});
                }
                return this.isSave;
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
