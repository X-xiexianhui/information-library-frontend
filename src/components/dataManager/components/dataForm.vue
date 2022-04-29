<template>
  <el-dialog
    :close-on-click-modal="false"
    :modal-append-to-body='false'
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
      <vxe-table
        border
        resizable
        keep-source
        ref="dataForm"
        :edit-rules="validRules"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        :row-config="{isCurrent: true}"
        :data="formData"
      >
        <vxe-column field="title" title="数据表字段名称">
          <template #default="{ row }">
            <span>{{ row.title }}</span>
          </template>
          <template #edit="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </vxe-column>
        <vxe-column field="value" title="数据">
          <template #default="{ row }">
            <span>{{ row.value }}}</span>
          </template>
          <template #edit="{ row }">
            <vxe-input v-model="row.value" type="text"></vxe-input>
          </template>
        </vxe-column>
      </vxe-table>
  </el-dialog>
</template>

<script>
import bus from '../../../common/bus'

export default {
  name: 'dataForm',
  props: {
    form_id: {
      type: Number,
      default: -1
    },
    id_add: {
      type: Boolean,
      default: true
    }
  },
  created () {
    bus.$on('showDataForm', (value) => {
      this.formData = value
      this.dialogVisible = true
    })
  },
  data () {
    return {
      dialogVisible: false,
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      tableColumn: [
        {field: 'title', title: '数据表字段', editRender: {}, slots: {edit: 'labelName_edit'}},
        {field: 'value', title: '数据', editRender: {}, slots: {edit: 'data_edit'}}
      ],
      formData: [],
      validRules: {
        value: [
          {required: true, message: '数据必填'}
        ]
      }
    }
  },
  methods: {
    closeEvent () {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.dataForm {
  margin-top: 10%;
  margin-left: 20%;
  width: 60%;
}
</style>
