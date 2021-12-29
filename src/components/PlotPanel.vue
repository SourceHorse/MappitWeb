<template>
  <div class="backdrop">
    <div id="plotPanel" class="plot-panel">
      <div class="header">
        <!-- Vuetify still doesn't support Vue 3?? -->
        <button class="close" @click="onClickClose">
          <font-awesome-icon icon="times" />
        </button>
      </div>
      <div class="panel-body">
        <v-text-field
          label="Title"
        >
        </v-text-field>
        <v-text-field
          v-model="latitude"
          label="Latitude"
          :readonly="true"
        >
        </v-text-field>
        <v-text-field
          v-model="longitude"
          label="Longitude"
        >
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlotPanel",
  props: {
    currentLatLng: null,
  },
  computed: {
    latitude() {
      return this.currentLatLng ? this.currentLatLng.lat : null;
    },
    longitude() {
      return this.currentLatLng ? this.currentLatLng.lng : null;
    },
  },
  methods: {
    onClickClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.backdrop {
  position: absolute;
  backdrop-filter: blur(7px);
  height: 100vh;
  width: 390px;
  top: 0;
  right: 0;
  z-index: 1001;
}
.plot-panel {
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: -10px 0px 15px -15px rgba(0, 0, 0, 0.5);
}
.panel-body {
  padding: 10px;
}
.v-text-field {
  padding-bottom: 0px;
}
.header {
  background-color: white;
  height: 40px;
  font-family: Arial;
  .close {
    float: right;
    font-size: 17px;
    height: 100%;
    width: 50px;
  }
}
@media only screen and (max-width: 450px) {
  .backdrop {
    width: 100vw;
  }
}
</style>