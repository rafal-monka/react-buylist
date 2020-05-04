import axios from "axios";
//require('dotenv').config();


export default axios.create({
  baseURL: "http://"+process.env.REACT_APP_BASE_API_URL+":"+process.env.REACT_APP_BASE_API_PORT+"/api",
  headers: {
    "Content-type": "application/json"
  }
});