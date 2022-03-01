import bus from '@lljj/bus';

export function checkData(ref) {
    const { insertRecords, removeRecords, updateRecords } = ref.getRecordset();
    const value = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0;
    bus.$emit('checkDataEvent', value);
}
