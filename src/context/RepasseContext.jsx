import axios from "axios";
import { createContext, useState } from "react";

const RepasseContext = createContext();

const RepasseContextProvider = ({ children }) => {
  const [repasses, setRepasses] = useState([]);

  const getRepasse = (etapaId, recebedoraId, rubrica) => {
    const [repasse] = repasses.filter((repasse) => {
      if (
        (repasse.rubrica === rubrica) &
        (repasse.recebedoraId === recebedoraId) &
        (repasse.etapaId === etapaId)
      )
        return true;
    });

    return repasse;
  };

  const changeRepasseValor = async (repasseId, valor) => {
    setRepasses(
      repasses.map((repasse) => {
        return repasse.id === repasseId ? { ...repasse, valor } : repasse;
      })
    );
    console.log(repasses);
  };

  const changeEmpresaValor = async (repasseId, pagadoraId) => {
    setRepasses(
      repasses.map((repasse) => {
        return repasse.id === repasseId ? { ...repasse, pagadoraId } : repasse;
      })
    );
  };

  const fetchRepasses = async (hash) => {
    await axios
      .get("http://192.168.127.128:3000/repasses", {
        headers: { Hash: hash },
      })
      .then((response) => setRepasses(response.data));
  };

  const saveRepasses = async () => {
    await Promise.all(
      repasses.map((repasse) => {
        const { id, valor, ...data } = repasse;
        return axios
          .put(`http://192.168.127.128:3000/repasses/${id}`, {
            ...data,
            valor: Number(valor),
          })
          .then((response) => {});
      })
    );
  };

  const useRepasse = () => {
    return {
      repasses,
      setRepasses,
      fetchRepasses,
      getRepasse,
      changeRepasseValor,
      changeEmpresaValor,
      saveRepasses,
    };
  };
  return (
    <RepasseContext.Provider value={useRepasse}>
      {children}
    </RepasseContext.Provider>
  );
};

export { RepasseContextProvider, RepasseContext };
