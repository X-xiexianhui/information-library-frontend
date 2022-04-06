<template>
  <div>
    <vxe-toolbar perfect print export>
      <template #buttons>
        <div style="text-align: left; margin-left: 10px">
          <vxe-button icon="fa fa-plus" status="success" @click="insertEvent($refs.editFieldTable,newLine)">新增
          </vxe-button>
          <vxe-button icon="fa fa-trash-o" status="success" @click="removeEvent($refs.editFieldTable)">移除</vxe-button>
          <vxe-button icon="fa fa-save" status="success" @click="saveEvent()">保存</vxe-button>
        </div>
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="editFieldTable"
      border
      resizable
      keep-source
      show-overflow
      :print-config="{}"
      :export-config="{}"
      :edit-rules="validRules"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell',showStatus: true}"
      size="mini"
      :row-config="{isCurrent: true, useKey: true}"
      :column-config="{isCurrent: true, useKey: true}"
      @edit-actived="editActiveEvent"
      @cell-click="checkEdit"
    >
      <vxe-column field="col_name" title="字段名称" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #edit="{ row }">
          <vxe-input v-model="row.col_name" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="data_type" title="字段类型" :edit-render="{}">
        <template #default="{ row }">
          <span>{{ formatType(row.data_type) }}</span>
        </template>
        <template #edit="{ row }">
          <vxe-select v-model="row.data_type" transfer>
            <vxe-option v-for="item in options" :key="item.key" :value="item.value" :label="item.label"></vxe-option>
          </vxe-select>
        </template>
      </vxe-column>
      <vxe-column field="len" title="字段长度" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #edit="{ row }">
          <vxe-input v-model.number="row.len" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="place" title="小数位数" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #edit="{ row }">
          <vxe-input v-model.number="row.place" type="text" :disabled="placeDisabled"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="PK" title="主键" :edit-render="{}">
        <template #default="{ row }">
          <vxe-switch v-model="row.PK"></vxe-switch>
        </template>
      </vxe-column>
      <vxe-column field="not_null" title="非空" :edit-render="{}">
        <template #default="{ row }">
          <vxe-switch v-model="row.not_null"></vxe-switch>
        </template>
      </vxe-column>
      <vxe-column field="uni" title="唯一" :edit-render="{}">
        <template #default="{ row }">
          <vxe-switch v-model="row.uni"></vxe-switch>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>

import {
  checkData, fullValidEvent, getUpdate,
  insertEvent,
  removeEvent
} from '../../../api/tableManager/tableManager'
import axios from 'axios'
import {error} from '../../../api/error'
import {Message} from 'element-ui'
import bus from '../../../common/bus'

export default {
  name: 'EditField',
  props: {
    tableForm: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      validRules: {
        col_name: [
          {required: true, message: '字段名称必填'},
          {pattern: /^[0-9a-zA-Z_]+$/, message: '只支持英文、数字和下划线'}
        ],
        data_type: [
          {required: true, message: '字段类型必填'}
        ],
        len: [
          {required: true, message: '字段长度必填'},
          {type: 'number', min: 1, max: 127, message: '请输入1-127之间的数字'}
        ],
        place: [{type: 'number', min: 0, max: 65, message: '请输入0-65之间的数字'}]
      },
      lastRow: 1,
      lastColumn: 1,
      newLine: {
        col_name: '', data_type: '', len: '', PK: false, place: 0, not_null: false, uni: false
      },
      currentData: [],
      tableData: [],
      oldData: [],
      placeDisabled: true,
      options: [
        {label: '整数', value: 'int'},
        {label: '小数', value: 'numeric'},
        {label: '字符串', value: 'varchar'},
        {label: '日期', value: 'date'},
        {label: '时间', value: 'time'},
        {label: '日期时间', value: 'datetime'},
        {label: '布尔类型', value: 'bool'}
      ]
    }
  },
  created () {
    this.getTbCol()
  },
  methods: {
    insertEvent,
    removeEvent,
    checkEdit (parma) {
      const ref = this.$refs.editFieldTable
      const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
      console.log(insertRecords)
      console.log(removeRecords)
      if (updateRecords.length === 0) {
        this.lastRow = parma.rowIndex
        this.lastColumn = parma.columnIndex
      }
      if (updateRecords.length >= 1 && (this.lastRow !== parma.rowIndex || this.lastColumn !== parma.columnIndex)) {
        return error('每次只能修改一个字段，请先保存当前修改')
      }
    },
    async getTbCol () {
      if (this.tableForm !== {}) {
        try {
          const res = await axios.get('/api/tb/column', {
            params: {
              db_name: this.tableForm.db_name,
              tb_name: this.tableForm.tb_name
            }
          })
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.tableData = res.data.data.reverse()
            this.oldData = JSON.parse(JSON.stringify(this.tableData))
          }
        } catch (e) {
          error(e.message)
        }
      }
    },
    saveEvent () {
      if (this.tableData.length === 0) {
        this.createTable()
      } else {
        this.editTable()
      }
    },
    editActiveEvent ({row}) {
      this.placeDisabled = row.data_type !== 'numeric'
    },
    checkSave () {
      checkData(this.$refs.editFieldTable)
    },
    formatType (value) {
      switch (value) {
        case 'int':
          return '整数'
        case 'numeric':
          return '小数'
        case 'varchar':
          return '字符串'
        case 'date':
          return '日期'
        case 'time':
          return '时间'
        case 'datetime':
          return '日期时间'
        default:
          return ''
      }
    },
    async createTable () {
      const ref = this.$refs.editFieldTable
      if (this.tableForm.db_name === '' || this.tableForm.tb_name === '') {
        return error('请输入数据库和表名')
      }
      const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
      const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
      if (Saved) {
        return error('请输入数据')
      }
      if (await fullValidEvent(this.$refs.editFieldTable)) {
        return
      }
      let data = {
        db_name: this.tableForm.db_name,
        tb_name: this.tableForm.tb_name,
        column: insertRecords
      }
      try {
        const res = await axios.post('/api/tb/add', data)
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          Message.success(res.data.msg)
          bus.$emit('setShowTbFormEvent', false)
          ref.reloadData(res.data.data.reverse())
        }
      } catch (e) {
        error(e.message)
      }
    },
    async editTable () {
      const ref = this.$refs.editFieldTable
      const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
      const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
      if (Saved) {
        return error('请输入数据')
      }
      if (await fullValidEvent(ref)) {
        return
      }
      let data = {
        db_name: this.tableForm.db_name,
        tb_name: this.tableForm.tb_name,
        insert: insertRecords,
        remove: removeRecords,
        update: getUpdate(updateRecords, this.oldData)
      }
      console.log(data)
      try {
        const res = await axios.post('/api/tb/alter', data)
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          Message.success(res.data.msg)
          ref.reloadData(res.data.data)
        }
      } catch (e) {
        error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
