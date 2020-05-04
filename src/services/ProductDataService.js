import http from "../http-common";

const create = data => {
    return http.post("/products", data);
  };

const getAll = () => {
    return http.get('/products/');
};

const get = id => {
    return http.get(`/products/${id}`);
  };

const update = (id, data) => {
    return http.put(`/products/${id}`, data);
};  

const getProductsNotOnList = parentid => {
    return http.get('/products/parent/'+parentid);
};

const remove = id => {
    return http.delete(`/products/${id}`);
};

export default {
    create,
    remove,
    getAll,
    get,
    update,
    getProductsNotOnList
};