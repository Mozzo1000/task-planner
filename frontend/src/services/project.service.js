import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = process.env.REACT_APP_TASK_API_URL
const API_URL = BASE_URL + "/v1/";

const getAll = (filter) => {
    if (!filter) {
        return axios.get(API_URL + "projects", { headers: authHeader() });
    }else {
        return axios.get(API_URL + "projects" + filter, { headers: authHeader() });
    }
};

const add = (name) => {
  return axios.post(API_URL + "projects", {
    name,
  }, { headers: authHeader() });
};


const get = (id) => {
  return axios.get(API_URL + "projects/" + id, { headers: authHeader() });
};

const getLists = (id) => {
    return axios.get(API_URL + "projects/lists/" + id, { headers: authHeader() });
};

const exportedObject = {
    getAll,
    get,
    add,
    getLists,
};

export default exportedObject;
