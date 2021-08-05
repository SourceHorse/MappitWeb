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
      map: null,
    }
  },
  mounted() {
    this.map = this.createMap();
    this.map.on('click', this.mapClick);
    this.map.on('dragstart', this.dragStart);
    this.map.on('dragend', this.dragEnd);
  },
  methods: {
    createMap() {
      var map = L.map('mapDiv').setView([35.85, -78.8], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      return map;
    },
    mapClick(e) {
      console.log(e);
    },
    dragStart() {
      document.getElementById('mapDiv').classList.add('drag');
      console.log('dragging');
    },
    dragEnd() {
      document.getElementById('mapDiv').classList.remove('drag');
      console.log('not dragging');
    }
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
    cursor: pointer;

    &.drag {
      cursor: grabbing !important;
    }
  }
</style>