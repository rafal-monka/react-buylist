import http from "../http-common";

const getAll = (type) => {
  return http.get("/lists/?type="+type);
};

const get = id => {
  return http.get(`/lists/${id}`);
};

const create = data => {
  return http.post("/lists", data);
};

const update = (id, data) => {
  return http.put(`/lists/${id}`, data);
};

const remove = id => {
  return http.delete(`/lists/${id}`);
};

const removeAll = () => {
  return http.delete(`/lists`);
};

const findByName = name => {
  return http.get(`/lists?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};