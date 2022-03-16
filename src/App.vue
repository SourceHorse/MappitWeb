<template>
  <v-app>
    <v-main>
      <!-- <leaflet-map /> -->
      <esri-map 
        v-on:selected-point= "selectedPoint = $event" />
      <PlotPanel
        v-show="showPlotPanel"
        :currentLatLng="currentLatLng"
        @close="cancelCreate" />
      <div class="create-btn-container">
        <v-btn
          class="post-create-btn"
          color="primary"
          v-if="selectedPoint"
          @click="openCreate"
        >
          Create Post
        </v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>
// import LeafletMap from './components/LeafletMap.vue'
import EsriMap from './components/EsriMap.vue'
import PlotPanel from './components/PlotPanel.vue'
import postsStore from "@/store/posts";

export default {
  name: 'App',
  components: {
    // LeafletMap,
    EsriMap,
    PlotPanel,
  },

  data() {
    return {
      selectedPoint: null,
      showCreate: false,
    }
  },
  beforeCreate() {
    if (!this.$store.state.posts) {
      this.$store.registerModule('posts', postsStore);
    }
  },
  watch: {
    selectedPoint(val) {
      console.log(val);
      this.showCreate = true;
    },
  },
  methods: {
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
}
.v-field-label--floating {
  font-size: 0.75rem;
}
</style>