<template>
  <div>
    <page-head class="nav"></page-head>
    <el-container>
      <el-card>
        <table-list></table-list>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import TableList from '../components/tableList'
export default {
  name: 'tablePage',
  components: {TableList}
}
</script>

<style scoped>
.el-card{
  width: 60%;
  margin-left: 20%;
}
</style>
