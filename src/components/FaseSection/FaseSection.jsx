import { useContext } from "react";
import EtapasList from "../EtapasList/EtapasList";
import FormGroup from "../FormGroup/FormGroup";
import { EtapaContext } from "../../context/EtapaContext";
import { EntregavelContext } from "../../context/EntregavelContext";
import { BsPlusCircleFill, BsPlusLg } from "react-icons/bs";

export default function FaseSection({ fase, ...props }) {
  const faseId = fase?.id;

  const useEtapa = useContext(EtapaContext);
  const { newEtapa } = useEtapa();

  const handleClick = (e) => {
    e.preventDefault();
    newEtapa(fase.id);
  };

  return (
    <FormGroup {...props}>
      <h2 className="text-xl">
        {fase.codigoAneel} - TRL {fase.trl} - {fase.faseCadeia}
      </h2>

      <EtapasList faseId={faseId} />

      <div className="add-entregavel" onClick={handleClick}>
        <p>
          <span>
            <BsPlusLg className="inactive-icon" />
            <BsPlusCircleFill className="active-icon" />
            Adiconar Etapa
          </span>
        </p>
      </div>
    </FormGroup>
  );
}
