// import private env variables from your local .env file
require("dotenv").config();

const { AppError } = require("@srv/utils/errorHandler.js");

const configurations = {
  development: {
    host: process.env.ENTERPRISE_TODO_DB_HOST || "localhost",
    port: Number(process.env.ENTERPRISE_TODO_DB_PORT) || 27017,
    name: process.env.ENTERPRISE_TODO_DB_NAME || "enterprise-todo"
  },
  staging: {
    host: process.env.ENTERPRISE_TODO_DB_HOST || "localhost",
    port: Number(process.env.ENTERPRISE_TODO_DB_PORT) || 27017,
    name: process.env.ENTERPRISE_TODO_DB_NAME || "enterprise-todo"
  },
  production: {
    host: process.env.ENTERPRISE_TODO_DB_HOST || "localhost",
    port: Number(process.env.ENTERPRISE_TODO_DB_PORT) || 27017,
    name: process.env.ENTERPRISE_TODO_DB_NAME || "enterprise-todo"
  },
  test: {
    host: process.env.ENTERPRISE_TODO_DB_HOST || "localhost",
    port: Number(process.env.ENTERPRISE_TODO_DB_PORT) || 27017,
    name: process.env.ENTERPRISE_TODO_DB_NAME || "enterprise-todo-test"
  }
};

const initBase = function initBase() {
  const baseConfiguration = {};
  return baseConfiguration;
};

module.exports.getMongoConfig = function getMongoConfig(env) {
  const settingsForEnvFound = Object.keys(configurations).includes(env);
  if (settingsForEnvFound) {
    const thisRefsResolved = initBase.call(configurations[env]);
    return Object.assign(thisRefsResolved, configurations[env]);
  }
  const errMsg = `Configuration settings were not found for '${env}'`;
  throw new AppError("DEVELOPER", errMsg);
};
