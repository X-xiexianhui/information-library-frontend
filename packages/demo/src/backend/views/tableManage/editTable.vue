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
            <el-main >
                <p v-if="tableName === ''">请选择要修改的数据库</p>
                <el-tabs
                    v-else
                    v-model="activeName"
                    tab-position="left"
                    style="margin-top: 20px"
                    :before-leave="checkSave"
                >
                    <el-tab-pane label="字段设置" name="field">
                        <edit-nest
                            ref="field"
                            :new-line="fieldLine"
                            :tb-name="tableName"
                        ></edit-nest>
                    </el-tab-pane>
                    <el-tab-pane label="外键设置" name="FK">
                        <fk-nest
                            ref="FK"
                            :new-line="fkLine"
                            :tb-name="tableName"
                        ></fk-nest>
                    </el-tab-pane>
                    <el-tab-pane label="索引设置" name="index">
                        <index-nest
                            ref="index"
                            :new-line="indexLine"
                            :tb-name="tableName"
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
                isSave: true,
                tableName: '',
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
            bus.$on('setTableName', (value) => {
                this.tableName = value;
            });
        },
        methods: {
            checkSave(activeName, oldActiveName) {
                console.log(this.$refs.field.tableName);
                this.$refs[oldActiveName].checkData();
                console.log(this.isSave);
                if (!this.isSave) {
                    this.$alert('请先保存', {});
                }
                return this.isSave;
            },
        },
    };
</script>
<style scoped>
@import "backend.css";
</style>
