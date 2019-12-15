import Vue from "vue";
import Vuetify from "vuetify";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

const options = {
  options: {
    customProperties: true
  },
  iconfont: "mdi"
};

Vue.use(Vuetify);

export default new Vuetify(options);
