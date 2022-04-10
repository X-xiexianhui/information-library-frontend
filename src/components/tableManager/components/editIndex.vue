<template>
  <div>
    <vxe-toolbar perfect print export>
      <template #buttons>
        <div style="text-align: left">
          <vxe-button icon="fa fa-plus" status="success" @click="insertEvent($refs.editIndexTable, newLine)">新增
          </vxe-button>
          <vxe-button icon="fa fa-trash-o" status="success" @click="removeEvent($refs.editIndexTable)">移除</vxe-button>
          <vxe-button icon="fa fa-save" status="success" @click="saveEvent()">保存</vxe-button>
        </div>
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="editIndexTable"
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
    >
      <vxe-column field="columns" title="建立索引字段" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #default="{ row }">
          <span>{{ formatMultiSelect(row.columns) }}</span>
        </template>
        <template #edit="{ row }">
          <vxe-select v-model="row.columns" transfer :multiple="true" :clearable="true">
            <vxe-option v-for="item in fieldList" :key="item.value" :value="item.value"
                        :label="item.value"></vxe-option>
          </vxe-select>
        </template>
      </vxe-column>
      <vxe-column field="uni" title="唯一索引" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #default="{ row }">
          <vxe-switch v-model="row.uni"></vxe-switch>
        </template>
        <template #edit="{ row }">
          <vxe-switch v-model="row.uni"></vxe-switch>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>

import {checkData, fullValidEvent, insertEvent, removeEvent} from '../../../api/tableManager/tableManager'
import {error} from '../../../api/error'
import axios from 'axios'
import {Message} from 'element-ui'
import bus from '../../../common/bus'

export default {
  name: 'EditIndex',
  props: {
    tableForm: Object
  },
  data () {
    return {
      Save: true,
      newLine: {columns: [], unique: false},
      validRules: {
        column1s: [{required: true, message: '索引字段必填'}]
      },
      typeList: [
        {key: 1, value: '普通索引', label: '普通索引'},
        {key: 2, value: '联合索引', label: '联合索引'},
        {key: 3, value: '唯一索引', label: '唯一索引'},
        {key: 4, value: '全文索引', label: '全文索引'}
      ],
      fieldList: [],
      tableData: []
    }
  },
  created () {
    bus.$on('getFieldsEvent', () => {
      this.getFieldList(this.tableForm)
      console.log(this.tableForm)
    })
  },
  methods: {
    insertEvent,
    removeEvent,
    async saveEvent () {
      const ref = this.$refs.editIndexTable
      const {insertRecords, removeRecords, updateRecords} = ref.getRecordset()
      const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
      if (Saved) {
        return error('请输入数据')
      }
      if (await fullValidEvent(ref)) {
        return
      }
      let data = {
        db_name: this.tableForm.dbName,
        tb_name: this.tb_name.tbName,
        insert: insertRecords,
        remove: removeRecords,
        update: updateRecords
      }
      try {
        const res = await axios.post('/api/index/alter', data)
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          Message.success(res.data.msg)
          ref.reloadData(res.data.data.reverse())
        }
      } catch (e) {
        error(e)
      }
    },
    checkSave () {
      checkData(this.$refs.editIndexTable)
    },
    formatMultiSelect (values) {
      if (values) {
        return values.join(',')
      }
      return ''
    },
    async getFieldList (val) {
      try {
        const res = await this.$http.get('/api/index/column', {params: {db_name: val.db_name, tb_name: val.tb_name}})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.fieldList = res.data.data.reverse()
        }
      } catch (e) {
        error(e.message)
      }
    }
  }
}
</script>

<style scoped>

</style>
