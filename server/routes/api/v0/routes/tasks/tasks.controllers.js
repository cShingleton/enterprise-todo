module.exports = {
  getTasks,
  updateTaskState
};

const { asyncWrap } = require("../../utils/wrappers");
const tasksServices = require("./tasks.services");

function getTasks(req, res, next) {
  return asyncWrap(tasksServices.getTasks)(req, res, next);
}

function updateTaskState(req, res, next) {
  const { state, taskId } = req.body;
  return asyncWrap(tasksServices.updateTaskState, [state, taskId])(
    req,
    res,
    next
  );
}
