<template>
  <div>
    <page-head class="nav"></page-head>
    <el-container>
      <el-card>
        <form-list style="width: 80%;margin: auto"></form-list>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import FormList from '../components/formList'
import PageHead from '../../common/head/pageHead'
export default {
  name: 'formPage',
  components: {PageHead, FormList}
}
</script>

<style scoped>
.el-card{
  width: 60%;
  margin-left: 20%;
}
</style>
