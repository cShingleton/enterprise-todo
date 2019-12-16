module.exports = {
  getTask,
  getTasks,
  updateTaskState
};

const tasksModel = require("./tasks.model");

function getTask(taskId) {
  return tasksModel.getTask(taskId);
}

function getTasks() {
  return tasksModel.getTasks();
}

function updateTaskState(state, taskId) {
  return tasksModel.updateTaskState(state, taskId);
}
