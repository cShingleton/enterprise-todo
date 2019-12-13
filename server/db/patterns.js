module.exports = {
  findAll
};

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
