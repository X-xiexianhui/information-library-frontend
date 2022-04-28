<template>
<div class="login-wrap">
  <div class="ms-title">信息库管理系统</div>
  <div class="ms-login">
  <el-form :model="form" :rules="rules" ref="ruleForm" label-width="0px">
      <el-form-item prop="user_id">
        <el-input clearable v-model="form.user_id" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="user_pwd">
        <el-input clearable type="password" placeholder="请输入密码" v-model="form.user_pwd" @keyup.enter.native="submitForm"></el-input>
      </el-form-item>
      <el-form-item prop="code" class="verifyCodeItemCss">
        <el-input clearable class="verify_css" placeholder="请输入验证码" v-model="form.code" @keyup.enter.native="submitForm"></el-input>
        <div id="v_container"></div>
      </el-form-item>
      <div class="login-btn">
        <el-button class="loginBtn" type="primary" @click="submitForm">登录</el-button>
      </div>
    <div class="tips"  style="float:left;">
      <el-link type="white" @click="retrievePWD">忘记密码</el-link>
    </div>
    </el-form>
  </div>
</div>
</template>

<script>
import {GVerify} from '../../../common/verifyCode'

export default {
  name: 'loginForm',
  data () {
    return {
      form: {
        user_id: '',
        user_pwd: '',
        code: ''
      },
      rules: {
        user_id: [{required: true, message: '请输入用户账号', trigger: 'blur'}],
        user_pwd: [{required: true, message: '请输入用户密码', trigger: 'blur'}],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          { validator: this.checkCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    retrievePWD () {
      this.$router.push({ path: '/pwd/reset' })
    },
    checkCode (rule, value, callback) {
      const verifyFlag = this.verifyCode.validate(value)
      if (!verifyFlag) {
        callback(new Error('验证码不正确'))
      } else {
        return callback()
      }
    },
    async submitForm () {
      await this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否登录成功

          let param = {
            user_id: this.form.user_id,
            user_pwd: this.form.user_pwd
          }
          console.log(param)
        }
      })
    }
  },
  mounted () {
    this.verifyCode = new GVerify('v_container')
  }
}
</script>

<style scoped>
.verify_css {
  width: 45%;
}

.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: cadetblue;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 14rem;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 6%;
  background: #fff;
  box-shadow: -2px -2px 17px 1px #dcf2e6;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.loginBtn:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
  0 0 20px rgba(0, 0, 0, 0.1) inset;
}

#v_container {
  width: auto;
  height: auto;
  display: inline-flex;
  position: relative;
  top: 1rem;
  margin-top: -2rem;
}

</style>
