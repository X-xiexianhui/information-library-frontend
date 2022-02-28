<template>
    <div>
        <vxe-toolbar perfect>
            <template #buttons>
                <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent">新增</vxe-button>
                <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent">移除</vxe-button>
                <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent">保存</vxe-button>
                <vxe-button icon="fa fa-mail-reply" status="perfect" @click="revertEvent">还原</vxe-button>
            </template>
        </vxe-toolbar>
        <vxe-table
            ref="xTable"
            border
            resizable
            keep-source
            show-overflow
            :data="tableData"
            :edit-config="{trigger: 'click', mode: 'cell',showStatus: true}"
            size="mini"
        >
            <vxe-column type="checkbox" width="60"></vxe-column>
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="" title="建立索引字段" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #default="{ row }">
                    <span>{{ row.field }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.fk" transfer>
                        <vxe-option v-for="item in fieldList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column field="type" title="索引类型" :edit-render="{}">
                <template #default="{ row }">
                    <span>{{ row.table }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.type" transfer>
                        <vxe-option v-for="item in typeList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
        </vxe-table>
    </div>
</template>

<script>
    import { VXETable } from 'vxe-table';

    export default {
        name: 'IndexNest',
        props: {
            saveType: {
                type: String,
                default: ''
            },
            createTableName: {
                type: String,
                default: ''
            },
            editTableName: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                typeList: [],
                fieldList: [],
                tableData: [{}]
            };
        },
        watch: {
            editTableName(newValue) {
                console.log(newValue);
            }
        },
        methods: {
            insertEvent() {
                const $table = this.$refs.xTable;
                $table.insertAt({ field: '', type: '' }, -1);
            },
            async removeEvent() {
                const $table = this.$refs.xTable;
                const selectRecords = $table.getCheckboxRecords();
                if (selectRecords.length) {
                    const type = await VXETable.modal.confirm('您确定要删除选中的数据吗?');
                    if (type === 'confirm') {
                        await $table.removeCheckboxRow();
                    }
                } else {
                    await VXETable.modal.message({ content: '请至少选择一条数据', status: 'error' });
                }
            },
            async revertEvent() {
                const type = await VXETable.modal.confirm('您确定要还原数据吗?');
                const $table = this.$refs.xTable;
                if (type === 'confirm') {
                    $table.revertData();
                }
            },
            saveCreate() {
                console.log(this.tableData);
            },
            saveEdit() {
                const $table = this.$refs.xTable;
                const { insertRecords, removeRecords, updateRecords } = $table.getRecordset();
                console.log(insertRecords, removeRecords, updateRecords);
            },
            saveEvent() {
                switch (this.saveType) {
                case 'create':
                    this.saveCreate();
                    break;
                case 'edit':
                    this.saveEdit();
                    break;
                default:
                    break;
                }
                this.$emit('setEditFkEvent', 'FK');
            }
        }
    };
</script>

<style scoped>

</style>
