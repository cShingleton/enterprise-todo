// Quick and dirty script to populate the database prior to implementing
// a user input field in TodoList
// -- this would be better served by using the mongoose connector and associated helpers

const mongodb = require("mongodb");

const { MongoClient } = mongodb;

const COLL_NAME = "Tasks";
const DB_HOST = "localhost";
const DB_PORT = "27017";
const DB_NAME = "enterprise-todo";
const TASKS_STUB = require("../server/routes/api/v0/routes/tasks/__stubs__/tasks.stub.json");

const connectionString = `mongodb://${DB_HOST}:${DB_PORT}`;

connectToDB();

let db;

function connectToDB() {
  MongoClient.connect(
    connectionString,
    {
      native_parser: false,
      connectTimeoutMS: 10000,
      keepAlive: 120,
      ssl: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    async (err, client) => {
      console.log(`- Attempting to connect to mongo database ${DB_NAME}...`);

      if (err) {
        console.log(`- Unable to connect to the mongo database ${DB_NAME}`);
        throw err;
      } else {
        console.log(`- Connected to mongo database ${DB_NAME}`);
        db = client.db(DB_NAME);
        await populate().catch(err => {
          throw err;
        });
        console.log(
          `- ${TASKS_STUB.length} documents successfully inserted into ${DB_NAME}'s '${COLL_NAME}' collection`
        );
        console.log(
          `- All operations complete: connection to mongo database ${DB_NAME} closed`
        );
        process.exit(0);
      }
    }
  );
}

async function populate() {
  try {
    await db.collection(COLL_NAME).deleteMany({});
    return db.collection(COLL_NAME).insertMany(TASKS_STUB);
  } catch (e) {
    throw e;
  }
}
