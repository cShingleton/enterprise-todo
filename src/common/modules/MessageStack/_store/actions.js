export default {
  addMessageToStack,
  removeMessageFromStack
};

function addMessageToStack({ commit }, payload) {
  const { type, details } = payload;
  commit("PUSH_MESSAGE_TO_QUEUE", { type, details });
}

function removeMessageFromStack({ commit }) {
  commit("SHIFT_MESSAGE_FROM_QUEUE");
}
