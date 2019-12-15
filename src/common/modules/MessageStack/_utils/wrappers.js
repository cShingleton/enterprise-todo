export default {
  dispatchMsg,
  dispatchErrMsg
};

// dispatchContext is passed dispatch for Vuex
function dispatchMsg(dispatchContext, message) {
  return dispatchContext(
    "$_messageStack/addMessageToStack",
    {
      type: "info",
      details: {
        message: message.msg,
        status: message.status
      }
    },
    { root: true }
  );
}

function dispatchErrMsg(dispatchContext, error) {
  return dispatchContext(
    "$_messageStack/addMessageToStack",
    {
      type: "error",
      details: {
        errorCode: error.errorCode,
        message: error.message,
        statusCode: error.statusCode || "500",
        stack: error.stack
      }
    },
    { root: true }
  );
}
