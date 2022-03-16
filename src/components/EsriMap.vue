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
      map: null,
      mapView: null,
      markerLayer: null,
      mapSettings: {
        basemap: 'dark-gray-vector',
      },
      selectedPoint: null,
    }
  },
  mounted() {
    // create map
    // use $options to remove reactivity as arcgis will not work with vue reactivity
    this.$options.map = this.createMap(this.mapSettings);

    // add layers
    this.$options.markerLayer = new GraphicsLayer();
    this.$options.map.add(this.$options.markerLayer);

    // create mapView
    this.$options.mapView = this.createMapView(this.$options.map);

    // set up events
    this.enableMapClickSelectPoint();

    if (!this.$options.mapView) {
      console.log('failed to create mapView');
      return;
    }
  },
  watch: {
    selectedPoint(val) {
      this.$options.markerLayer.removeAll();
      this.addMarker(new Point({latitude: val.latitude, longitude: val.longitude}));
      this.$emit('selected-point', this.selectedPoint);
    },
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
    addMarker(point) {
      const graphic = new Graphic({
        geometry: point,
        symbol: this.createMarkerGraphic(),
      });
      this.$options.markerLayer.add(graphic);
    },
    createMarkerGraphic() {
      return new SimpleMarkerSymbol({
        color: '#b042ff',
        size: 30,
        xoffset: -2,
        yoffset: 17,
        path: Paths.pin,
      });
    },
    enableMapClickSelectPoint() {
      this.$options.mapView.on("click", (e) => this.selectMapPoint(e));
    },
    selectMapPoint(e) {
      this.selectedPoint = {latitude: e.mapPoint.latitude, longitude: e.mapPoint.longitude};
    },
  },
}
</script>

<style lang="scss">
  .esri-map-main {
    height: 100%;
    width: 100%;
    
  }
  .esri-view .esri-view-surface--inset-outline:focus::after {
    outline: none !important;
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