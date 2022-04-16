<template>
  <div>
    <page-head class="nav"></page-head>
    <el-container>
      <el-card>
        <edit-form></edit-form>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import PageHead from '../../common/head/pageHead'
import FormPage from './formPage'
import EditForm from '../components/editForm'
export default {
  name: 'editFormPage',
  components: {EditForm, FormPage, PageHead}
}
</script>

<style scoped>
.el-card{
  width: 60%;
  margin-left: 20%;
}
</style>
