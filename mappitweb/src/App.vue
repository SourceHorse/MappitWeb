<template>
  <MappitMap />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MappitMap from "./components/MappitMap.vue";

@Options({
  components: {
    MappitMap,
  },
})
export default class App extends Vue {}
</script>

<style>
  @import "https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/dark/main.css";
</style>
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
