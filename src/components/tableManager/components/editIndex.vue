<template>
    <div>
        <vxe-toolbar perfect>
            <template #buttons>
                <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent($refs.editIndexTable)">新增</vxe-button>
                <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent($refs.editIndexTable)">移除</vxe-button>
                <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent($refs.editIndexTable, tableForm)">保存</vxe-button>
                <vxe-button icon="fa fa-mail-reply" status="perfect" @click="revertEvent($refs.editIndexTable)">还原</vxe-button>
            </template>
        </vxe-toolbar>
        <vxe-table
            ref="editIndexTable"
            border
            resizable
            keep-source
            show-overflow
            :data="tableData"
            :edit-config="{trigger: 'click', mode: 'cell',showStatus: true}"
            size="mini"
        >
            <vxe-column type="checkbox" width="60"></vxe-column>
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="" title="建立索引字段" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #default="{ row }">
                    <span>{{ row.field }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.fk" transfer>
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
      typeList: [],
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
