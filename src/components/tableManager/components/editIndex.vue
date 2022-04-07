<template>
    <div>
        <vxe-toolbar perfect print export>
            <template #buttons>
              <div style="text-align: left">
                <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent($refs.editIndexTable, newLine)">新增</vxe-button>
                <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent($refs.editIndexTable)">移除</vxe-button>
                <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent()">保存</vxe-button>
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
            :edit-config="{trigger: 'dblclick', mode: 'cell',showStatus: true}"
            size="mini"
            :row-config="{isCurrent: true, useKey: true}"
            :column-config="{isCurrent: true, useKey: true}"
        >
            <vxe-column field="columns" title="建立索引字段" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #default="{ row }">
                  <span>{{formatMultiSelect(row.columns)}}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.columns" transfer :multiple="true">
                        <vxe-option v-for="item in fieldList" :key="item.value" :value="item.value" :label="item.value"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column field="uni" title="唯一索引" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #default="{ row }">
                <vxe-switch v-model="row.uni"></vxe-switch>
              </template>
            </vxe-column>
        </vxe-table>
    </div>
</template>

<script>

import {checkData, insertEvent, removeEvent} from '../../../api/tableManager/tableManager'
import {error} from '../../../api/error'

export default {
  name: 'EditIndex',
  props: {
    tableForm: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      Save: true,
      newLine: { columns: [], unique: false },
      validRules: {column1s: [{required: true, message: '索引字段必填'}]
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
    this.getFieldList(this.tableForm)
  },
  methods: {
    insertEvent,
    removeEvent,
    saveEvent () {

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
        const res = await this.$http.get('tb/filed/get', {params: {dbName: val.dbName, tbName: val.tbName}})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          this.fieldList = res.data.data
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
