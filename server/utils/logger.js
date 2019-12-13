const bunyan = require("bunyan");
const path = require("path");
const fs = require("fs");

// Bunyan error levels: see https://github.com/trentm/node-bunyan#levels
// fatal” (60): The service / app is going to stop or become unusable now.An operator should definitely look into this soon.
// “error” (50): Fatal for a particular request, but the service / app continues servicing other requests.An operator should look at this soon(ish).
// “warn” (40): A note on something that should probably be looked at by an operator eventually.
// “info” (30): Detail on regular operation.
// “debug” (20): Anything else, i.e.too verbose to be included in “info” level.
// “trace” (10): Logging from external libraries used by your app or very detailed application logging.

// Make sure logging directory exists
if (!fs.existsSync(path.resolve(__dirname, "../../logs"))) {
  fs.mkdirSync(path.resolve(__dirname, "../../logs"));
}

module.exports.loggerInstance = bunyan.createLogger({
  name: "transaction-notifier",
  serializers: {
    // eslint-disable-next-line global-require
    req: require("bunyan-express-serializer"),
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  },
  streams: [
    {
      level: "error",
      type: "rotating-file",
      path: path.resolve(__dirname, "../../logs/error.log"),
      period: "1d",
      count: 3
    },
    {
      level: process.env.NODE_ENV === "test" ? bunyan.FATAL + 1 : "info",
      path: path.resolve(__dirname, "../../logs/server.log")
    },
    {
      level: process.env.NODE_ENV === "test" ? bunyan.FATAL + 1 : "info",
      stream: process.stdout
    }
  ]
});

module.exports.logInfo = function genericLogger(msg) {
  const log = this.loggerInstance.child({});
  log.info(msg);
};

module.exports.logResponse = function responseLogger(id, body, statusCode) {
  const log = this.loggerInstance.child({ id, body, statusCode }, true);
  log.info("response");
};

module.exports.logError = function errorLogger(err, requestId = null) {
  const { type, isOperational, statusCode } = err;
  const log = this.loggerInstance.child({
    reqId: requestId,
    type,
    isOperational,
    statusCode
  });
  log.error(
    {
      err,
      reqId: requestId,
      type,
      isOperational,
      statusCode
    },
    err.message
  );
};
