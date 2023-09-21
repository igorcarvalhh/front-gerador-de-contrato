import axios from "axios";
import { createContext, useState } from "react";

const EtapaContext = createContext();

const EtapaContextProvider = ({ children }) => {
  const [etapas, setEtapas] = useState([]);
  const [selectedEtapaId, setSelectedEtapaId] = useState(-1);

  const getEtapasByFaseId = (faseId) => {
    return etapas?.filter((etapa) => etapa.faseId === faseId);
  };

  const fetchEtapas = async (hash) => {
    const etapas = await axios
      .get("http://192.168.127.128:3000/etapas", { headers: { Hash: hash } })
      .then((response) => response.data);
    const firstEtapa = etapas[0];
    console.log("firstEtapa.id");
    console.log(firstEtapa.id);
    if (firstEtapa) setSelectedEtapaId(firstEtapa.id);
    setEtapas(etapas);
  };

  const removeEtapa = async (etapaId) => {
    await axios
      .delete(`http://192.168.127.128:3000/etapas/${etapaId}`)
      .then((response) =>
        setEtapas(etapas.filter((etapa) => etapa.id !== response.data.id))
      );
  };

  const newEtapa = async (faseId) => {
    const data = {
      faseId,
      numero: 7,
      prazo: "6 Meses",
    };
    await axios
      .post("http://192.168.127.128:3000/etapas", data)
      .then((response) => setEtapas([...etapas, response.data]));
  };

  const useEtapa = () => {
    return {
      etapas,
      setEtapas,
      fetchEtapas,
      getEtapasByFaseId,
      newEtapa,
      removeEtapa,
      selectedEtapaId,
      setSelectedEtapaId,
    };
  };

  return (
    <EtapaContext.Provider value={useEtapa}>{children}</EtapaContext.Provider>
  );
};

export { EtapaContext, EtapaContextProvider };
