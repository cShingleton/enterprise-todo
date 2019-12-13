module.exports = {
  DBConnectMongoose: connectMongoose
};

const mongoose = require("mongoose");

const logger = require("../utils/logger");
const { mongo } = require("../config");

let db;

function connectMongoose() {
  return new Promise((resolve, reject) => {
    if (db) {
      return db;
    }
    mongoose.Promise = global.Promise;

    // database connect
    return mongoose
      .connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.name}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
      .then(() => {
        logger.logInfo(`MongoDB connection created on port: ${mongo.port}`);
        resolve(db);
      })
      .catch(err => {
        logger.logError(
          "Error creating MongoDB connection: is the mongo server running?"
        );
        reject(err);
      });
  });
}
