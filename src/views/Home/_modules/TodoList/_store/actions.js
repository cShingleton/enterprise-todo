import _api from "../_api";

export default {
  updateTaskState,
  getTasks
};

function getTasks({ commit }) {
  commit("SET_LOADING", ["tasks", true]);
  return _api
    .getTasks()
    .then(response => commit("SET_TASKS", response))
    .catch(error => {
      commit("SET_ERROR", ["tasks", error]);
    })
    .finally(() => commit("SET_LOADING", ["tasks", false]));
}

function updateTaskState({ commit }, payload) {
  commit("SET_LOADING", ["updateTaskState", true]);
  const { state, taskId } = payload;
  return _api
    .updateTaskState({ state, taskId })
    .catch(error => {
      commit("SET_ERROR", ["updateTaskState", error]);
    })
    .finally(() => commit("SET_LOADING", ["updateTaskState", false]));
}
