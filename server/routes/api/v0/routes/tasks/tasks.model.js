module.exports = {
  getTasks,
  updateTaskState
};

const mongoose = require("mongoose");

const patterns = require("../../../../../db/patterns");

const { Schema } = mongoose;
const TasksSchema = new Schema({
  taskId: String,
  title: String,
  state: String
});
TasksSchema.index({ taskId: 1 });
const TasksModel = mongoose.model("Tasks", TasksSchema, "Tasks");

function getTasks() {
  const params = {
    model: TasksModel,
    search: {}
  };
  return patterns.findAll(params);
}

function updateTaskState(state, taskId) {
  const params = {
    model: TasksModel,
    search: { taskId },
    data: { $set: { state } }
  };
  return patterns.findOneAndUpdate(params);
}
