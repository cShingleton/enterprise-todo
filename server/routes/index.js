module.exports = {
  init
};

const api = require("./api");
const { AppError } = require("@srv/utils/errorHandler.js");

function init(router) {
  // ===== MISC =====
  router.get("/favicon.ico", (req, res) => res.status(204).end());
  // ===== VIEWS =====
  router.get("/status", (req, res) => {
    res.status(200).json({ status: "Server is running" });
  });
  // ===== API =======
  router.use("/api", api);

  router.all("*", (req, res, next) => {
    const errMsg = `${req.ip} tried to reach ${req.originalUrl} but no matching route was found`;
    const error = new AppError("SERVER", errMsg, true, 404);
    next(error);
  });
}
