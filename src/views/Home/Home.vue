<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile>
          <v-card-title class="display-1 justify-center">Taskbox</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12">
        <todo-list />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TodoList from "./_modules/TodoList";

export default {
  name: "home-view",
  components: {
    TodoList
  }
};
</script>
