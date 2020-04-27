import axios from "axios";
//require('dotenv').config();

console.log(new Date()+" process.env="+JSON.stringify(process.env));

//var url = process.env.NODE_ENV === "development" ? "http://localhost:8083" : "http://react-buylist-git-memory.apps.us-east-1.starter.openshift-online.com";

export default axios.create({
  baseURL: "http://"+process.env.REACT_APP_BASE_API_URL+":"+process.env.REACT_APP_BASE_API_PORT+"/api",//"http://localhost:8083/api",
  //baseURL: url + "/api",
  headers: {
    "Content-type": "application/json"
  }
});