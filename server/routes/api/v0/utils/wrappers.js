module.exports = {
  asyncWrap,
  supportedMethods,
  wrapAsyncErrors
};

function asyncWrap(cntrl, params) {
  // Make sure to `.catch()` any errors and pass them along to the `next()`
  // middleware in the chain, in this case the error handler.
  // ** caveat is that routes must return promises
  return function executePromise(req, res, next) {
    return (
      cntrl(...(params || []))
        // TODO: HOW TO RETURN BETTER RESPONSE CODES IN A CONFIGURABLE MANNER?
        .then(response =>
          res.status(200).json({ status: "200", data: response })
        )
        .catch(next)
    );
  };
}

function supportedMethods(methods) {
  return function checkHandlers(req, res, next) {
    let { method } = req;
    method = method.toUpperCase();
    const methodSupported = methods.find(mthd => mthd.toUpperCase() === method);
    if (!methodSupported) {
      const errMsg = `${req.ip} tried to ${method} to ${req.originalUrl} but ${method} is not supported on this route`;
      const err = new Error(errMsg);
      const allowedMethods = methods.join(", ").toUpperCase();
      res.set("Allow", allowedMethods);
      return next(err);
    }
    const errMsg = `${method} is supported for this route but no handler for ${method} requests was found`;
    const err = new Error(errMsg);
    return next(err);
  };
}

function wrapAsyncErrors(fn) {
  return function(req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}
