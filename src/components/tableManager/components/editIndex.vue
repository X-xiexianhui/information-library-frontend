<template>
    <div>
        <vxe-toolbar perfect print export>
            <template #buttons>
              <div style="text-align: left">
                <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent($refs.editIndexTable, newLine)">新增</vxe-button>
                <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent($refs.editIndexTable)">移除</vxe-button>
                <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent($refs.editIndexTable, tableForm)">保存</vxe-button>
                <vxe-button icon="fa fa-mail-reply" status="perfect" @click="revertEvent($refs.editIndexTable)">还原</vxe-button>
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
        >
            <vxe-column type="checkbox" width="60"></vxe-column>
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="field" title="建立索引字段" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #default="{ row }">
                    <span>{{ row.field }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.fk" transfer :multiple="row.type==='union'">
                        <vxe-option v-for="item in fieldList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column field="type" title="索引类型" :edit-render="{}">
                <template #default="{ row }">
                    <span>{{ row.type }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.type" transfer>
                        <vxe-option v-for="item in typeList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
        </vxe-table>
    </div>
</template>

<script>

import {checkData, insertEvent, removeEvent, revertEvent, saveEdit} from '../../../api/tableManager/tableManager'

export default {
  name: 'EditIndex',
  props: {
    saveEvent: {
      type: Function,
      default: saveEdit
    },
    tableForm: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      Save: true,
      newLine: { field: '', type: '' },
      validRules: {
        field: [{required: true, message: '索引字段必填'}],
        type: [{required: true, message: '索引类型必填'}]
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
  methods: {
    insertEvent,
    revertEvent,
    removeEvent,
    checkSave () {
      checkData(this.$refs.editIndexTable)
    }
  }
}
</script>

<style scoped>

</style>
