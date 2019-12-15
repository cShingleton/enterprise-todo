import { storiesOf } from "@storybook/vue";

import TodoListList from "./TodoListList";
import { task, methods } from "../TodoListTask/TodoListTask.stories";

export const defaultTodoListList = [
  { ...task, id: "1", title: "Task 1" },
  { ...task, id: "2", title: "Task 2" },
  { ...task, id: "3", title: "Task 3" },
  { ...task, id: "4", title: "Task 4" },
  { ...task, id: "5", title: "Task 5" },
  { ...task, id: "6", title: "Task 6" }
];

export const withPinnedTasks = [
  ...defaultTodoListList.slice(0, 5),
  { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" }
];

const paddedList = () => {
  return {
    template: '<div style="padding: 3rem;"><story/></div>'
  };
};

storiesOf("TodoListList", module)
  .addDecorator(paddedList)
  .add("default", () => ({
    components: { TodoListList },
    template: `<todo-list-list :tasks="tasks"/>`,
    data: () => ({
      tasks: defaultTodoListList
    }),
    methods
  }))
  .add("withPinnedTasks", () => ({
    components: { TodoListList },
    template: `<todo-list-list :tasks="tasks"/>`,
    data: () => ({
      tasks: withPinnedTasks
    }),
    methods
  }))
  .add("loading", () => ({
    components: { TodoListList },
    template: `<todo-list-list isLoading/>`,
    data: () => ({ tasks: defaultTodoListList }),
    methods
  }))
  .add("empty", () => ({
    components: { TodoListList },
    template: `<todo-list-list />`,
    methods
  }));
