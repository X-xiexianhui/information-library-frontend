<template>
<div>
  <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    <el-avatar :size="40" :src="circleUrl"></el-avatar>
  </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">修改信息</el-dropdown-item>
      <el-dropdown-item command="b">修改密码</el-dropdown-item>
      <el-dropdown-item command="c">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-dialog
    :close-on-click-modal="false"
    :modal-append-to-body='false'
    append-to-body
    width="40%"
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
    <div style="text-align: center">
      <el-form key="resetForm" ref="forgotPasswordForm" :model="forgotPasswordForm"
      :rules="forgotPasswordFormRules" label-width="100px" style="width: 70%;margin: auto">
      <el-form-item key="0" prop="old_pwd" label="旧密码:">
        <el-input clearable v-model="forgotPasswordForm.old_pwd" type="password" placeholder="请输入旧密码"
                  auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item key="1" prop="pwd" label="新密码:">
        <el-input clearable v-model="forgotPasswordForm.pwd" type="password" placeholder="6-16位大写字母+小写字母+数字组合"
                  auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item key="2" prop="confirmPwd" label="确认密码:">
        <el-input clearable v-model="forgotPasswordForm.confirmPwd" placeholder="重复密码" type="password">
        </el-input>
      </el-form-item>
      </el-form>
      <span style="margin: auto">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </div>
  </el-dialog>
  <el-dialog
    :close-on-click-modal="false"
    :modal-append-to-body='false'
    append-to-body
    width="40%"
    :visible.sync="userDialogVisible"
    :before-close="closeUser"
  >
    <div style="text-align: center">
      <el-form :model="user_form" ref="userForm" :rules="userRules" style="width: 70%;margin: auto">
        <template>
          <el-descriptions title="用户信息" class="description" :column="1">
            <el-descriptions-item label="用户账号">{{user_form.user_id}}</el-descriptions-item>
            <el-descriptions-item label="用户角色">{{user_form.user_role}}</el-descriptions-item>
          </el-descriptions>
        </template>
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="user_form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="user_email">
          <el-input v-model="user_form.user_email"></el-input>
        </el-form-item>
      </el-form>
      <span style="margin: auto">
        <el-button @click="closeUser">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </span>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {interceptor} from '../../../api/interctor'
import {getUpdate} from '../../../common/getUpdate'
import axios from 'axios'
import bus from '../../../common/bus'
import {error} from '../../../api/error'

export default {
  name: 'userAvatar',
  data () {
    let validateConfirmPass = (rule, value, callback) => {
      if (value !== this.forgotPasswordForm.pwd) {
        callback(new Error('两次输入密码不一致,请重新输入'))
      } else {
        callback()
      }
    }
    return {
      userDialogVisible: false,
      dialogVisible: false,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      forgotPasswordForm: {
        old_pwd: '',
        pwd: '',
        confirmPwd: ''
      },
      user_data: {},
      user_form: {
        user_email: '',
        user_name: ''
      },
      userRules: {
        user_email: [
          {required: true, message: '请输入用户邮箱', trigger: 'blur'},
          {
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: '邮箱格式错误',
            trigger: 'blur'
          }],
        user_name: [{required: true, message: '请输入用户名称', trigger: 'blur'}]
      },
      forgotPasswordFormRules: {
        old_pwd: [{required: true, message: '请输入密码', trigger: 'blur'}],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur'},
          {
            pattern: /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/,
            message: '密码为6-16位大小写字母+数字组合，请重新输入',
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {validator: validateConfirmPass, trigger: 'blur'},
          {min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur'},
          {
            pattern: /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/,
            message: '密码为6-16位大小写字母+数字组合，请重新输入',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    logout () {
      this.$cookies.set('login_cookie', null)
      this.$router.push('/')
    },
    closeEvent () {
      this.dialogVisible = false
      this.$refs.forgotPasswordForm.resetFields()
    },
    closeUser () {
      this.userDialogVisible = false
      this.$refs.userForm.resetFields()
    },
    handleCommand (command) {
      switch (command) {
        case 'a':this.showUserEdit()
          break
        case 'b':this.dialogVisible = true
          break
        case 'c':this.logout()
          break
      }
    },
    save () {
      this.$refs.forgotPasswordForm.validate(async valid => {
        if (!valid) return
        const res = await this.$http.post('api/pwd/edit', this.forgotPasswordForm)
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.dialogVisible = false
          this.logout()
          this.$message.success('修改密码成功，请重新登录')
        }
      })
    },
    async showUserEdit () {
      this.userDialogVisible = true
      const res = await this.$http.get('api/user/query')
      if (res.data.code !== 200) {
        interceptor(res.data)
      } else {
        this.user_data = JSON.parse(JSON.stringify(res.data.data))
        this.user_form = res.data.data
      }
    },
    saveUser () {
      this.$refs.userForm.validate(async valid => {
        if (!valid) return
        try {
          const data = getUpdate(this.user_data, this.user_form)
          let res = await axios.post('/api/user/edit', {
            user_id: this.user_data.user_id,
            update: data
          })
          if (res.data.code !== 200) {
            interceptor(res.data)
          } else {
            bus.$emit('refreshUser')
            this.closeUser()
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
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
