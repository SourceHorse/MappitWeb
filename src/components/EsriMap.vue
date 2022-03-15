<template>
  <div id="esri-map" class="esri-map-main"></div>
</template>

<script>
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import Paths from '@/assets/Paths';

export default {
  name: 'EsriMap',
  components:{},
  data() {
    return {
      mapView: null,
      markerLayer: null,
      mapSettings: {
        basemap: 'dark-gray-vector',
      }
    }
  },
  mounted() {
    // create map
    const map = this.createMap(this.mapSettings);
    // add layers
    const markerLayer = new GraphicsLayer();
    // use $options to remove reactivity as arcgis will not work with vue reactivity
    this.$options.markerLayer = markerLayer;
    map.add(markerLayer);

    this.addMarker();

    this.$options.mapView = this.createMapView(map);
    console.log(this.$options.mapView);

    if (!this.$options.mapView) {
      console.log('failed to create mapView');
      return;
    }
  },
  methods: {
    createMap(mapSettings) {
      return new Map(mapSettings);
    },
    createMapView(map) {
      return new MapView({
        container: 'esri-map',
        map: map,
        zoom: 7,
        center: [-78.8, 35.85],
      });
    },
    addMarker() {
      const point = new Point({latitude: 35.85, longitude: -78.8});
      const graphic = new Graphic({
        geometry: point,
        symbol: this.createMarkerGraphic(),
      });
      this.$options.markerLayer.add(graphic);
    },
    createMarkerGraphic() {
      return new SimpleMarkerSymbol({
        color: 'red',
        path: Paths.pin,
      });
    }
  },
}
</script>

<style lang="scss">
  .esri-map-main {
    height: 100%;
    width: 100%;
  }
</style>