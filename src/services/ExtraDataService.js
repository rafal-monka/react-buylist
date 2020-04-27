import http from "../http-common";

const copyItemsFromRecipeToBuyList = data => {
  return http.post("/extra/copyrecipe", data);
};

export default {
    copyItemsFromRecipeToBuyList
};