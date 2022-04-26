<template>
  <el-dialog
    :close-on-click-modal = "false"
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
    <el-form ref="authForm" :model="form" :rules="formRule" label-width="80px" style="margin: auto;width: 60%">
      <el-form-item label="用户账号" prop="user_id">
        <el-input v-model="form.user_id" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="user_name">
        <el-input placeholder="请输入角色名称" v-model="form.user_name">
        </el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="user_email">
        <el-input v-model="form.user_email" placeholder="请输入用户邮箱"></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="user_role">
          <el-select
            v-model="form.user_role" placeholder="请选择"
            style="text-align: left">
          <el-option
            v-for="item in roleList"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <span style="margin: auto">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import {error} from '../../../api/error'
import axios from 'axios'
import bus from '../../../common/bus'

export default {
  name: 'userAddForm',
  data () {
    return {
      form: {
        user_id: '',
        user_name: '',
        user_email: '',
        user_role: ''
      },
      roleList: [],
      dialogVisible: false,
      formRule: {
        user_id: [{required: true, message: '请输入用户账号', trigger: 'blur', length: 4}],
        user_name: [{required: true, message: '请输入用户名称', trigger: 'blur'}],
        user_email: [
          {required: true, message: '请输入用户邮箱', trigger: 'blur'},
          {pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式错误', trigger: 'blur'}
        ],
        user_role: [{required: true, message: '请选择用户角色', trigger: 'blur'}]
      }
    }
  },
  created () {
    this.getRoleList()
    bus.$on('showAddUserForm', () => {
      this.dialogVisible = true
    })
  },
  methods: {
    closeEvent () {
      this.dialogVisible = false
      this.$refs.authForm.resetFields()
    },
    async getRoleList () {
      try {
        let res = await axios.get('/api/role/select')
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.roleList = res.data.data.reverse()
        }
      } catch (e) {
        error(e.message)
      }
    },
    async save () {
      await this.$refs.authForm.validate(async valid => {
        if (!valid) return
        try {
          let res = await axios.post('/api/user/add', this.form)
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            bus.$emit('refreshUser', res.data.data.reverse())
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
