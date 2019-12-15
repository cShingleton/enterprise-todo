<template>
  <div>
    <slot />
  </div>
</template>

<script>
import msgStack from "@/common/modules/MessageStack/_utils/wrappers";

export default {
  name: "vue-error-boundary",
  errorCaptured(err) {
    msgStack.dispatchErrMsg(this.$store.dispatch, err);
    // stop error propogation
    return false;
  }
};
</script>
