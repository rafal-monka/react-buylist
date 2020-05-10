import axios from "axios";
//require('dotenv').config();


export default axios.create({
  baseURL: window.location.protocol+"//"+(process.env.NODE_ENV==="development" ? window.location.hostname : process.env.REACT_APP_BASE_API_URL)+":"+process.env.REACT_APP_BASE_API_PORT+"/api",
  //baseURL: window.location.protocol+"//"+window.location.hostname+":"+process.env.REACT_APP_BASE_API_PORT+"/api",
  headers: {
    "Content-type": "application/json"
  }
});