<template>
  <div>
    <div id="mapDiv" class="map-div"></div>
    <PlotPanel v-show="showPlotPanel" @close="cancelPlot" />
  </div>
</template>

<script>
import L from "leaflet";
import PlotPanel from "./PlotPanel.vue";

export default {
  name: "Map",
  components: {
    PlotPanel,
  },
  data() {
    return {
      map: null,
      markerLayer: null,
      showPlotPanel: false,
    };
  },
  mounted() {
    this.map = this.createMap();
    this.map.on("click", this.mapClick);
    this.map.on("dragstart", this.dragStart);
    this.map.on("dragend", this.dragEnd);
  },
  watch: {},
  methods: {
    createMap() {
      var map = L.map("mapDiv").setView([35.85, -78.8], 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      this.markerLayer = new L.LayerGroup().addTo(map);

      return map;
    },
    mapClick(e) {
      console.log(e);
      this.clearMarkers();
      this.addMarker(e.latlng);
      if (!this.showPlotPanel) {
        console.log(this.isMobile());
        const horizontalOffset = this.isMobile() ? 0 : -195;
        this.centerZoomOffset(e.latlng, this.map.getZoom(), [
          horizontalOffset,
          0,
        ]);
      }
      this.showPlotPanel = true;
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
      console.log(offset);
      zoom = zoom ?? this.map.getZoom();
      offset = offset ?? 0;

      var targetPoint = this.map.project(latLng, zoom).subtract(offset),
        targetLatLng = this.map.unproject(targetPoint, zoom);
      this.map.setView(targetLatLng, zoom);
    },
    cancelPlot() {
      this.clearMarkers();
      this.showPlotPanel = false;
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
  height: 100vh;
  width: 100vw;
  cursor: pointer;
  &.off-map {
    cursor: default;
  }
  &.drag {
    cursor: grabbing !important;
  }
}
</style>
