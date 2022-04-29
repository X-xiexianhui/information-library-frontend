<template>
  <div class="nav">
    <div :class="$style.box">
      <div :class="$style.logo"><img src="../../../assets/logo.png" :class="$style.logo" alt="信息库管理系统"></div>
      <div :class="$style.btn">
        <slot></slot>
      </div>
    </div>
    <el-container>
      <el-aside width="200px">
        <data-menu></data-menu>
      </el-aside>
      <el-main>
          <router-view/>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import DataMenu from '../components/dataMenu'
export default {
  name: 'home',
  components: {DataMenu}
}
</script>
<style module>
.box {
  top: 0;
  position: fixed;
  margin: 0 0;
  padding: 0 0;
  height: auto;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 1px rgba(0,0,0,.3);
  z-index: 3;
}
.logo {
  vertical-align: top;
  height: 60px;
}
.btn{
}
</style>
