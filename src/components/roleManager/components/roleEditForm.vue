<template>
  <el-dialog
    :close-on-click-modal = "false"
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
import bus from '../../../common/bus'
import {getUpdate} from '../../../common/getUpdate'

export default {
  name: 'roleEditForm',
  created () {
    bus.$on('showEditForm', (value) => {
      this.dialogVisible = true
      this.form = value
      this.old = JSON.parse(JSON.stringify(value))
    })
  },
  data () {
    return {
      old: {},
      form: {
        role_id: -1,
        role_name: '',
        role_description: ''
      },
      dialogVisible: false,
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
          let res
          if (this.form.role_id === -1) {
            res = await axios.post('/api/role/add', this.form)
          } else {
            const data = getUpdate(this.old, this.form)
            res = await axios.post('/api/role/edit', data)
          }
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.$message.success('操作成功')
            bus.$emit('refreshData', res.data.data.reverse())
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
