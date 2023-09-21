import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.127.128:3000",
});

api.interceptors.request.use(function (config) {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  if (userToken) {
    config.headers["Hash"] = userToken;
  }
  return config;
});
