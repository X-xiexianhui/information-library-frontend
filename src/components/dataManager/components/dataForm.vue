<template>
  <el-dialog
    :close-on-click-modal="false"
    :modal-append-to-body="false"
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
          <vxe-switch v-if="row.data_type === 'boolean'"></vxe-switch>
          <div v-else>
            <span>{{ row.value }}</span>
            <vxe-button v-if="row.field === 'file'" status="primary" @click="uploadFileEvent(row)">上传附件</vxe-button>
          </div>
        </template>
        <template #edit="{row}">
          <vxe-switch v-if="row.data_type === 'boolean'"></vxe-switch>
          <div v-else-if="row.field === 'file'">
            <span>{{ row.value }}</span>
            <vxe-button style="right: 0" v-if="row.field === 'file'" status="primary" @click="uploadFileEvent(row)">
              上传附件
            </vxe-button>
          </div>
          <vxe-input v-else v-model="row.value" type="text"></vxe-input>
        </template>
      </vxe-column>
    </vxe-table>
    <div style="margin-top: 10px">
       <span style="margin: auto">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </div>
  </el-dialog>
</template>

<script>
import bus from '../../../common/bus'
import {error} from '../../../api/error'
import {interceptor} from '../../../api/interctor'

export default {
  name: 'dataForm',
  props: {
    form_id: {
      type: Number,
      default: -1
    },
    is_add: {
      type: Boolean,
      default: true
    }
  },
  created () {
    bus.$on('showDataForm', (value) => {
      this.formData = value
      for (const column of value) {
        this.oldData.push(JSON.parse(JSON.stringify(column)))
      }
      this.dialogVisible = true
    })
  },
  data () {
    return {
      fileList: [],
      dialogVisible: false,
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      formData: [],
      oldData: [],
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
        types: ['xlsx', 'csv', 'pdf', 'txt', 'rar'],
        message: true
      }).then(params => {
        const {files} = params
        // console.log(files)
        this.fileList = files
        row.value = files[0].name
      })
    },
    closeEvent () {
      this.dialogVisible = false
      this.$refs.dataForm.reloadData([])
    },
    save () {
      if (this.is_add) {
        this.add()
      } else {
        this.edit()
      }
    },
    async add () {
      try {
        const res = await this.$http.post('api/data/add', {form_id: this.form_id, data: this.formData})
        await this.submitFile()
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          bus.$emit('refreshTable')
          this.closeEvent()
        }
      } catch (e) {
        error(e)
      }
    },
    async edit () {
      try {
        const data = this.getUpdateData(this.formData, this.oldData)
        const res = await this.$http.post('api/data/add', {form_id: this.form_id, data: data})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          bus.$emit('refreshTable')
          this.closeEvent()
        }
      } catch (e) {
        error(e)
      }
    },
    getUpdateData (newValue, oldValue) {
      const keys = Object.keys(oldValue)
      let data = []
      for (const key of keys) {
        if (newValue[key].value !== oldValue[key].value) {
          data.push({col_name: newValue[key].field, value: newValue[key].value})
        }
      }
      return data
    },
    async submitFile () {
      if (this.fileList.length === 0) {
        return
      }
      try {
        let form = new FormData()
        form.append('file', this.fileList[0])
        const res = await this.$http.post('api/file/add', form, {headers: {'Content-Type': 'multipart/form-data'}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          bus.$emit('refreshTable')
        }
      } catch (e) {
        error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
