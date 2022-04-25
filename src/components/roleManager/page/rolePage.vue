<template>
  <div>
    <page-head></page-head>
    <el-container>
      <el-card>
        <role-list></role-list>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import RoleList from '../components/roleList'
import PageHead from '../../common/head/pageHead'
export default {
  name: 'rolePage',
  components: {PageHead, RoleList}
}
</script>

<style scoped>
.el-card{
  width: 60%;
  margin-left: 20%;
}
</style>
