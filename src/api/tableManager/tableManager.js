import bus from '../../common/bus'
import { VXETable } from 'vxe-table'

// 检查数据
export function checkData (ref) {
  const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
  const value = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
  bus.$emit('checkDataEvent', value)
}
// 插入新行
export function insertEvent (ref, record) {
  ref.insertAt(record, -1).then(() => {})
}
// 移除数据
export async function removeEvent (ref) {
  const selectRecords = ref.getCurrentRecord()
  // console.log(selectRecords)
  if (selectRecords.length) {
    const type = await VXETable.modal.confirm('您确定要删除选中的数据吗?')
    if (type === 'confirm') {
      await ref.removeCurrentRow()
    }
  } else {
    await VXETable.modal.message({ content: '请至少选择一条数据', status: 'error' })
  }
}
// 校验数据
export async function fullValidEvent (ref) {
  const errMap = await ref.fullValidate().catch(errMap => errMap)
  if (errMap) {
    const msgList = []
    Object.values(errMap).forEach(errList => {
      errList.forEach(params => {
        const { rowIndex, column, rules } = params
        rules.forEach(rule => {
          msgList.push(`第 ${rowIndex + 1} 行 ${column.title} 校验错误：${rule.message}`)
        })
      })
    })
    VXETable.modal.message({
      status: 'error',
      slots: {
        default () {
          return [
            <div class="red" style="max-height: 400px;overflow: auto;">
              {
                msgList.map(msg => <div>{msg}</div>)
              }
            </div>
          ]
        }
      }
    }).then(() => {})
  }
  return errMap
}
