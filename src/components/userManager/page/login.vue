<template>
  <div>
    <div :class="$style.box">
      <div><img src="../../../assets/logo.png" :class="$style.logo"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
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
  height: 30px;
}
</style>
