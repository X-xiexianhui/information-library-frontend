<template>
  <div>
   <page-head class="nav"></page-head>
    <el-container>
      <el-card>
        <user-list></user-list>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import UserList from '../components/userList'
import PageHead from '../../common/head/pageHead'
export default {
  name: 'userPage',
  components: {PageHead, UserList}
}
</script>

<style scoped>
.el-card{
  width: 60%;
  margin-left: 20%;
}
</style>
