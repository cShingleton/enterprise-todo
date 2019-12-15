module.exports = {
  getTasks,
  updateTaskState
};

const { wrapRes } = require("../../utils/wrappers");
const tasksServices = require("./tasks.services");

function getTasks(req, res, next) {
  return wrapRes(tasksServices.getTasks)(req, res, next);
}

function updateTaskState(req, res, next) {
  const { state, taskId } = req.body;
  return wrapRes(tasksServices.updateTaskState, [state, taskId])(
    req,
    res,
    next
  );
}
