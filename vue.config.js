const runAPI = require("./server/app.js");

module.exports = {
  devServer: {
    before: runAPI
  }
};
