<template>
  <div>
    <page-head class="nav"></page-head>
    <el-container>
      <el-card>
        <menu-list style="width: 80%;margin: auto"></menu-list>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import PageHead from '../../common/head/pageHead'
import MenuList from '../components/menuList'
export default {
  name: 'menuPage',
  components: {MenuList, PageHead}
}
</script>

<style scoped>
.el-card{
  width: 60%;
  margin-left: 20%;
}
</style>
