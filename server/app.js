const addRequestId = require("express-request-id")();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const logger = require("./utils/logger");
const routes = require("./routes/index");

const app = express();

app.use(addRequestId);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// bunyan logging
// Log request
app.use((req, res, next) => {
  const log = logger.loggerInstance.child(
    { id: req.id, ...(req.body && { body: req.body }) },
    true
  );
  log.info({ req }, "request");
  next();
});

// log response
app.use((req, res, next) => {
  function afterResponse() {
    res.removeListener("finish", afterResponse);
    res.removeListener("close", afterResponse);
    const log = logger.loggerInstance.child({ id: req.id }, true);
    log.info({ res }, "response");
  }
  res.on("finish", afterResponse);
  res.on("close", afterResponse);
  next();
});
// end:bunyan logging

routes.init(app);

// express error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    error: {
      requestId: req.id,
      type: err.type,
      message: err.message,
      ...(process.env.NODE_ENV !== "production" && {
        stack: err.stack
      })
    }
  });
});

module.exports = app;
