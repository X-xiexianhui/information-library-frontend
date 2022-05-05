<template>
<div>
  <el-dropdown>
  <span class="el-dropdown-link">
    <el-avatar :size="40" :src="circleUrl"></el-avatar>
  </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>修改信息</el-dropdown-item>
      <el-dropdown-item @click="dialogVisible=true">修改密码</el-dropdown-item>
      <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-dialog
    :close-on-click-modal="false"
    :modal-append-to-body='false'
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
    <el-form key="resetForm" ref="forgotPasswordForm" :model="forgotPasswordForm"
             :rules="forgotPasswordFormRules">
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
  </el-dialog>
</div>
</template>

<script>
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
      dialogVisible: false,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      forgotPasswordForm: {
        old_pwd: '',
        pwd: '',
        confirmPwd: ''
      },
      forgotPasswordFormRules: {
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
    },
    save () {
      this.dialogVisible = false
      this.logout()
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
