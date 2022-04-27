<template>
  <div>
    <vue-particles
      id="particles-js"
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
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style scoped>
#particles-js{
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
}
</style>
