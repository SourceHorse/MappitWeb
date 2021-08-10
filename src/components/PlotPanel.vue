<template>
  <div id="plotPanel" class="plot-panel">
    <div class="header">
      <!-- Vuetify still doesn't support Vue 3?? -->
      <button class="close" @click="onClickClose">
        <font-awesome-icon icon="times" />
      </button>
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
.plot-panel {
  position: absolute;
  height: 100vh;
  width: 390px;
  top: 0;
  right: 0;
  background-color: white;
  z-index: 1000;
}
.close {
  float: right;
  height: 40px;
  width: 50px;
}
</style>
