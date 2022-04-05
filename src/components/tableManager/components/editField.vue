<template>
  <div>
    <vxe-toolbar perfect print export>
      <template #buttons>
        <div style="text-align: left">
          <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent($refs.editFieldTable,newLine)">新增
          </vxe-button>
          <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent($refs.editFieldTable)">移除</vxe-button>
          <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent()">保存</vxe-button>
          <vxe-button icon="fa fa-save" status="perfect" @click="getInsert()">获取新增</vxe-button>
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
      :row-config="{isCurrent: true}"
      @edit-actived="editActiveEvent"
      @cell-click="checkEdit($refs.editFieldTable,$refs.row)"
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
        <template #edit="{ row }">
          <vxe-checkbox v-model="row.PK"></vxe-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="not_null" title="非空" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-checkbox v-model="row.not_null"></vxe-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="uni" title="唯一" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-checkbox v-model="row.uni"></vxe-checkbox>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>

import {
  checkData, checkEdit,
  insertEvent,
  removeEvent,
  createTable,
  editTable
} from '../../../api/tableManager/tableManager'
import axios from 'axios'
import {error} from '../../../api/error'

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
      newLine: {
        col_name: '', data_type: '', len: '', PK: false, place: 0, not_null: false, uni: false
      },
      tableData: [],
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
    checkEdit,
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
            this.tableData = res.data.data
          }
        } catch (e) {
          error(e.message)
        }
      }
    },
    saveEvent () {
      if (this.tableData.length === 0) {
        createTable(this.$refs.editFieldTable, this.tableForm)
      } else {
        editTable(this.$refs.editFieldTable, this.tableForm)
      }
    },
    getInsert () {
      const { insertRecords, removeRecords, updateRecords } = this.$refs.editFieldTable.getRecordset()
      console.log('insert:', insertRecords)
      console.log('remove:', removeRecords)
      console.log('update:', updateRecords)
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
    }
  }
}
</script>

<style scoped>

</style>
