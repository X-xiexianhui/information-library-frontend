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
  z-index: 3;
}
.logo {
  vertical-align: top;
  height: 50px;
}
</style>
