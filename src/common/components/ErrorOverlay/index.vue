<template>
  <div class="error-overlay-container">
    <div class="error-overlay-message-container">
      <div class="error-overlay-status-code">
        {{ errorErrorCode || errorStatusCode }}
      </div>
      <v-divider vertical />
      <v-tooltip bottom v-model="showOverflowTooltip">
        <template v-slot:activator="{ on }">
          <div
            @mouseover="toggleTooltip"
            @mouseleave="toggleTooltip"
            ref="error-overlay-message"
            class="error-overlay-message"
          >
            {{ errorMsgFormatted }}
          </div>
        </template>
        <span>{{ errorMsgFormatted }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorErrorCode: {
      type: String,
      default: "500"
    },
    errorMsg: {
      type: String,
      default: "There was an error"
    },
    errorStatusCode: {
      type: String,
      default: "500"
    },
    errorType: {
      type: String,
      default: "Unknown"
    }
  },
  computed: {
    errorMsgFormatted() {
      return this.friendlyErrorLib[this.errorErrorCode] || this.errorMsg;
    }
  },
  data: () => ({
    errorMessageOverflows: false,
    showOverflowTooltip: false,
    friendlyErrorLib: {
      // errorCode: user-message
      // TODO: ADD FRIENDLY ERROR LIBRARY FOR USER CONSUMPTION
      // Validation errors
    }
  }),
  methods: {
    toggleTooltip() {
      this.showOverflowTooltip =
        this.errorMessageOverflows && !this.showOverflowTooltip;
    }
  },
  watch: {
    errorMsgFormatted(newValue) {
      if (newValue && newValue.length) {
        this.$nextTick(() => {
          const errorMsgEl = this.$refs["error-overlay-message"];
          this.errorMessageOverflows =
            errorMsgEl.offsetWidth < errorMsgEl.scrollWidth;
        });
      }
    }
  }
};
</script>

<style>
.error-overlay-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(211, 211, 211, 0.85);
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.error-overlay-message-container {
  display: flex;
  max-width: 100%;
}

.error-overlay-message {
  color: #222c3d;
  padding: 12px;
  background-color: #fff;
  text-transform: uppercase;
  font-size: 15px !important;
  align-self: flex-end;
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.error-overlay-status-code {
  color: red;
  padding: 12px;
  background-color: #fff;
  text-transform: uppercase;
  font-size: 15px !important;
  align-self: flex-end;
  height: 48px;
}
</style>
