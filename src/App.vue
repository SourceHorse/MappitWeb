<template>
  <v-app>
    <v-main>
      <leaflet-map />
    </v-main>
  </v-app>
</template>

<script>
import LeafletMap from './components/LeafletMap.vue'

export default {
  name: 'App',
  components: {
    LeafletMap,
  },

  data: () => ({
    //
  }),
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
//TODO: Move this to another file
button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  &.primary {
    background-color: rgb(0, 117, 117);
    color: white;
    border-radius: 5px;
    padding: 1em 2em;
    font-family: Arial;
    &:hover {
      background-color: rgb(0, 97, 97);
      box-shadow: 10px 10px 10px -10px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>