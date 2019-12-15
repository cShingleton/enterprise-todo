import Vue from "vue";

import App from "@/App.vue";
import router from "@/plugins/vue-router";
import store from "@/plugins/vuex/index.js";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
