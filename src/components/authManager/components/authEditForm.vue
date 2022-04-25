<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
    <el-form ref="form" :model="form" :rules="formRule" label-width="80px">
      <el-form-item label="角色名称" prop="role_name">
       <template>
         <span>{{form.role_name}}</span>
       </template>
      </el-form-item>
      <el-form-item label="表单名称" prop="form_name">
        <template>
          <span>{{form.form_name}}</span>
        </template>
      </el-form-item>
      <el-form-item label="新增权限" prop="add">

      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import {error} from '../../../api/error'
import axios from 'axios'

export default {
  name: 'authEditForm',
  props: {
    Visible: {
      type: Boolean,
      default: false
    },
    form_data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: this.form_data,
      dialogVisible: this.Visible.valueOf(),
      formRule: {
        role_name: [{required: true, message: '请输入角色名称', trigger: 'blur'}]
      }
    }
  },
  methods: {
    closeEvent () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    async save () {
      await this.$refs.form.validate(async valid => {
        if (!valid) return
        try {
          let res = await axios.post('/api/auth/edit', this.form)
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.tableData = res.data.data.reverse()
            this.closeEvent()
          }
        } catch (e) {
          error(e.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
