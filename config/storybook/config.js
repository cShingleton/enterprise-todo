/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator } from "@storybook/vue";

import vuetify from "@/plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";

// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  template: "<v-app><v-content><story/></v-content></v-app>",
  vuetify
}));

const req = require.context("../../src", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
