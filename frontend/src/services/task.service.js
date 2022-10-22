import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = process.env.REACT_APP_TASK_API_URL;
const API_URL = BASE_URL + "/v1/";

const getStats = (filter) => {
  return axios({
    method: "get",
    url: API_URL + "tasks/stats",
    headers: authHeader(),
    params: filter,
  });
};

const getAllTasks = (filter) => {
  if (!filter) {
    return axios.get(API_URL + "tasks", { headers: authHeader() });
  } else {
    return axios.get(API_URL + "tasks" + filter, { headers: authHeader() });
  }
};

const addTask = (name, list_id) => {
  return axios.post(
    API_URL + "tasks",
    {
      name,
      list_id,
    },
    { headers: authHeader() }
  );
};

const getTask = (id) => {
  return axios.get(API_URL + "tasks/" + id, { headers: authHeader() });
};

const editTask = (id, data) => {
  return axios.patch(
    API_URL + "tasks/" + id,
    {
      ...data,
    },
    { headers: authHeader() }
  );
};
const exportedObject = {
  getAllTasks,
  getTask,
  addTask,
  editTask,
  getStats,
};

export default exportedObject;
