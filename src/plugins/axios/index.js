import Vue from "vue";
import axios from "axios";

import { AppError } from "@/utils/errorHandling";

const instance = axios.create({
  baseURL: "http://localhost:8081/api/"
});

export { axiosErrorHandler, axiosResHandler, instance };

Vue.prototype.$http = instance;
Vue.prototype.axios = instance;

function axiosResHandler(axiosRes) {
  const { data } = axiosRes.data;
  return data;
}

function axiosErrorHandler(axiosErr) {
  if (axiosErr.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errorRes = axiosErr.response;
    if (
      !errorRes.data ||
      !Object.keys(errorRes.data).length ||
      !errorRes.data.error
    ) {
      const errMsg =
        "The target server returned an error but no further details were provided";
      throw new AppError("Server", errMsg, "500", "500");
    }
    const apiErrorRes = errorRes.data;
    const {
      status: apiErrorStatus = "500",
      error: apiError = {}
    } = apiErrorRes;
    const errMsg = apiError.message || "Error message is missing";
    const errType = apiError.type || "Unknown";
    const errStatus = apiErrorStatus || axiosErr.response.status;
    const errCode =
      apiError.errorCode || apiErrorStatus || axiosErr.response.status || "500";
    const newError = new AppError(errType, errMsg, errCode, errStatus);
    newError.stack = apiError.stack || newError.stack;
    throw newError;
  } else if (axiosErr.request) {
    const errMsg =
      "The external request was successfully made but something went wrong on the target server";
    throw new AppError("Server", errMsg, "500", "500");
  } else {
    // Something happened in setting up the request that triggered an Error
    const newError = new AppError("Server", axiosErr.message, "500", "500");
    newError.stack = axiosErr.stack || newError.stack;
    throw newError;
  }
}
