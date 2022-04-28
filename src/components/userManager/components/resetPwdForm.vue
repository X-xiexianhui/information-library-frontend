<template>
  <div class="forgot-password">
    <button type="text" v-show="active>='1'" class="return-page-wr" @click="$router.go(-1)"><i
      class="el-icon-arrow-left"></i> 上一步
    </button>
    <button type="text" v-show="active==='0'" class="return-page-wr" @click="$router.push({path:'/'})"><i
      class="el-icon-arrow-left"></i> 返回
    </button>
    <div class="content">
      <el-steps :active="active" finish-status="success">
        <el-step title="账号验证"></el-step>
        <el-step title="重置密码"></el-step>
        <el-step title="完成设置"></el-step>
      </el-steps>
      <div v-if="active === 0">
        <el-form :model="emailForm">
          <el-form-item>
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-input>
              <el-button plain :disabled="flag" @click="getAuthCode">{{ msg }}</el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <div>
          <button type="button" class="login-btn" @click="checkEmail">下一步 <i class="el-icon-arrow-right"></i></button>
        </div>
      </div>
      <div v-if="active==='1'">
        <el-form ref="forgotPasswordForm" :model="forgotPasswordForm" :rules="forgotPasswordFormRules">
          <el-form-item prop="pwd" label ="密码:">
            <el-input v-model="forgotPasswordForm.user_pwd" type="password" placeholder="6-16位大小写字母+数字组合" auto-complete="off" >
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPwd" label ="确认密码:">
            <el-input v-model="forgotPasswordForm.confirm_pwd" placeholder="重复密码" type="password">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="btn-wr">
          <button type="button" class="login-btn" @click.prevent="resetPassword">确认 <i class="el-icon-arrow-right" ></i></button>
        </div>
      </div>
      <div v-if="active==='2'">
        <div class="reset-success">
          <el-result icon="success" title="修改密码成功" subTitle="请重新登录"></el-result>
        </div>
        <div class="btn-wr">
          <button type="button" class="login-btn" @click="$router.push({path:'/'})">登录 <i class="el-icon-arrow-right" ></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resetPwdForm',
  data () {
    let validateConfirmPass = (rule, value, callback) => {
      if (value !== this.forgotPasswordForm.pwd) {
        callback(new Error('两次输入密码不一致,请重新输入'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      flag: false,
      msg: '获取邮箱验证码',
      emailForm: {
        user_id: '',
        user_email: ''
      },
      forgotPasswordForm: {
        user_pwd: '',
        confirm_pwd: '',
        account: ''
      },
      forgotPasswordFormRules: {
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur' },
          { pattern: new RegExp('^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$'), message: '密码为6-16位大小写字母+数字组合，请重新输入', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validateConfirmPass, trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur' },
          { pattern: new RegExp('^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$'), message: '密码为6-16位大小写字母+数字组合，请重新输入', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    },
    getAuthCode () {
    },
    checkEmail () {
      const that = this
      that.active++
    },
    resetPassword () {
    }
  }
}
</script>

<style scoped lang="less">
.wid {
  width: 100%;
}

.forgot-password {

  .return-page-wr {
    position: relative;
    top: 30px;
    left: 30px;
    color: #dcf2e6;
    font-size: 16px;
    margin-bottom: 15px;

    i {
      font-size: 20px;
      vertical-align: middle;
    }

  }

  width: 580px;
  height: 540px;
  background: #FFFFFF;
  border-radius: 6px;

  .content {
    padding: 30px 90px;
    box-sizing: border-box;
  }

  /deep/ .el-step.is-horizontal {

    .el-step__line {
      height: 2px;
      top: 20px;
      left: 48px;
      right: 10px;
    }

  }

  /deep/ .el-step__icon {
    width: 42px;
    height: 42px;
    color: #dcf2e6;
    font-size: 18px;
    border: 2px solid #dcf2e6;
  }

  /deep/ .el-step__line {
    background: #dcf2e6;
  }

  /deep/ .is-process {

    .el-step__icon {
      background: #dcf2e6;
      color: #FFFFFF;
      border: 0;

    }

  }

  /deep/ .el-step__head {
    margin-bottom: 20px;
  }

  /deep/ .el-step__title.is-process {
    color: #dcf2e6;
  }

  /deep/ .el-form-item__label {
    width: 100%;
    text-align: left;
  }

  /deep/ .el-form-item__content {
    display: inline-block;
    width: 100%;
    margin-left: 0;
  }

}

.btn-wr {
  text-align: center;
}

.reset-success {
  text-align: center;
  margin: 60px 0;
}

.set-success {
  margin-top: 20px;
  font-weight: 600;
}

.login-btn {
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin: 0 auto;
  background: #dcf2e6;
  font-weight: 600;
  font-size: 16px;
  color: #FFFFFF;
  border-radius: 4px;

  i {
    right: -50px;
    font-size: 27px;
    position: relative;
    vertical-align: middle;
  }

}
</style>
