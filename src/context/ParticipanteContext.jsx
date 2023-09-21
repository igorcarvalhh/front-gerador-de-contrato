import axios from "axios";
import { createContext, useState } from "react";

const ParticipanteContext = createContext();

const ParticipanteContextProvider = ({ children }) => {
  const [participantes, setParticipantes] = useState([]);

  const getExecutoras = () => {
    return participantes.filter(
      (participante) => participante.tipo === "EXECUTORA"
    );
  };
  const getParticipantesByEtapaId = (etapaId) => {
    return participantes.filter(
      (participante) => participante.etapaId === etapaId
    );
  };

  const addParticipante = async (participante) => {
    await axios
      .post("http://192.168.127.128:3000/participantes", participante)
      .then((response) => setParticipantes([...participantes, response.data]));
  };

  const removeParticipante = async (participanteId) => {
    await axios
      .delete(`http://192.168.127.128:3000/participantes/${participanteId}`)
      .then((response) =>
        setParticipantes(
          participantes.filter(
            (participante) => participante.id !== response.data.id
          )
        )
      );
  };

  const fetchParticipantes = async (hash) => {
    await axios
      .get("http://192.168.127.128:3000/participantes", {
        headers: { Hash: hash },
      })
      .then((response) => setParticipantes(response.data));
  };

  const useParticipante = () => {
    return {
      participantes,
      setParticipantes,
      fetchParticipantes,
      getParticipantesByEtapaId,
      addParticipante,
      removeParticipante,
      getExecutoras,
    };
  };
  return (
    <ParticipanteContext.Provider value={useParticipante}>
      {children}
    </ParticipanteContext.Provider>
  );
};

export { ParticipanteContextProvider, ParticipanteContext };
