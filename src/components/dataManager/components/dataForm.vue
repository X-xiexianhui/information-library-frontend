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
        size="mini"
        :edit-rules="validRules"
        :edit-config="{trigger: 'click', mode: 'cell'}"
        :data="formData"
      >
        <vxe-column field="title" title="数据表字段名称" :edit-render="{}">
          <template #default="{ row }">
            <span>{{ row.title }}</span>
          </template>
          <template #edit="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </vxe-column>
        <vxe-column field="value" title="数据" :edit-render="{}">
          <template #default="{ row }">
            <span v-if="row.field === 'file'">{{ formatFile(row) }}</span>
            <span v-else>{{ row.value }}</span>
          </template>
          <template #edit="{row}">
            <vxe-button v-if="row.field === 'file'" status="primary" @click="uploadFileEvent(row)">上传附件</vxe-button>
            <vxe-input v-else v-model="row.value" type="text"></vxe-input>
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
      formData: [],
      validRules: {
        value: [
          {required: true, message: '数据必填'}
        ]
      }
    }
  },
  methods: {
    uploadFileEvent (row) {
      const $grid = this.$refs.dataForm
      // 读取附件
      $grid.readFile({
        multiple: false,
        types: ['xlsx', 'csv', 'pdf', 'txt']
      }).then(params => {
        const { files } = params
        console.log(files)
        row.value = files
      })
    },
    formatFile (row) {
      let res = ''
      if (row.value[0]) {
        res = row.value[0].name
      }
      return res
    },
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
