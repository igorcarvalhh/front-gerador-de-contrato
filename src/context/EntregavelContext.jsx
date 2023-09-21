import axios from "axios";
import { createContext, useState } from "react";

const EntregavelContext = createContext();

const EntregavelContextProvider = ({ children }) => {
  const [entregaveis, setEntregaveis] = useState([]);

  const getEntregaveisByEtapaId = (etapaId) => {
    return entregaveis.filter((entregavel) => entregavel.etapaId === etapaId);
  };

  const addEntregavel = async (entregavel) => {
    await axios
      .post("http://192.168.127.128:3000/entregaveis", entregavel)
      .then((response) => setEntregaveis([...entregaveis, response.data]));
  };

  const removeEntregavel = async (entregavelId) => {
    await axios
      .delete(`http://192.168.127.128:3000/entregaveis/${entregavelId}`)
      .then((response) =>
        setEntregaveis(
          entregaveis.filter((entregavel) => entregavel.id !== response.data.id)
        )
      );
  };

  const fetchEntregaveis = async (hash) => {
    await axios
      .get("http://192.168.127.128:3000/entregaveis", {
        headers: { Hash: hash },
      })
      .then((response) => setEntregaveis(response.data));
  };

  const useEntregavel = () => {
    return {
      entregaveis,
      setEntregaveis,
      fetchEntregaveis,
      getEntregaveisByEtapaId,
      addEntregavel,
      removeEntregavel,
    };
  };
  return (
    <EntregavelContext.Provider value={useEntregavel}>
      {children}
    </EntregavelContext.Provider>
  );
};

export { EntregavelContextProvider, EntregavelContext };
