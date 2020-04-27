import http from "../http-common";

const create = data => {
  return http.post("/items", data);
};

const getItems = parentid => {
  return http.get(`/items/parent/${parentid}`);
};

const deleteItem = id => {
  //console.log("ItemsDataService.deleteItem"+id);
  return http.delete(`/items/${id}`);
};

const updateItemName = (id, newName) => {
  //console.log("ItemsDataService.updateItem"+id+newName);
  return http.put(`/items/${id}`, {name: newName});
};

const updateItemStatus = (id, newStatus) => {
  //console.log("ItemsDataService.updateItem"+id+newName);
  return http.put(`/items/${id}`, {status: newStatus});
};

export default {
  create, 
  getItems, 
  deleteItem,
  updateItemName,
  updateItemStatus
};