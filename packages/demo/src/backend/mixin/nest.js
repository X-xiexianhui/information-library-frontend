import { VXETable } from 'vxe-table';
import bus from '@lljj/bus';

export default {
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
        },
        newLine: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        editTableName(newValue) {
            console.log(newValue);
        }
    },
    methods: {
        checkData() {
            let value = false;
            if (this.saveType === 'create') {
                value = this.tableData === 0;
            }
            if (this.saveType === 'edit') {
                const $table = this.$refs.xTable;
                const { insertRecords, removeRecords, updateRecords } = $table.getRecordset();
                value = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0;
            }
            bus.$emit('checkData', value);
        },
        insertEvent() {
            const $table = this.$refs.xTable;
            $table.insertAt(this.newLine, -1);
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
        }
    }
};
