<template>
  <vxe-table
    border
    resizable
    keep-source
    ref="dataForm"
    :edit-rules="validRules"
    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    :row-config="{isCurrent: true}"
    :data="tableData">
    <vxe-column field="label_name" title="数据表字段名称">
      <template #default="{ row }">
        <span>{{ row.label_name }}</span>
      </template>
      <template #edit="{ row }">
        <span>{{ row.label_name }}</span>
      </template>
    </vxe-column>
    <vxe-column>
      <template #default="{ row }">
        <span>{{row.value}}}</span>
      </template>
      <template #edit="{ row }">
        <vxe-input v-model="row.value" type="text"></vxe-input>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script>
export default {
  name: 'dataForm',
  props: {
    record_id: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      tableColumn: [
        {field: 'col_name', title: '数据表字段', editRender: {}, slots: {edit: 'labelName_edit'}},
        {field: 'data', title: '数据', editRender: {}, slots: {edit: 'data_edit'}}
      ],
      tableData: [],
      validRules: {
        value: [
          {required: true, message: '数据必填'}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
