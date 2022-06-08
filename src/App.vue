<template>
  <v-app>
    <v-main>
      <!-- <leaflet-map /> -->
      <esri-map
        ref="esriMap"
        v-on:selected-point="selectedPoint = $event" />
      <PlotPanel
        v-show="showPlotPanel"
        :selectedPoint="selectedPoint"
        @close="cancelCreate" />
      <div class="context-btn-container">
        <div></div>
        <v-btn
          class="post-create-btn"
          color="primary"
          v-if="selectedPoint && !showPlotPanel"
          @click="openCreate"
        >
          Create Post
        </v-btn>
        <v-btn
          class="post-create-btn"
          color="secondary"
          v-if="selectedPoint && !showPlotPanel"
          @click="openCreate"
        >
          Zoom To
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
      showPlotPanel: false,
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
    openCreate() {
      this.showCreate = false;
      this.showPlotPanel = true;
    },
    cancelCreate() {
      this.showPlotPanel = false;
      this.$refs.esriMap.clearMapPoint();
    }
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
.post-create-btn {
  position: absolute;
  z-index: 1000;
  bottom: 15%;
}
.create-btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>