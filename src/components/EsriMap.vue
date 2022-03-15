<template>
  <div id="esri-map" class="esri-map-main"></div>
</template>

<script>
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

export default {
  name: 'EsriMap',
  components:{},
  data() {
    return {

      mapView: null,
      mapSettings: {
        basemap: "topo-vector",
      }
    }
  },
  mounted() {
    const map = this.createMap(this.mapSettings);
    // add layers
    //
    this.mapView = this.getMapView(map);
    if (!this.mapView) {
      console.log('failed to create mapView');
      return;
    }
  },
  methods: {
    createMap(mapSettings) {
      return new Map(mapSettings);
    },
    getMapView(map) {
      return new MapView({
        container: 'esri-map',
        map: map,
        zoom: 7,
        center: [-75, 35],
      });
    },
  },
}
</script>

<style lang="scss">
  .esri-map-main {
    height: 100%;
    width: 100%;
  }
</style>