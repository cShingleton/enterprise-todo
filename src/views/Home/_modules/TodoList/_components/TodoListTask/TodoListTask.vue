<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox :disabled="isChecked" v-model="isChecked"></v-checkbox>
    </v-list-item-action>

    <v-list-item-content>
      <v-list-item-title :class="[isChecked && 'grey--text', 'text-left']">{{
        task.title
      }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-action v-if="!isChecked">
      <v-btn @click="favouriteTask" icon>
        <v-icon
          :color="
            task.state === 'TASK_PINNED' ? 'deep-purple accent-4' : 'grey'
          "
        >
          {{ task.state === "TASK_PINNED" ? "mdi-star" : "mdi-star-outline" }}
        </v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "todo-list-task",
  props: {
    task: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    isChecked: {
      get: function getArchivedState() {
        return this.task.state === "TASK_ARCHIVED";
      },
      set: function archiveTask() {
        this.$store
          .dispatch("$_todoList/updateTaskState", {
            state: "TASK_ARCHIVED",
            taskId: this.task.taskId
          })
          .then(() => this.$store.dispatch("$_todoList/getTasks"));
      }
    },
    isPinned() {
      return this.task.state === "TASK_PINNED";
    }
  },
  methods: {
    favouriteTask() {
      this.$store
        .dispatch("$_todoList/updateTaskState", {
          state: "TASK_PINNED",
          taskId: this.task.taskId
        })
        .then(() => this.$store.dispatch("$_todoList/getTasks"));
    }
  }
};
</script>
