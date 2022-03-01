export function saveEdit(ref, tableName) {
    const { insertRecords, removeRecords, updateRecords } = ref.getRecordset();
    const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0;
    console.log(tableName);
    if (Saved) {
        this.$alert('请输入数据', {});
    }
    ref.reloadData(this.tableData);
}
