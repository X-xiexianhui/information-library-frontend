import bus from '../../common/bus'
import { VXETable } from 'vxe-table'
// 检查数据
export function checkData (ref) {
  const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
  const value = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
  bus.$emit('checkDataEvent', value)
}
// 插入新行
export function insertEvent (ref) {
  ref.insertAt(ref.newLine, -1).then(r => {})
}
// 移除数据
export async function removeEvent (ref) {
  const selectRecords = ref.getCheckboxRecords()
  if (selectRecords.length) {
    const type = await VXETable.modal.confirm('您确定要删除选中的数据吗?')
    if (type === 'confirm') {
      await ref.removeCheckboxRow()
    }
  } else {
    await VXETable.modal.message({ content: '请至少选择一条数据', status: 'error' })
  }
}
// 还原数据
export async function revertEvent (ref) {
  const type = await VXETable.modal.confirm('您确定要还原数据吗?')
  if (type === 'confirm') {
    ref.revertData()
  }
}
// 创建新表
export function saveAdd (ref, tableForm) {
  if (tableForm.dbName === '' || tableForm.tbName === '') {
    return this.$alert('请输入数据库和表名', '警告', {confirmButtonText: '确定', callback: () => {}})
  }
  const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
  const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
  if (Saved) {
    return this.$alert('请输入数据', '警告', {confirmButtonText: '确定', callback: () => {}})
  }
  ref.reloadData()
}
// 修改表
export function saveEdit (ref, tableForm) {
  const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
  const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
  if (Saved) {
    return this.$alert('请输入数据', '警告', {confirmButtonText: '确定', callback: () => {}})
  }
  ref.reloadData(this.tableData)
}
