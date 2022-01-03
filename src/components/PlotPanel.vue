<template>
  <div class="backdrop">
    <div id="plotPanel" class="plot-panel">
      <div class="header">
        <v-btn
          small
          color="primary"
          @click="onClickClose"
        >
          <font-awesome-icon icon="times" />
        </v-btn>
      </div>
      <div class="panel-body">
        <v-text-field
          label="Title"
          v-model="title"
        ></v-text-field>
        <v-textarea
          auto-grow
          label="Comment"
          rows="3"
          filled
          v-model="comment"
        ></v-textarea>
        <span class="lat-long-text">
          {{ latLongText }}
        </span>
      </div>
      <div class="action-bar">
        <v-btn
          color="primary"
          elevation="2"
        >
        Submit
        </v-btn>
        <v-btn
          elevation="2"
          @click="onClickClose"
        >
        Cancel
        </v-btn>
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
  data() {
    return {
      title: null,
      comment: null,
    };
  },
  computed: {
    latitude() {
      return this.currentLatLng ? this.currentLatLng.lat : null;
    },
    longitude() {
      return this.currentLatLng ? this.currentLatLng.lng : null;
    },
    latLongText() {
      return `lat: ${Math.round((this.latitude + Number.EPSILON)*100000)/100000}, long: ${Math.round((this.longitude + Number.EPSILON)*100000)/100000}`
    }
  },
  methods: {
    onClickClose() {
      this.title = null;
      this.comment = null;
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.backdrop {
  position: absolute;
  backdrop-filter: blur(7px);
  height: 100%;
  width: 390px;
  top: 0;
  right: 0;
  z-index: 1001;
}
.plot-panel {
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: -10px 0px 15px -15px rgba(0, 0, 0, 0.5);
}
.panel-body {
  padding: 10px;
  height: 100%;
}
.v-text-field {
  padding-bottom: 0px;
}
.action-bar {
  border-top: 1px solid #eee;
  position: absolute;
  bottom: 0;
  padding: 10px;
  width: 100%;
  background-color: white;
  .v-btn {
    display: block;
    float: left;
    margin-right: 10px;
  }
}
.header {
  border-bottom: 1px solid #eee;
  display: inline-block;
  background-color: white;
  font-family: Arial;
  padding: 10px;
  width: 100%;
  .v-btn {
    float: right;
    font-size: 17px;
  }
  .v-btn--size-default {
    min-width: 0px;
  }
}
.lat-long-text {
  opacity: 0.5;
}
@media only screen and (max-width: 450px) {
  .backdrop {
    width: 100vw;
  }
}
</style>