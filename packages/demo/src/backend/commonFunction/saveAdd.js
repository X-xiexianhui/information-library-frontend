export function saveAdd(ref, tableName) {
    console.log(tableName);
    if (tableName === '') {
        return;
    }
    const { insertRecords, removeRecords, updateRecords } = ref.getRecordset();
    const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0;
    if (Saved) {
        this.$alert('请输入数据', {});
    }
    ref.reloadData(this.tableData);
}
