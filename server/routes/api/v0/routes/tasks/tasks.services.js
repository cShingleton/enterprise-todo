module.exports = {
  getTasks,
  updateTaskState
};

const tasksModel = require("./tasks.model");

function getTasks() {
  return tasksModel.getTasks();
}

function updateTaskState(state, taskId) {
  return tasksModel.updateTaskState(state, taskId);
}
