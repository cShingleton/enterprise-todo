<template>
  <div class="loading-overlay-container">
    <div class="loading-overlay-message-container">
      <div class="loading-overlay-progress">
        <v-progress-circular
          indeterminate
          color="green"
          size="24"
          width="2"
        ></v-progress-circular>
      </div>
      <v-divider vertical />
      <div class="loading-overlay-message">Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading-overlay"
};
</script>

<style>
.loading-overlay-container {
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

.loading-overlay-message-container {
  display: flex;
  max-width: 100%;
}

.loading-overlay-message {
  padding: 12px;
  background-color: #fff;
  text-transform: uppercase;
  font-size: 15px !important;
  align-self: flex-end;
  height: 48px;
}

.loading-overlay-progress {
  padding: 12px;
  background-color: #fff;
  text-transform: uppercase;
  font-size: 15px !important;
  align-self: flex-end;
  height: 48px;
}
</style>
