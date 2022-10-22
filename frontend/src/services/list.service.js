import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = process.env.REACT_APP_TASK_API_URL;
const API_URL = BASE_URL + "/v1/";

const getAll = () => {
  return axios.get(API_URL + "lists", { headers: authHeader() });
};

const add = (name, project_id) => {
  return axios.post(
    API_URL + "lists",
    {
      name,
      project_id,
    },
    { headers: authHeader() }
  );
};

const get = (id) => {
  return axios.get(API_URL + "lists/" + id, { headers: authHeader() });
};

const getTasksInList = (id, status) => {
  if (status) {
    return axios.get(API_URL + "lists/" + id + "/tasks?status=" + status, {
      headers: authHeader(),
    });
  } else {
    return axios.get(API_URL + "lists/" + id + "/tasks", {
      headers: authHeader(),
    });
  }
};

const exportedObject = {
  getAll,
  get,
  add,
  getTasksInList,
};

export default exportedObject;
