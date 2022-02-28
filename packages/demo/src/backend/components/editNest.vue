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
            @edit-actived="editActiveEvent"
        >
            <vxe-column type="checkbox" width="60"></vxe-column>
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="字段名称" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #edit="{ row }">
                    <vxe-input v-model="row.name" type="text"></vxe-input>
                </template>
            </vxe-column>
            <vxe-column field="type" title="字段类型" :edit-render="{}">
                <template #default="{ row }">
                    <span>{{ formatType(row.type) }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.type" transfer>
                        <vxe-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column field="length" title="字段长度" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #edit="{ row }">
                    <vxe-input v-model.number="row.length" type="text"></vxe-input>
                </template>
            </vxe-column>
            <vxe-column field="place" title="小数位数" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #edit="{ row }">
                    <vxe-input v-model.number="row.place" type="text" :disabled="placeDisabled"></vxe-input>
                </template>
            </vxe-column>
            <vxe-column field="pk" title="主键" :edit-render="{}">
                <template #edit="{ row }">
                    <vxe-checkbox v-model="row.pk"></vxe-checkbox>
                </template>
            </vxe-column>
            <vxe-column field="notNull" title="非空" :edit-render="{}">
                <template #edit="{ row }">
                    <vxe-checkbox v-model="row.notNull"></vxe-checkbox>
                </template>
            </vxe-column>
            <vxe-column field="unique" title="唯一" :edit-render="{}">
                <template #edit="{ row }">
                    <vxe-checkbox v-model="row.unique"></vxe-checkbox>
                </template>
            </vxe-column>
        </vxe-table>
    </div>
</template>

<script>
    import { VXETable } from 'vxe-table';

    export default {
        name: 'EditNest',
        data() {
            return {
                placeDisabled: true,
                options: [
                    { label: '整数', value: 'int' },
                    { label: '小数', value: 'numeric' },
                    { label: '字符串', value: 'varchar' },
                    { label: '日期', value: 'date' },
                    { label: '时间', value: 'time' },
                    { label: '日期时间', value: 'datetime' },
                    { label: '文件', value: 'char' },
                ],
                tableData: [
                    {
                        name: '', type: '', length: '', place: '', pk: '', notNull: '', unique: ''
                    },
                    {
                        name: '', type: '', length: '', place: '', pk: '', notNull: '', unique: ''
                    },
                    {
                        name: '', type: '', length: '', place: '', pk: '', notNull: '', unique: ''
                    }
                ]
            };
        },
        methods: {
            formatType(value) {
                switch (value) {
                case 'int':
                    return '整数';
                case 'numeric':
                    return '小数';
                case 'varchar':
                    return '字符串';
                case 'date':
                    return '日期';
                case 'time':
                    return '时间';
                case 'datetime':
                    return '日期时间';
                default:
                    return '';
                }
            },
            editActiveEvent({ row }) {
                this.placeDisabled = row.type !== 'numeric';
            },
            insertEvent() {
                const $table = this.$refs.xTable;
                $table.insertAt({}, -1);
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
            saveEvent() {
                const $table = this.$refs.xTable;
                const { insertRecords, removeRecords, updateRecords } = $table.getRecordset();
                // eslint-disable-next-line max-len
                VXETable.modal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`);
                this.$emit('setCreateTableEvent');
            }
        }
    };
</script>

<style scoped>

</style>
