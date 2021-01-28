import http from "../http-common";

const create = data => {
  return http.post("/items", data);
};

const getItems = parentid => {
  return http.get(`/items/parent/${parentid}`);
};

const deleteItem = id => {
  return http.delete(`/items/${id}`);
};

const deleteAllItemsFromList = listid => {
  return http.delete(`/items/all/${listid}`);
};

const updateItemName = (id, newName) => {
  return http.put(`/items/${id}`, {name: newName});
};

const updateItemAmount = (item, newAmount) => {
  return http.put(`/items/${item.id}`, {amount: newAmount, value: newAmount * item.price});
};

const updateItemStatus = (id, newStatus) => {
  return http.put(`/items/${id}`, {status: newStatus});
};

const updateItem = (id, newItem) => {
  return http.put(`/items/${id}`, newItem);
};

export default {
  create, 
  getItems, 
  deleteItem,
  updateItemName,
  updateItemAmount,
  updateItemStatus,
  updateItem,
  deleteAllItemsFromList
};