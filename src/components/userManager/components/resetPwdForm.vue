<template>
<div>
  <button type="text" v-show="active>='1'" class="return-page-wr" @click="$router.go(-1)"> <i class="el-icon-arrow-left"></i> 上一步 </button>
  <button type="text" v-show="active==='0'" class="return-page-wr" @click="$router.push({path:'/'})"> <i class="el-icon-arrow-left"></i> 返回 </button>
  <div class="content">
    <el-steps :active="active" finish-status="success">
      <el-step title="账号验证"></el-step>
      <el-step title="重置密码"></el-step>
      <el-step title="完成设置"></el-step>
    </el-steps>
  </div>
</div>
</template>

<script>
export default {
  name: 'resetPwdForm',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
