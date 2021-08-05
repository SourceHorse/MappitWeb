<template>
  <div id="mapDiv" class="map-div"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: 'MappitMap',
  data() {
    return {
      drawLayer: null,
      mapView: null,
    }
  },
  mounted() {
    var map = L.map('mapDiv').setView([35.85, -78.8], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .map-div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
</style>