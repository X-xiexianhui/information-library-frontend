<template>
  <div class="page-container">
    <div class="forgot-password">
      <el-button type="text" v-show="active>= 1" class="return-page-wr" @click="active--"><i
        class="el-icon-arrow-left"></i> 上一步
      </el-button>
      <el-button type="text" v-show="active=== 0" class="return-page-wr" @click="$router.push({path:'/'})"><i
        class="el-icon-arrow-left"></i> 返回
      </el-button>
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
            <el-button type="success" class="login-btn" @click="checkEmail">下一步</el-button>
          </div>
        </div>
        <div v-if="active=== 1">
          <el-form ref="forgotPasswordForm" :model="forgotPasswordForm" :rules="forgotPasswordFormRules">
            <el-form-item prop="pwd" label="密码:">
              <el-input v-model="forgotPasswordForm.user_pwd" type="password" placeholder="6-16位大小写字母+数字组合"
                        auto-complete="off">
              </el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd" label="确认密码:">
              <el-input v-model="forgotPasswordForm.confirm_pwd" placeholder="重复密码" type="password">
              </el-input>
            </el-form-item>
          </el-form>
          <div class="btn-wr">
            <el-button type="success" class="login-btn" @click.prevent="resetPassword">确定</el-button>
          </div>
        </div>
        <div v-if="active=== 2">
          <div class="reset-success">
            <el-result icon="success" title="修改密码成功" subTitle="请重新登录">
              <template slot="extra">
                <div class="btn-wr">
                  <el-button type="success" class="login-btn" @click="$router.push({path:'/'})">登录</el-button>
                </div>
              </template>
            </el-result>
          </div>
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
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur'},
          {
            pattern: new RegExp('^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$'),
            message: '密码为6-16位大小写字母+数字组合，请重新输入',
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {validator: validateConfirmPass, trigger: 'blur'},
          {min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur'},
          {
            pattern: new RegExp('^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$'),
            message: '密码为6-16位大小写字母+数字组合，请重新输入',
            trigger: 'blur'
          }
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
      this.active++
    }
  }
}
</script>

<style scoped lang="less">
.page-container {
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow-y: auto;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .forgot-password {
    width: 580px;
    height: 540px;
    background: #FFFFFF;
    border-radius: 6px;
    .return-page-wr {
      position: relative;
      top: 30px;
      left: 0;
      justify-content: left;
      color: #67C23A;
      font-size: 16px;
      margin-bottom: 15px;

      i {
        font-size: 20px;
        vertical-align: middle;
      }
    }
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
      color: #67C23A;
      font-size: 18px;
      border: 2px solid #67C23A;
    }

    /deep/ .el-step__line {
      background: #67C23A;
    }

    /deep/ .is-process {

      .el-step__icon {
        background: #67C23A;
        color: #FFFFFF;
        border: 0;

      }

    }

    /deep/ .el-step__head {
      margin-bottom: 20px;
    }

    /deep/ .el-step__title.is-process {
      color: #67C23A;
    }

    /deep/ .el-form-item__label {
      width: 25%;
      text-align: left;
    }

    /deep/ .el-form-item__content {
      display: inline-block;
      width: 70%;
      margin-left: 0;
    }

  }

  .btn-wr {
    text-align: center;
  }

  .reset-success {
    text-align: center;
    margin: auto;
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
    background: #67C23A;
    font-weight: 600;
    font-size: 16px;
    color: #FFFFFF;
    border-radius: 4px;
  }
}
</style>
