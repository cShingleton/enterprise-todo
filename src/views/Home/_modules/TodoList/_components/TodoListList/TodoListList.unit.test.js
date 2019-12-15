import { createLocalVue, mount } from "@vue/test-utils";

import Vuetify from "@/plugins/vuetify";
import TodoListList from "./TodoListList.vue";
import { withPinnedTasks } from "./TodoListList.stories";

const localVue = createLocalVue();

localVue.use(Vuetify);

describe("TodoListList.vue", () => {
  it("renders pinned tasks at the start of the list", () => {
    const wrapper = mount(TodoListList, {
      localVue,
      propsData: { tasks: withPinnedTasks }
    });
    const firstTaskPinned = wrapper.find(".list-item:nth-child(1).TASK_PINNED");
    // We expect the pinned task to be rendered first, not at the end
    expect(firstTaskPinned).not.toBe(null);
  });
});
