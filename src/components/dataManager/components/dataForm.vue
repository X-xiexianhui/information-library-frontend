<template>
  <div  class="dataForm">
  <vxe-table
    border
    resizable
    keep-source
    ref="dataForm"
    :edit-rules="validRules"
    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    :row-config="{isCurrent: true}"
    :data="tableData"
  >
    <vxe-column field="label_name" title="数据表字段名称">
      <template #default="{ row }">
        <span>{{ row.label_name }}</span>
      </template>
      <template #edit="{ row }">
        <span>{{ row.label_name }}</span>
      </template>
    </vxe-column>
    <vxe-column field="value" title="数据">
      <template #default="{ row }">
        <span>{{row.value}}}</span>
      </template>
      <template #edit="{ row }">
        <vxe-input v-model="row.value" type="text"></vxe-input>
      </template>
    </vxe-column>
  </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'dataForm',
  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
    form_id: {
      type: Number,
      default: -1
    },
    id_add: {
      type: Boolean,
      default: true
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
        {field: 'label_name', title: '数据表字段', editRender: {}, slots: {edit: 'labelName_edit'}},
        {field: 'data', title: '数据', editRender: {}, slots: {edit: 'data_edit'}}
      ],
      tableData: [],
      validRules: {
        value: [
          {required: true, message: '数据必填'}
        ]
      }
    }
  },
  watch: {
    formData (newValue) {
      this.tableData = JSON.parse(JSON.stringify(newValue))
    }
  }
}
</script>

<style scoped>
.dataForm{
  margin-top: 10%;
  margin-left: 20%;
  width: 60%;
}
</style>
