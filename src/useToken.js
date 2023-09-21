import { useState } from "react";
import { api } from "../server/api";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    console.log(userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
