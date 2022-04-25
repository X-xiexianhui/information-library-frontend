<template>
<el-container>
  <el-aside>
  </el-aside>
  <el-main>
    <router-view/>
  </el-main>
</el-container>
</template>

<script>
export default {
  name: 'home'
}
</script>
<style scoped>
/deep/.el-container{
  margin-top: 0px;
}
</style>
