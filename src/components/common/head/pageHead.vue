<template>
  <div :class="$style.box">
    <div><img src="../../../assets/logo.png" :class="$style.logo"></div>
    <div :class="$style.headerMenuBox">
      <Menu :class="$style.menu" v-bind="$attrs"></Menu>
    </div>
    <div :class="$style.btn">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Menu from './Menu'

export default {
  name: 'pageHead',
  components: {
    Menu
  }
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
.headerMenuBox {
  display: flex;
  background: #fff;
  align-items: flex-start;

/*justify-content: center*/
h1 {
  text-shadow: 0 0 40px #409EFF;
  font-size: 26px;
  text-transform: uppercase;
  z-index: 10;
}

.logo {
  vertical-align: top;
  height: 30px;
  }
}
.menu {
  margin-left: auto;
  background: #ffffff;
}
.btn{
}
</style>
