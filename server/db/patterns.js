module.exports = {
  findAll,
  findOne,
  findOneAndUpdate
};

const { AppError } = require("@srv/utils/errorHandler.js");

function findAll(params) {
  const { model, search, select = null, options = {} } = params;
  const expr = !params.sort
    ? model
        .find(search, select, options)
        .lean()
        .exec()
    : model
        .find(search, select, options)
        .lean()
        .sort(params.sort)
        .exec();

  return expr
    .then(result => result)
    .catch(error => {
      throw error;
    });
}
function findOne(params) {
  const { model, search, select = null, options = {} } = params;
  return model
    .findOne(search, select, options)
    .lean()
    .exec()
    .then(result => result || {})
    .catch(error => {
      throw error;
    });
}

function findOneAndUpdate(params) {
  const { model, search, data, options = {} } = params;
  return model
    .findOneAndUpdate(search, data, options)
    .exec()
    .then(result => {
      // if you wish to return a newly upserted doc set the options.new to true
      if (result !== null || options.upsert) return result;
      const errMsg = "No matching document was found to update";
      const missingErr = new AppError("DATABASE", errMsg, true, 404);
      return Promise.reject(missingErr);
    })
    .catch(error => {
      throw error;
    });
}
