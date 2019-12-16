<template>
  <div class="message-stack-info-container">
    <div class="message-stack-info-status">{{ infoMessage.status }}</div>
    <div class="message-stack-info-separator">-</div>
    <div class="message-stack-info-message">{{ infoMessage.message }}</div>
  </div>
</template>

<script>
export default {
  name: "message-stack-info",
  props: {
    infoMessage: {
      type: Object,
      default: () => ({
        message: "Message for event not provided",
        status: "Unknown"
      })
    }
  }
};
</script>

<style scoped>
.message-stack-info-container {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.message-stack-info-message {
  text-transform: uppercase;
  font-size: 16px;
  margin-bottom: 2px;
}

.message-stack-info-separator,
.message-stack-info-status {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 18px;
  color: limegreen;
}

.message-stack-info-separator {
  margin: 0 4px 2px 4px;
}
</style>
