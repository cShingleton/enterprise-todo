import _api from "../_api";
import msgStack from "@/common/modules/MessageStack/_utils/wrappers";

export default {
  updateTaskState,
  getTasks
};

function getTasks({ commit, dispatch }) {
  commit("SET_LOADING", ["tasks", true]);
  return _api
    .getTasks()
    .then(response => commit("SET_TASKS", response))
    .catch(error => {
      commit("SET_ERROR", ["tasks", error]);
      msgStack.dispatchErrMsg(dispatch, error);
    })
    .finally(() => commit("SET_LOADING", ["tasks", false]));
}

function updateTaskState({ commit, dispatch }, payload) {
  commit("SET_LOADING", ["updateTaskState", true]);
  const { state, taskId } = payload;
  return _api
    .updateTaskState({ state, taskId })
    .then(() =>
      msgStack.dispatchMsg(dispatch, {
        msg: "Task updated successfully",
        status: "SUCCESS"
      })
    )
    .catch(error => {
      commit("SET_ERROR", ["updateTaskState", error]);
      msgStack.dispatchErrMsg(dispatch, error);
    })
    .finally(() => commit("SET_LOADING", ["updateTaskState", false]));
}
