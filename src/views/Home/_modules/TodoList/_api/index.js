export default {
  updateTaskState,
  getTasks
};

import { axiosResHandler, axiosErrorHandler, instance } from "@/plugins/axios";

function updateTaskState(updateData) {
  const { taskId, state } = updateData;
  return instance
    .put(`/v0/tasks/${taskId}`, { taskId, state })
    .then(res => axiosResHandler(res))
    .catch(err => axiosErrorHandler(err));
}

function getTasks() {
  return instance
    .get(`/v0/tasks`)
    .then(res => axiosResHandler(res))
    .catch(err => axiosErrorHandler(err));
}
