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
        <el-form>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'resetPwdForm',
  data () {
    return {
      active: 0,
      flag: false
    }
  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    },
    getAuthCode () {
    },
    checkEmail () {
    }
  }
}
</script>

<style scoped lang="less">
.wid {
  width: 100%;
}

.title-img-wr {
  text-align: center;
}

.forgot-password {

  .return-page-wr {
  position: relative;
  top: 30px;
  left: 30px;
  color: #e5525b;
  font-size: 16px;
  margin-bottom: 15px;

  i {
  font-size: 20px;
  vertical-align: middle;
  }

}
width: 580px;
height: 540px

;
background: #FFFFFF

;
border-radius:

6
px

;
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
  color: #e6545a;
  font-size: 18px;
  border: 2px solid #e6545a;
}

/deep/ .el-step__line {
  background: #e6545a;
}

/deep/ .is-process {

.el-step__icon {
  background: #e6545a;
  color: #FFFFFF;
  border: 0px;

}

}
/deep/ .el-step__head {
  margin-bottom: 20px;
}

/deep/ .el-step__title.is-process {
  color: #e6545a;
}


/deep/ .el-form-item__label {
  width: 100%;
  text-align: left;
}

/deep/ .el-form-item__content {
  display: inline-block;
  width: 100%;
  margin-left: 0px;
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
  background: #e6545a;
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
