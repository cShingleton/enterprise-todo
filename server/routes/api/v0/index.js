const express = require("express");

const router = express.Router();

module.exports = router;

router.use("/tasks", require("./routes/tasks/tasks.routes"));
