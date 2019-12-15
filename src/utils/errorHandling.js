export { AppError };

function AppError(type, message, errorCode = "500", statusCode = "500") {
  const instance = new Error(message);
  instance.type = type;
  instance.statusCode = String(statusCode);
  instance.errorCode = String(errorCode);
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
