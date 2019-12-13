const express = require("express");

const router = express.Router();

module.exports = router;

const tasksControllers = require("./tasks.controllers");
const { supportedMethods, wrapAsyncErrors } = require("../../utils/wrappers");

router
  .route("/")
  .get(wrapAsyncErrors(tasksControllers.getTasks))
  .all(supportedMethods(["GET"]));
