import actions from "./actions";
import mutations from "./mutations";

const state = {
  // data state
  tasks: [],
  // error state
  error: {
    archiveTask: {
      detected: false,
      type: "",
      message: "",
      statusCode: "0",
      errorCode: ""
    },
    tasks: {
      detected: false,
      type: "",
      message: "",
      statusCode: "0",
      errorCode: ""
    }
  },
  // loading state
  isLoading: {
    archiveTask: false,
    tasks: false
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
