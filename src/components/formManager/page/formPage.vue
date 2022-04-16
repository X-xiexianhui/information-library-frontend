<template>
  <div>
    <page-head class="nav"></page-head>
    <el-container>
      <el-card>
        <form-list></form-list>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import FormList from '../componets/formList'
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
