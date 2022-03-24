<template>
    <div>
        <vxe-toolbar perfect print export>
            <template #buttons>
              <div style="text-align: left">
                <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent($refs.editFkTable, newLine)">新增</vxe-button>
                <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent($refs.editFkTable)">移除</vxe-button>
                <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent($refs.editFkTable)">保存</vxe-button>
                <vxe-button icon="fa fa-mail-reply" status="perfect" @click="revertEvent($refs.editFkTable)">还原</vxe-button>
              </div>
            </template>
        </vxe-toolbar>
        <vxe-table
            ref="editFkTable"
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
            <vxe-column field="fk" title="建立外键字段" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #default="{ row }">
                    <span>{{ row.fk }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.fk" transfer>
                        <vxe-option v-for="item in fkList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column field="table" title="被参照表" :edit-render="{}">
                <template #default="{ row }">
                    <span>{{ row.table }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.table" transfer>
                        <vxe-option v-for="item in dbList" :key="item.dbName" :value="item.dbName" :label="item.dbName"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column field="field" title="被参照字段" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #default="{ row }">
                    <span>{{ row.field }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.field" transfer>
                        <vxe-option v-for="item in fieldList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
        </vxe-table>
    </div>
</template>

<script>

import {checkData, insertEvent, removeEvent, revertEvent, saveEdit} from '../../../api/tableManager/tableManager'

export default {
  name: 'EditFk',
  props: {
    saveEvent: {
      type: Function,
      default: saveEdit
    },
    tableForm: {
      type: Object,
      default: () => ({})
    },
    dbList: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      Save: true,
      newLine: {
        fk: '', table: '', field: ''
      },
      fkList: [],
      fieldList: [],
      typeList: [],
      tableData: [],
      validRules: {
        fk: [{required: true, message: '外键字段必填'}],
        table: [{required: true, message: '参照表必填'}],
        field: [{required: true, message: '参照字段必填'}]
      }
    }
  },
  methods: {
    insertEvent,
    removeEvent,
    revertEvent,
    checkSave () {
      checkData(this.$refs.editFkTable)
    }
  }
}
</script>

<style scoped>

</style>
