<template>
  <div class="backdrop">
    <div id="plotPanel" class="plot-panel">
      <div class="header">
        <n-button
          @click="onClickClose"
        >
          <font-awesome-icon icon="times" />
        </n-button>
      </div>
      <div class="panel-body">
        <n-input
          v-model:value="title"
          type="text"
          placeholder="Title"
        ></n-input>
        <n-input
          v-model:value="comment"
          type="textarea"
          placeholder="Comment"
          size="small"
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
        ></n-input>
        <span class="lat-long-text">
          {{ latLongText }}
        </span>
      </div>
      <div class="action-bar">
        <n-button
          type="primary"
          @click="addPost"
        >
        Submit
        </n-button>
        <n-button
          @click="onClickClose"
        >
        Cancel
        </n-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlotPanel",
  props: {
    selectedPoint: null,
  },
  data() {
    return {
      title: null,
      comment: null,
    };
  },
  computed: {
    latitude() {
      return this.selectedPoint ? this.selectedPoint.latitude : null;
    },
    longitude() {
      return this.selectedPoint ? this.selectedPoint.longitude : null;
    },
    latLongText() {
      return `lat: ${Math.round((this.latitude + Number.EPSILON)*100000)/100000}, long: ${Math.round((this.longitude + Number.EPSILON)*100000)/100000}`
    },
    posts() {
      return this.$store.state.posts.posts;
    }
  },
  watch: {
    posts: {
      handler: function(val) {
        console.log(val[0]);
      },
      deep: true
    }
  },
  methods: {
    onClickClose() {
      this.title = null;
      this.comment = null;
      this.$emit("close");
    },
    addPost() {
      console.log('component method');
      const post = {
        title: this.title,
        body: this.comment,
        latLng: this.currentLatLng,
      };
      console.log(post);
      this.$store.commit('posts/addPost', post);
    }
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
.action-bar {
  border-top: 1px solid #eee;
  position: absolute;
  bottom: 0;
  padding: 10px;
  width: 100%;
  background-color: white;
  .n-button {
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
  .n-button {
    float: right;
    font-size: 17px;
    transform: translateX(-50%);
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