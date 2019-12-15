<template>
  <div id="app">
    <v-app>
      <v-content>
        <message-stack>
          <vue-error-boundary>
            <router-view />
          </vue-error-boundary>
        </message-stack>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import MessageStack from "@/common/modules/MessageStack/index";
import VueErrorBoundary from "@/common/components/VueErrorBoundary/index";

export default {
  name: "app",
  components: { MessageStack, VueErrorBoundary }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
