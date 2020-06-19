import http from "../http-common";

const copyItemsFromRecipeToBuyList = data => {
  return http.post("/extra/copyrecipe", data);
};

const copyItemsBetweenLists = (sourceid, destid, status) => {
  return http.get("/extra/copyitems/"+sourceid+"/"+destid+"/"+status);
};

const updatePrices = data => {
  return http.post("/extra/updateprices", data);
};

export default {
    copyItemsFromRecipeToBuyList,
    copyItemsBetweenLists,
    updatePrices
};