<template>
  <v-snackbar v-model="messagesToDisplay" :timeout="0" class="v-snack-override">
    <message-stack-error
      v-if="messageIsError"
      :error-message="messageOnDisplay.details"
    />
    <message-stack-info v-else :info-message="messageOnDisplay.details" />
    <v-btn
      class="white--text font-weight-bold"
      color="accent"
      outlined
      small
      @click="dismissMessage()"
      >{{ sizeOfStack >= 1 ? `NEXT (${sizeOfStack} More)` : `CLOSE` }}</v-btn
    >
  </v-snackbar>
</template>

<script>
import MessageStackError from "./MessageStackError.vue";
import MessageStackInfo from "./MessageStackInfo.vue";

export default {
  name: "message-stack",
  components: { MessageStackError, MessageStackInfo },
  props: {
    messagesToDisplay: {
      type: Boolean,
      default: false
    },
    messageOnDisplay: {
      type: Object,
      default: () => ({
        type: null,
        details: {
          message: "",
          status: "",
          // error
          stack: ""
        }
      })
    },
    messagesStack: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    areMessagesInStack() {
      return this.messagesStack.length > 0;
    },
    messageIsError() {
      return (
        this.messageOnDisplay.type !== null &&
        this.messageOnDisplay.type === "error"
      );
    },
    sizeOfStack() {
      return this.messagesStack.length;
    }
  },
  methods: {
    dismissMessage() {
      this.$store.dispatch("$_messageStack/removeMessageFromStack");
    }
  }
};
</script>

<style>
.v-snack-override > .v-snack__wrapper {
  max-width: 100% !important;
}
</style>
