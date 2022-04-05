import bus from '../../common/bus'
import { VXETable } from 'vxe-table'
import {error} from '../error'
import {Message} from 'element-ui'
import axios from 'axios'
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
async function fullValidEvent (ref) {
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
// 创建新表
export async function createTable (ref, tableForm) {
  if (tableForm.db_name === '' || tableForm.tb_name === '') {
    return error('请输入数据库和表名')
  }
  const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
  const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
  if (Saved) {
    return error('请输入数据')
  }
  if (await fullValidEvent(ref)) {
    return
  }
  let data = {
    db_name: tableForm.db_name,
    tb_name: tableForm.tb_name,
    column: insertRecords
  }
  try {
    const res = await axios.post('/api/tb/add', data)
    if (res.data.code !== 200) {
      error(res.data.msg)
    } else {
      Message.success(res.data.msg)
      bus.$emit('setShowTbFormEvent', false)
      ref.reloadData(res.data.data)
    }
  } catch (e) {
    error(e.message)
  }
}
let oldColumn = null
let oldRow = null
let record = null
// 修改表
export async function editTable (ref, tableForm) {
  const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
  const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
  if (Saved) {
    return error('请输入数据')
  }
  if (await fullValidEvent(ref)) {
    return
  }
  let data = {
    db_name: tableForm.db_name,
    tb_name: tableForm.tb_name,
    insert: insertRecords,
    remove: removeRecords,
    update: updateRecords
  }
  try {
    const res = await axios.post('/api/tb/alter', data)
    if (res.data.code !== 200) {
      error(res.data.msg)
    } else {
      Message.success(res.data.msg)
      ref.reloadData(res.data.data)
      oldColumn = null
      oldRow = null
      record = null
    }
  } catch (e) {
    error(e)
  }
}
export function checkEdit (parma) {
  if (oldRow === null) {
    oldRow = parma.rowIndex
  }
  if (oldColumn === null) {
    oldColumn = parma.columnIndex
  }
  if (oldColumn !== parma.columnIndex || oldRow !== parma.rowIndex) {
    if (record === null) {
      record = JSON.parse(JSON.stringify(parma.row))
    }
    for (const Key of Object.keys(parma.row)) {
      if (record[Key] !== parma.row[Key]) {
        return error('每次只能修改一个字段，请先保存当前修改')
      }
    }
  }
}
