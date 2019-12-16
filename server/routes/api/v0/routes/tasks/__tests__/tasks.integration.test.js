/* Tasks integration tests
 *
 * @group integration/back-end
 */

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("@srv/app.js");
const { mongo } = require("@srv/config.js");
const taskModel = require("../tasks.model");
const taskServices = require("../tasks.services");

const TASKS_STUB = require("../__stubs__/tasks.stub.json");

const request = supertest(app);

afterAll(async () => {
  await taskModel.Tasks.deleteMany();
});

beforeAll(async () => {
  const url = `mongodb://${mongo.host}:${mongo.port}/${mongo.name}`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  await taskModel.Tasks.insertMany(TASKS_STUB);
});

describe("Tasks routes", () => {
  it("/tasks gets a list of tasks", async done => {
    const res = await request.get("/api/v0/tasks");
    expect(res.status).toBe(200);
    expect(res.body.data).toStrictEqual(TASKS_STUB);
    done();
  });

  it("/task/:taskId updates a task's state", async done => {
    const TASK_ID = "1";
    const EXPECTED_STATE = "TASK_ARCHIVE";

    const { state: currState } = await taskServices.getTask(TASK_ID);
    const res = await request.put(`/api/v0/tasks/${TASK_ID}`).send({
      taskId: TASK_ID,
      state: EXPECTED_STATE
    });
    const { state: updatedState } = await taskServices.getTask(TASK_ID);

    expect(res.status).toBe(200);
    expect(currState).not.toBe(updatedState);
    expect(updatedState).toBe(EXPECTED_STATE);
    done();
  });
});
