<template>
  <v-app>
    <v-main>
      <!-- <leaflet-map /> -->
      <esri-map />
    </v-main>
  </v-app>
</template>

<script>
// import LeafletMap from './components/LeafletMap.vue'
import EsriMap from './components/EsriMap.vue'

export default {
  name: 'App',
  components: {
    // LeafletMap,
    EsriMap,
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
.v-field-label--floating {
  font-size: 0.75rem;
}
</style>