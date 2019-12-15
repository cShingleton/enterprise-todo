<template>
  <todo-list-list
    :error-occurred="error.tasks.detected"
    :is-loading="currentlyLoading"
    :tasks="tasks"
  >
    <loading-overlay v-show="isLoading.tasks" />
    <error-overlay
      v-show="error.tasks.detected"
      :error-error-code="error.tasks.errorCode"
      :error-msg="error.tasks.message"
      :error-status-code="error.tasks.statusCode"
      :error-type="error.tasks.type"
    ></error-overlay>
  </todo-list-list>
</template>

<script>
import { mapState } from "vuex";

import ErrorOverlay from "@/common/components/ErrorOverlay/index";
import LoadingOverlay from "@/common/components/LoadingOverlay/index";
import TodoListList from "./_components/TodoListList/TodoListList";
import store from "./_store";

export default {
  name: "todo-list-module",
  components: {
    ErrorOverlay,
    LoadingOverlay,
    TodoListList
  },
  computed: {
    ...mapState({
      error: state => state.$_todoList.error,
      isLoading: state => state.$_todoList.isLoading,
      tasks: state => state.$_todoList.tasks
    }),
    currentlyLoading() {
      const loadingStates = Object.values(this.isLoading);
      const isLoading = loadingStates.find(state => state === true);
      return Boolean(isLoading);
    }
  },
  created() {
    // register private store key on module instantiation
    const STORE_KEY = "$_todoList";
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  mounted() {
    this.$store.dispatch("$_todoList/getTasks");
  }
};
</script>
