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
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="账号验证"></el-step>
          <el-step title="重置密码"></el-step>
          <el-step title="完成设置"></el-step>
        </el-steps>
        <div v-if="active === 0">
          <el-form :model="emailForm" :rules="emailFormRules" ref="emailForm">
            <el-form-item prop="user_id">
              <el-input v-model="emailForm.user_id" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="auth_code">
              <el-input v-model="emailForm.auth_code" placeholder="邮箱验证码">
                <template slot="append">
                  <el-button size="small" plain :disabled="flag" @click="getAuthCode" style="width: 120px">{{
                      msg
                    }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="success" class="login-btn" @click="checkEmail">下一步</el-button>
          </div>
        </div>
        <div v-if="active=== 1">
          <el-form key="resetForm" ref="forgotPasswordForm" :model="forgotPasswordForm"
                   :rules="forgotPasswordFormRules">
            <el-form-item key="0" prop="pwd" label="密码:">
              <el-input clearable v-model="forgotPasswordForm.pwd" type="password" placeholder="6-16位大写字母+小写字母+数字组合"
                        auto-complete="off">
              </el-input>
            </el-form-item>
            <el-form-item key="1" prop="confirmPwd" label="确认密码:">
              <el-input clearable v-model="forgotPasswordForm.confirmPwd" placeholder="重复密码" type="password">
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
import {error} from '../../../api/error'

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
      emailFormRules: {
        user_is: [{required: true, message: '请输入用户账号', trigger: 'blur'}],
        auth_code: [{required: true, min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur'}]
      },
      flag: false,
      msg: '获取邮箱验证码',
      emailForm: {
        user_id: '',
        auth_code: ''
      },
      forgotPasswordForm: {
        pwd: '',
        confirmPwd: '',
        user_id: ''
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
    next () {
      if (this.active++ > 2) this.active = 0
    },
    getAuthCode () {
      // 对输入的账号进行校验
      this.$refs.emailForm.validateField('user_id', (valid) => {
        console.log(valid)
        if (!valid) {
          return false
        }
        this.$http.post('api/user/check', {}, {params: {user_id: this.emailForm.user_id}}).then(res => {
          // 获取验证码按钮倒计时功能的实现
          const _this = this// ！！坑！setInterval中的this指向问题
          this.flag = true // ！按钮不可重复点击
          let time = 150// 定义时间变量 150s
          let timer = null // 定义定时器
          timer = setInterval(function () {
            if (time === 0) {
              _this.msg = '重新获取验证码'
              _this.flag = false
              clearInterval(timer)// 清除定时器
            } else {
              _this.msg = time + '秒后重新获取'
              time--
            }
          }, 1000)
          if (res.data.code === 200) {
            this.$message.success('验证码已发送')
          }
        }).catch(e => {
          error(e.message)
        })
      })
    },
    checkEmail () {
      this.$refs.emailForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          const res = await this.$http.post('api/email/check', {
            user_id: this.emailForm.user_id,
            user_pwd: this.forgotPasswordForm.pwd
          })
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.active++
          }
        } catch (e) {
          error(e.message)
        }
      })
    },
    resetPassword () {
      this.$refs.forgotPasswordForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          const res = await this.$http.post('api/pwd/reset', this.forgotPasswordForm)
          if ((await res).data.code !== 200) {
            error(res.data.msg)
          } else {
            this.active++
          }
        } catch (e) {
          error(e.message)
        }
      })
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
      top: 10px;
      left: -250px;
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
        left: 80px;
        right: -50px;
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
      width: 75%;
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
    margin: 0 auto;
    background: #67C23A;
    font-weight: 600;
    font-size: 16px;
    color: #FFFFFF;
    border-radius: 4px;
  }
}
</style>
