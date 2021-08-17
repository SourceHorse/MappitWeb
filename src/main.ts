import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import mixins from "./mixins";

library.add(faTimes);

createApp(App)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mixin({
    methods: mixins,
  })
  .mount("#app");
