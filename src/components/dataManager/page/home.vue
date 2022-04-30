<template>
  <div class="nav">
    <div :class="$style.box">
      <div :class="$style.logo"><img src="../../../assets/logo.png" :class="$style.logo" alt="信息库管理系统"></div>
      <div :class="$style.btn">
        <div class="text-btn">
          <el-button type="text" @click="goToBack">
            <i class="el-icon-arrow-left"></i>进入管理后台
          </el-button>
        </div>
       <div>
         <user-avatar></user-avatar>
       </div>
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
import userAvatar from '../../userManager/components/userAvatar'
export default {
  name: 'home',
  components: {DataMenu, userAvatar},
  methods: {
    goToBack () {
      this.$router.push('/db')
    }
  }
}
</script>
<style module lang="less">
.box {
  top: 0;
  position: fixed;
  margin: 0 0;
  padding: 0 0;
  height: 60px;
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
  height: 50px;
}
.btn{
  margin-right: 20px;
}
.text-btn{
  margin-right: 10px;
}

</style>
