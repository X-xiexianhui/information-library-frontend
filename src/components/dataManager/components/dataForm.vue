<template>
  <vxe-table
    border
    resizable
    keep-source
    ref="formStruct"
    :edit-rules="validRules"
    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    :row-config="{isCurrent: true}"
    :data="tableData">
    <vxe-column field="label_name" title="数据表字段名称">
      <template #default="{ row }">
        <p>{{ row.label_name }}</p>
      </template>
      <template #edit="{ row }">
        <p>{{ row.label_name }}</p>
      </template>
    </vxe-column>
    <vxe-column>
      <template #default="{ row }">
        <p>{{row.data}}}</p>
      </template>
      <template #edit="{ row }">
        <vxe-input v-model="row.data" type="text"></vxe-input>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script>
export default {
  name: 'dataForm',
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
        label_name: [
          {required: true, message: '数据必填'}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
