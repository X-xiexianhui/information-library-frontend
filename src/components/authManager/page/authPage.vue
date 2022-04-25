<template>
  <div>
   <page-head class="nav"></page-head>
    <el-container>
      <el-card>
       <auth-list></auth-list>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import AuthList from '../components/authList'
import PageHead from '../../common/head/pageHead'
export default {
  name: 'authPage',
  components: {PageHead, AuthList}
}
</script>

<style scoped>
.el-card{
  width: 60%;
  margin-left: 20%;
}
</style>
