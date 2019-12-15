export default {
  SET_ERROR,
  SET_LOADING,
  SET_TASKS
};

/* eslint-disable no-param-reassign */
function SET_ERROR(state, payload) {
  const [dataName, error] = payload;
  state.error[dataName] = Object.assign({}, state.error, {
    detected: true,
    type: error.type || "UNKNOWN",
    message: error.message || "An unknown error occurred",
    statusCode: error.statusCode || "500",
    errorCode: error.errorCode || "500"
  });
}

function SET_LOADING(state, payload) {
  const [dataName, loadingState] = payload;
  state.isLoading[dataName] = loadingState;
}

function SET_TASKS(state, payload) {
  const orderedTasks = [
    ...payload.filter(t => t.state === "TASK_PINNED"),
    ...payload.filter(t => t.state !== "TASK_PINNED")
  ];
  state.tasks = orderedTasks;
}
