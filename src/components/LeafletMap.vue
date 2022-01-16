<template>
  <div>
    <div id="mapDiv" class="map-div"></div>
    <PlotPanel
      v-show="showPlotPanel"
      :currentLatLng="currentLatLng"
      @close="cancelCreate" />
    <div class="create-btn-container">
      <v-btn
        class="post-create-btn"
        color="primary"
        v-if="showCreate"
        @click="openCreate"
      >
        Create Post
      </v-btn>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import PlotPanel from "./PlotPanel.vue";
import postsStore from "@/store/posts";
export default {
  name: "LeafletMap",
  components: {
    PlotPanel,
  },
  data() {
    return {
      map: null,
      markerLayer: null,
      showPlotPanel: false,
      showCreate: false,
      currentLatLng: null,
    };
  },
  beforeCreate() {
    if (!this.$store.state.posts) {
      this.$store.registerModule('posts', postsStore);
    }
  },
  mounted() {
    this.map = this.createMap();

    // force view reload
    // an issue on mobile was causing the map view to only load on the top half of the screen
    this.map.invalidateSize();

    this.map.on("click", this.mapClick);
    this.map.on("dragstart", this.dragStart);
    this.map.on("dragend", this.dragEnd);
  },
  watch: {},
  methods: {
    createMap() {
      var map = L.map("mapDiv").setView([35.85, -78.8], 11);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(map);
      this.markerLayer = new L.LayerGroup().addTo(map);
      return map;
    },
    mapClick(e) {
      this.clearMarkers();
      this.currentLatLng = e.latlng;
      this.addMarker(e.latlng);
      if (!this.showPlotPanel) {
        this.showCreate = true;
      }
    },
    dragStart() {
      document.getElementById("mapDiv").classList.add("drag");
    },
    dragEnd() {
      document.getElementById("mapDiv").classList.remove("drag");
    },
    addMarker(latLng) {
      L.marker(latLng).addTo(this.markerLayer);
    },
    clearMarkers() {
      this.markerLayer.clearLayers();
    },
    centerZoomOffset(latLng, zoom, offset) {
      zoom = zoom ?? this.map.getZoom();
      offset = offset ?? 0;
      var targetPoint = this.map.project(latLng, zoom).subtract(offset),
        targetLatLng = this.map.unproject(targetPoint, zoom);
      this.map.setView(targetLatLng, zoom);
    },
    cancelCreate() {
      this.clearMarkers();
      this.showPlotPanel = false;
    },
    openCreate() {
      const horizontalOffset = this.isMobile() ? 0 : -195;
      this.centerZoomOffset(this.currentLatLng, this.map.getZoom(), [
        horizontalOffset,
        0,
      ]);
      this.showCreate = false;
      this.showPlotPanel = true;
    },
  },
};
</script>
<style scoped>
@import "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
</style>
<style scoped lang="scss">
.map-div {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  cursor: pointer;
  &.off-map {
    cursor: default;
  }
  &.drag {
    cursor: grabbing !important;
  }
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