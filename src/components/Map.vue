<template>
  <div id="mapDiv" class="map-div">
    <PlotPanel v-show="showPlotPanel" @close="showPlotPanel = false" />
  </div>
</template>

<script>
import L from "leaflet";
import PlotPanel from "./PlotPanel.vue";

export default {
  name: "MappitMap",
  components: {
    PlotPanel,
  },
  data() {
    return {
      map: null,
      showPlotPanel: false,
    };
  },
  mounted() {
    this.map = this.createMap();
    this.map.on("click", this.mapClick);
    this.map.on("dragstart", this.dragStart);
    this.map.on("dragend", this.dragEnd);

    this.disableMapInteractionOnElement(document.getElementById("plotPanel"));
  },
  watch: {},
  methods: {
    createMap() {
      var map = L.map("mapDiv").setView([35.85, -78.8], 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      return map;
    },
    mapClick(e) {
      console.log(e);
      this.addMarker(e.latlng);
    },
    dragStart() {
      document.getElementById("mapDiv").classList.add("drag");
    },
    dragEnd() {
      document.getElementById("mapDiv").classList.remove("drag");
    },
    addMarker(latLng) {
      L.marker([latLng.lat, latLng.lng]).addTo(this.map);
      this.showPlotPanel = true;
    },
    disableMapInteractionOnElement(element) {
      element.addEventListener("mouseover", () => {
        this.map.dragging.disable();
        this.map.touchZoom.disable();
        this.map.doubleClickZoom.disable();
        this.map.scrollWheelZoom.disable();
        this.map.boxZoom.disable();
        this.map.keyboard.disable();
        if (this.map.tap) this.map.tap.disable();
        this.map.off("click");
        document.getElementById("mapDiv").classList.add("off-map");
      });
      element.addEventListener("mouseleave", () => {
        this.map.dragging.enable();
        this.map.touchZoom.enable();
        this.map.doubleClickZoom.enable();
        this.map.scrollWheelZoom.enable();
        this.map.boxZoom.enable();
        this.map.keyboard.enable();
        if (this.map.tap) this.map.tap.enable();
        this.map.on("click", this.mapClick);
        document.getElementById("mapDiv").classList.remove("off-map");
      });
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
