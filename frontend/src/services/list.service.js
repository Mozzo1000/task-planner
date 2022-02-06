import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/v1/";

const getAll = () => {
    return axios.get(API_URL + "lists", { headers: authHeader() });
};

const add = (name, project_id) => {
  return axios.post(API_URL + "lists", {
    name,
    project_id
  }, { headers: authHeader() });
};


const get = (id) => {
  return axios.get(API_URL + "lists/" + id, { headers: authHeader() });
};


const exportedObject = {
    getAll,
    get,
    add,
};

export default exportedObject;
