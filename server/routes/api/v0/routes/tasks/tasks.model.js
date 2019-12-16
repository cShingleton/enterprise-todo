const mongoose = require("mongoose");

const patterns = require("@srv/db/patterns");

const { Schema } = mongoose;
const TasksSchema = new Schema({
  state: String,
  taskId: {
    index: true,
    required: true,
    type: String,
    unique: true
  },
  title: String
});
TasksSchema.index({ taskId: 1 });
const Tasks = mongoose.model("Tasks", TasksSchema, "Tasks");

function getTask(taskId) {
  const params = {
    model: Tasks,
    search: { taskId },
    select: "-_id -__v"
  };
  return patterns.findOne(params);
}

function getTasks() {
  const params = {
    model: Tasks,
    search: {},
    select: "-_id -__v"
  };
  return patterns.findAll(params);
}

function updateTaskState(state, taskId) {
  const params = {
    model: Tasks,
    search: { taskId },
    data: { $set: { state } }
  };
  return patterns.findOneAndUpdate(params);
}

module.exports = {
  getTask,
  getTasks,
  Tasks,
  updateTaskState
};
