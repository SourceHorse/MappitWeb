<template>
  <div id="mapDiv" class="map-div"></div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export default {
  name: 'MappitMap',
  data() {
    return {
      drawLayer: null,
      view: null,
    }
  },
  mounted() {
    var map = this.createMap();
    this.view = new MapView({
      container: 'mapDiv',
      map: map,
      center: [-78.7, 35.8],
      zoom: 14,
    });
  },
  methods: {
    createMap() {
      const map = new Map({
        basemap: 'topo-vector'
      });
      return map;
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
  }
</style>
