<template>
  <div style="margin-top: 20px">
    <div class="ms-title">欢迎使用信息库管理系统</div>
    <img src="../../../assets/logo.png" class="imag" alt="信息库管理系统"/>
    <p style="margin:30px">本系统是一个具有可拓展性和可复用性的信息库管理系统，用户可以定制所需的内容</p>
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
.imag{
  margin-top: 10%;
  text-align:center;
  vertical-align:middle
}
</style>
