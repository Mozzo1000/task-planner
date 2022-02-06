import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/v1/";

const getAllTasks = () => {
    return axios.get(API_URL + "tasks", { headers: authHeader() });
};

const addTask = (name, list_id) => {
  return axios.post(API_URL + "tasks", {
    name,
    list_id,
  }, { headers: authHeader() });
};


const getTask = (id) => {
  return axios.get(API_URL + "tasks/" + id, { headers: authHeader() });
};


const exportedObject = {
    getAllTasks,
    getTask,
    addTask,
};

export default exportedObject;
