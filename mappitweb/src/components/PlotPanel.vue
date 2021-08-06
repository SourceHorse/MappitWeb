<template>
  <div> 
    <div v-show="show" id="plotPanel" class="plot-panel">
      <div class="header">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlotPanel',
  components: {
  },
  props: {
    showPlotPanel: false,
  },
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    
  },
  watch: {
    showPlotPanel(val) {
      this.show = val;
    },
  },
  methods: {
    
  }
}
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
</style>