<template>
  <div id="app">
    <MappitMap />
  </div>
</template>

<script>
import MappitMap from "./components/MappitMap.vue";
export default {
  name: 'App',
  components: {
    MappitMap,
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
