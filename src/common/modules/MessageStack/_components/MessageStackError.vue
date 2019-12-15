<template>
  <div class="message-stack-error-container">
    <div class="message-stack-error-status">{{ errorMessage.statusCode }}</div>
    <v-divider vertical dark class="mx-2" style="background-color: white" />
    <div class="message-stack-error-message">{{ errorMessage.message }}</div>
    <div v-if="isInDevEnv" class="message-stack-error-stack">
      <a
        @click="logErrorToConsole(errorMessage.stack)"
        class="message-stack-error-stack-link"
        >(Click to log error stack trace to console)</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "message-stack-error",
  props: {
    errorMessage: {
      type: Object,
      default: () => ({
        message: "No error message was provided",
        statusCode: 500,
        stack: "Unable to determine stack trace"
      })
    }
  },
  computed: {
    isInDevEnv() {
      return process.env.NODE_ENV === "development";
    }
  },
  methods: {
    logErrorToConsole(stackTrace) {
      return console.error(stackTrace);
    }
  }
};
</script>

<style scoped>
.message-stack-error-container {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.message-stack-error-message {
  text-transform: uppercase;
  font-size: 14px;
  margin: 0 8px 0 0;
}

.message-stack-error-separator,
.message-stack-error-status {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 18px;
  color: red;
}

.message-stack-error-stack {
  text-decoration: underline;
}

.message-stack-error-stack-link {
  color: white;
  font-size: 14px;
}
</style>
