<template>
  <v-card outlined tile>
    <!-- loading/error overlay slot -->
    <slot></slot>
    <!-- end:loading/error overlay slot -->

    <!-- loading -->
    <div v-if="isLoading">
      <div v-for="(n, index) in 4" :key="index">
        <component :is="`v-scale-transition`" hide-on-leave>
          <v-skeleton-loader height="94" type="list-item-two-line" />
        </component>
      </div>
    </div>
    <!-- end:loading -->
    <!-- no tasks -->
    <v-card flat v-if="noTasks && !this.isLoading && !this.errorOccurred">
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
    <!-- end: no tasks -->
    <!-- error occurred -->
    <v-card flat v-if="this.errorOccurred">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-list-item three-line>
              <v-list-item-content>
                <v-icon size="64">mdi-emoticon-dead-outline</v-icon>
                <v-list-item-title class="headline mb-1 text-center"
                  >An internal error occurred</v-list-item-title
                >
                <v-list-item-subtitle class="text-center"
                  >Sorry about that! Please try again
                  later</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <!-- error occurred -->

    <!-- default tasks view -->
    <v-list class="list-items" v-if="showTasks">
      <todo-list-task
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
      />
    </v-list>
    <!-- end:default tasks view -->
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
    errorOccurred: {
      type: Boolean,
      default: false
    },
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
