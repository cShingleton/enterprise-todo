module.exports = {
  getTasks
};

const { asyncWrap } = require("../../utils/wrappers");
const tasksServices = require("./tasks.services");

function getTasks(req, res, next) {
  return asyncWrap(tasksServices.getTasks)(req, res, next);
}
