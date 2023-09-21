import axios from "axios";
import { createContext, useState } from "react";

const FaseContext = createContext();

function FaseContextProvider({ children }) {
  const [fases, setFases] = useState([]);

  const newFase = (fase) => {
    setFases([...fases, fase]);
  };

  const getFases = async (hash) => {
    await axios
      .get("http://192.168.127.128:3000/fase", { headers: { Hash: hash } })
      .then((response) => setFases(response.data));
  };

  const useFase = () => {
    return { fases, setFases, getFases, newFase };
  };

  return (
    <FaseContext.Provider value={useFase}>{children}</FaseContext.Provider>
  );
}

export { FaseContextProvider, FaseContext };
