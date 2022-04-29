<template>
  <el-dropdown>
  <span class="el-dropdown-link">
    <el-avatar size="mini" :src="circleUrl"></el-avatar>
  </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>修改信息</el-dropdown-item>
      <el-dropdown-item>修改密码</el-dropdown-item>
      <el-dropdown-item>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'userAvatar',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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
