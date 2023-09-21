import axios from "axios";
import { createContext, useState } from "react";

const ProjetoContext = createContext();

const ProjetoContextProvider = ({ children }) => {
  const [projeto, setProjeto] = useState({});

  const getProjeto = async (hash) => {
    await axios
      .get("http://192.168.127.128:3000/projeto", { headers: { Hash: hash } })
      .then((response) => setProjeto(response.data));
  };

  const useProjeto = () => {
    return { projeto, setProjeto, getProjeto };
  };

  return (
    <ProjetoContext.Provider value={useProjeto}>
      {children}
    </ProjetoContext.Provider>
  );
};

export { ProjetoContext, ProjetoContextProvider };
