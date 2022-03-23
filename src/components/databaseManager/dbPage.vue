<template>
  <div>
    <page-head class="nav"></page-head>
    <el-container>
      <el-card>
        <db-manager></db-manager>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import pageHead from '../common/head/pageHead'
import DbManager from './dbManager'
export default {
  name: 'dbPage',
  components: {DbManager, pageHead}
}
</script>

<style scoped>
.el-card{
  width: 60%;
  margin-left: 20%;
}
</style>
