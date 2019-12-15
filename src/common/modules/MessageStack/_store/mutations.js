export default {
  PUSH_MESSAGE_TO_QUEUE,
  SHIFT_MESSAGE_FROM_QUEUE
};

/* eslint-disable no-param-reassign */

function PUSH_MESSAGE_TO_QUEUE(state, message) {
  // eslint-disable-next-line
  state.messagesStack.push({
    type: message.type || null,
    details: message.details || { message: "Message for event not provided" }
  });
  state.messagesCount += 1;
  if (!state.messagesToDisplay) {
    state.messageOnDisplay = state.messagesStack.shift();
    state.messagesToDisplay = true;
  }
}

function SHIFT_MESSAGE_FROM_QUEUE(state) {
  if (state.messagesToDisplay && state.messagesStack.length > 0) {
    state.messageOnDisplay = state.messagesStack.shift();
  } else {
    state.messagesToDisplay = false;
  }
}
