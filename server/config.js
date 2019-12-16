const { getMongoConfig } = require("./configs");

const environment = process.env.NODE_ENV || "development";
const finalConfig = initConfiguration(environment);

module.exports = finalConfig;

function initConfiguration(env) {
  const configurations = {
    development: () => ({
      app: {
        environment: process.env.NODE_ENV || "development",
        port: process.env.ENTERPRISE_TODO_APP_PORT || 8081
      },
      mongo: getMongoConfig("development")
    }),
    staging: () => ({
      app: {
        environment: process.env.NODE_ENV || "staging",
        port: process.env.ENTERPRISE_TODO_APP_PORT || 8081
      },
      mongo: getMongoConfig("staging")
    }),
    production: () => ({
      app: {
        environment: process.env.NODE_ENV || "production",
        port: process.env.ENTERPRISE_TODO_APP_PORT || 8081
      },
      mongo: getMongoConfig("production")
    }),
    test: () => ({
      app: {
        environment: process.env.NODE_ENV || "test",
        port: process.env.ENTERPRISE_TODO_APP_PORT || 8081
      },
      mongo: getMongoConfig("test")
    })
  };
  return configurations[env]();
}
