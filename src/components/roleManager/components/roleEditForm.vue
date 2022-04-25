<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
    <el-form ref="form" :model="form" :rules="formRule" label-width="80px">
      <el-form-item label="角色名称" prop="role_name">
        <el-input v-model="form.role_name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="role_description">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入角色描述"
          v-model="form.role_description">
        </el-input>
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
  name: 'roleEditForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    role_id: {
      type: Number,
      default: -1
    }
  },
  created () {
    this.queryById()
  },
  data () {
    return {
      form: {
        role_id: this.role_id,
        role_name: '',
        role_description: ''
      },
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
    async queryById () {
      if (this.role_id !== -1) {
        try {
          const res = await this.$http.get('/api/role/id', {params: {role_id: this.role_id}})
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.form = res.data.data
          }
        } catch (e) {
          error(e)
        }
      }
    },
    async save () {
      await this.$refs.form.validate(async valid => {
        if (!valid) return
        try {
          let res
          if (this.role_id === -1) {
            res = await axios.post('/api/role/add', this.form)
          } else {
            res = await axios.post('/api/role/edit', this.form)
          }
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
