<template>
<div>
  <vue-particles
    class="login-background"
    color="#97D0F2"
    :particleOpacity="0.7"
    :particlesNumber="50"
    shapeType="circle"
    :particleSize="4"
    linesColor="#97D0F2"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push">
  </vue-particles>
  <reset-pwd-form></reset-pwd-form>
</div>
</template>

<script>
import ResetPwdForm from '../components/resetPwdForm'
export default {
  name: 'resetPwd',
  components: {ResetPwdForm}
}
</script>

<style scoped>
</style>
