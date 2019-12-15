module.exports = {
  AppError,
  handleError
};

const logger = require("./logger");

const NODE_PROGRAMMER_ERRORS = ["ReferenceError", "TypeError", "SyntaxError"];

process.on("unhandledRejection", reason => {
  // I just caught an unhandled promise rejection, since we already have fallback handler for unhandled errors (see below)
  // throw and let it handle it
  handleError(reason);
});

process.on("uncaughtException", error => {
  // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
  handleError(error);
});

async function handleError(err, requestId = null) {
  logger.logError(err, requestId);
  // eslint-disable-next-line no-param-reassign
  if (err.name && NODE_PROGRAMMER_ERRORS.includes(err.name))
    err.isOperationalError = false;
  if (!err.isOperationalError) {
    // restart the server -- this was a programmer error (a non-recoverable bug)
    // eslint-disable-next-line
    return process.exit(1);
  }
  return null;
}

function AppError(type, message, isOperationalError = false, statusCode = 500) {
  const instance = new Error(message);
  instance.type = type;
  instance.statusCode = statusCode;
  instance.isOperationalError = isOperationalError;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, AppError);
  }
  return instance;
}

AppError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

Object.setPrototypeOf(AppError, Error);
