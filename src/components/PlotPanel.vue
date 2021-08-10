<template>
  <div class="backdrop">
    <div id="plotPanel" class="plot-panel">
      <div class="header">
        <!-- Vuetify still doesn't support Vue 3?? -->
        <button class="close" @click="onClickClose">
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlotPanel",
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
  z-index: 1000;
}
.plot-panel {
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: -10px 0px 15px -15px rgba(0, 0, 0, 0.5);
}
.header {
  background-color: white;
  height: 40px;

  .close {
    float: right;
    font-size: 17px;
    height: 100%;
    width: 50px;
  }
}
</style>
