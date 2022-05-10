<template>
  <div style="margin-top: 20px">
    <div class="ms-title">欢迎使用信息库管理系统</div>
      <el-descriptions title="用户信息" class="description" :column="2">
        <el-descriptions-item label="用户账号">{{user_form.user_id}}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{user_form.user_name}}</el-descriptions-item>
        <el-descriptions-item label="用户邮箱">{{user_form.user_email}}</el-descriptions-item>
        <el-descriptions-item label="用户角色">{{user_form.user_role}}</el-descriptions-item>
      </el-descriptions>
  </div>
</template>

<script>
import {interceptor} from '../../../api/interctor'

export default {
  name: 'welcome',
  data () {
    return {
      user_form: {}
    }
  },
  created () {
    this.showUser()
  },
  methods: {
    async showUser () {
      this.userDialogVisible = true
      const res = await this.$http.get('api/user/query')
      if (res.data.code !== 200) {
        interceptor(res.data)
      } else {
        this.user_form = res.data.data
      }
    }
  }
}
</script>

<style scoped>
.ms-title {
  margin: auto;
  font-size: 30px;
  color: cadetblue;
}
.description{
  width: 60%;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: #2c3e50;
}
</style>
