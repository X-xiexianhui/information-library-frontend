<template>
  <vxe-grid
    border
    resizable
    keep-source
    ref="formStruct"
    :toolbar-config="toolBarConfig"
    :edit-rules="validRules"
    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    :row-config="{isCurrent: true}"
    :columns="tableColumn"
    :data="tableData">
    <template #labelName_edit="{ row }">
      <p>{{ row.label_name }}</p>
    </template>
    <template #data_edit="{ row }">
      <vxe-input v-model="row.data" type="text"></vxe-input>
    </template>
    <template #toolbar_buttons>
      <vxe-button status="success" @click="save">保存</vxe-button>
    </template>
  </vxe-grid>
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
