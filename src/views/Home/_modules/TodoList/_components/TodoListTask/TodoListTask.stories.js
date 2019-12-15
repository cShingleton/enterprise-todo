import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import TodoListTask from "./TodoListTask";

export const task = {
  id: "1",
  title: "Test Task",
  state: "TASK_INBOX",
  updatedAt: new Date()
};

export const methods = {
  onPinTask: action("onPinTask"),
  onArchiveTask: action("onArchiveTask")
};

storiesOf("TodoListTask", module)
  .add("default", () => {
    return {
      components: { TodoListTask },
      template: `<todo-list-task :task="task" />`,
      data: () => ({ task }),
      methods
    };
  })
  .add("pinned", () => {
    return {
      components: { TodoListTask },
      template: `<todo-list-task :task="task" />`,
      data: () => ({ task: { ...task, state: "TASK_PINNED" } }),
      methods
    };
  })
  .add("archived", () => {
    return {
      components: { TodoListTask },
      template: `<todo-list-task :task="task"/>`,
      data: () => ({ task: { ...task, state: "TASK_ARCHIVED" } }),
      methods
    };
  });
