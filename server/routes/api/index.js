const express = require("express");
const v0 = require("./v0");

const router = express.Router();

router.use("/v0", v0);

module.exports = router;
