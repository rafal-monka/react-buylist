import http from "../http-common";

const create = data => {
    return http.post("/products", data);
  };

const getAll = () => {
    return http.get('/products/');
};

const getProductsNotOnList = parentid => {
    return http.get('/products/parent/'+parentid);
};

const remove = id => {
    //console.log("CatalogDataService.deleteCatalog"+id);
    return http.delete(`/products/${id}`);
};

export default {
    create,
    remove,
    getAll,
    getProductsNotOnList
};