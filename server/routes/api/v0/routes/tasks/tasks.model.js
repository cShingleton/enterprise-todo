module.exports = {
  getTasks
};

function getTasks() {
  // STUBBED TASKS
  const tasks = [{ id: 1, title: "Something", state: "TASK_INBOX" }];
  return new Promise(resolve => setTimeout(() => resolve(tasks), 3000));
}
