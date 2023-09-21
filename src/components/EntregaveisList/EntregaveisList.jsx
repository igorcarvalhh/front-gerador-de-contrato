import { useContext } from "react";
import { EntregavelContext } from "../../context/EntregavelContext";
import EntregavelItem from "../EntregavelItem/EntregavelItem";

const EntregaveisList = ({ etapaId, ...props }) => {
  const useEntregavel = useContext(EntregavelContext);
  const { getEntregaveisByEtapaId } = useEntregavel();
  const entregaveis = getEntregaveisByEtapaId(etapaId);
  return (
    <>
      {entregaveis.map((entregavel) => (
        <EntregavelItem entregavel={entregavel} />
      ))}
    </>
  );
};

export default EntregaveisList;
