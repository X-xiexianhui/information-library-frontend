<template>
<div>
  <button type="text" v-show="active>='1'" class="return-page-wr" @click="$router.go(-1)"> <i></i> 上一步 </button>
  <button type="text" v-show="active==='0'" class="return-page-wr" @click="$router.push({path:'/'})"> <i></i> 返回 </button>
  <div class="content">
    <el-steps :active="active" finish-status="success">
      <el-step title="账号验证"></el-step>
      <el-step title="重置密码"></el-step>
      <el-step title="完成设置"></el-step>
    </el-steps>
    <div v-if="active === 0">
      <el-form>
        <el-form-item>
          <el-input ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input>
            <el-button plain :disabled="flag" @click="getAuthCode">{{ msg }}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div>
        <button type="button" class="login-btn" @click="checkEmail">下一步 <i class="el-icon-arrow-right" ></i></button>
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

<style scoped>

</style>
