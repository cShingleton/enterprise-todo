<template>
  <todo-list-list :is-loading="isLoading.tasks" :tasks="tasks"></todo-list-list>
</template>

<script>
import { mapState } from "vuex";

import TodoListList from "./_components/TodoListList/TodoListList";
import store from "./_store";

export default {
  name: "todo-list-module",
  components: {
    TodoListList
  },
  computed: {
    ...mapState({
      error: state => state.$_todoList.error,
      isLoading: state => state.$_todoList.isLoading,
      tasks: state => state.$_todoList.tasks
    })
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
