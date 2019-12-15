import actions from "./actions";
import mutations from "./mutations";

const state = {
  messagesStack: [],
  messagesToDisplay: false,
  keepOpen: true,
  messageOnDisplay: {
    type: null,
    details: {
      // informational
      message: "",
      statusCode: "", // can be either stringified http code or user-friendly action word (e.g. 'SUCCESS')
      // error
      stack: ""
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
