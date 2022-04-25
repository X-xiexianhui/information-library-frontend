<template>
  <div>
    <div :class="$style.box">
      <div></div>
      <div :class="$style.btns">
        <slot></slot>
      </div>
    </div>
    <el-container>
      <el-aside>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  name: 'home'
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
</style>
