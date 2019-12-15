<template>
  <div>
    <slot />
    <message-stack
      :messages-stack="messagesStack"
      :messages-to-display="messagesToDisplay"
      :message-on-display="messageOnDisplay"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import store from "./_store";
import messageStack from "./_components/MessageStack.vue";

export default {
  name: "message-stack-module",
  components: {
    messageStack
  },
  computed: {
    ...mapState({
      messagesToDisplay: state => state.$_messageStack.messagesToDisplay,
      messageOnDisplay: state => state.$_messageStack.messageOnDisplay,
      messagesStack: state => state.$_messageStack.messagesStack
    })
  },
  created() {
    const STORE_KEY = "$_messageStack";
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  }
};
</script>
