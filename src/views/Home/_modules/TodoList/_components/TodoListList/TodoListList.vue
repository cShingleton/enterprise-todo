<template>
  <v-card outlined tile>
    <div v-if="isLoading">
      <div v-for="(n, index) in 4" :key="index">
        <component :is="`v-scale-transition`" hide-on-leave>
          <v-skeleton-loader height="94" type="list-item-two-line" />
        </component>
      </div>
    </div>
    <v-card flat v-if="noTasks && !this.isLoading">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-list-item three-line>
              <v-list-item-content>
                <v-icon size="64">mdi-check</v-icon>
                <v-list-item-title class="headline mb-1 text-center"
                  >You have no tasks</v-list-item-title
                >
                <v-list-item-subtitle class="text-center"
                  >Sit back and relax</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-list class="list-items" v-if="showTasks">
      <todo-list-task
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
      />
    </v-list>
  </v-card>
</template>

<script>
import TodoListTask from "../TodoListTask/TodoListTask";
export default {
  name: "todo-list-list",
  components: {
    TodoListTask
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    tasks: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    noTasks() {
      return this.tasks.length == 0;
    },
    showTasks() {
      return !this.isLoading && !this.noTasks;
    }
  }
};
</script>
