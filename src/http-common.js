import axios from "axios";
//require('dotenv').config();

console.log("process.env="+JSON.stringify(process.env));

export default axios.create({
  baseURL: "http://"+process.env.REACT_APP_BASE_API_URL+":"+process.env.REACT_APP_BASE_API_PORT+"/api",//"http://localhost:8083/api",
  headers: {
    "Content-type": "application/json"
  }
});