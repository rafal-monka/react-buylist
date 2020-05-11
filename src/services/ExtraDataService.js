import http from "../http-common";

const copyItemsFromRecipeToBuyList = data => {
  return http.post("/extra/copyrecipe", data);
};

const copyActiveItemsFromBuyList = data => {
  return http.post("/extra/copyactiveitems", data);
};

const updatePrices = data => {
  return http.post("/extra/updateprices", data);
};

export default {
    copyItemsFromRecipeToBuyList,
    copyActiveItemsFromBuyList,
    updatePrices
};