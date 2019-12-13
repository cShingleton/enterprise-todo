module.exports = {
  getTasks
};

const tasksModel = require("./tasks.model");

async function getTasks() {
  return tasksModel.getTasks();
}
