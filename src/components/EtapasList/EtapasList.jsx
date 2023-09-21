import { useContext, useState } from "react";
import { FaseContext } from "../../context/FaseContext";
import { EtapaContext } from "../../context/EtapaContext";
import "./EtapasList.css";
import EntregaveisList from "../EntregaveisList/EntregaveisList";
import { EntregavelContext } from "../../context/EntregavelContext";
import { BsPlusCircleFill, BsPlusLg } from "react-icons/bs";
import EntregavelItem from "../EntregavelItem/EntregavelItem";
import AddEntregavelItem from "../AddEntregavelItem/AddEntregavelItem";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useOutsideClick } from "../../hooks/index";
import { ModalContext } from "../../routes/Teste";

const DropDown = ({ etapaId, ...props }) => {
  const useEntregavel = useContext(EntregavelContext);
  const useEtapa = useContext(EtapaContext);

  const { removeEtapa } = useEtapa();
  const { removeEntregavel } = useEntregavel();

  const { onClickOutside } = props;
  const ref = useOutsideClick(onClickOutside);
  const { openFaseModal } = useContext(ModalContext);

  const editarFase = (e) => {
    onClickOutside();
    openFaseModal("edit", props.faseId);
  };

  const excluirFase = (e) => {
    onClickOutside();
    removeEtapa(etapaId);
  };

  if (props.isActive) {
    return (
      <>
        <div ref={ref} class="dropdown-content">
          <a onClick={excluirFase}>
            <FiTrash2 />
            Excluir etapa
          </a>
        </div>
      </>
    );
  }
  return <></>;
};

export default function EtapasList({ faseId }) {
  const [showAddEntregavel, setShowAddEntregavel] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const useEtapa = useContext(EtapaContext);
  const { getEtapasByFaseId } = useEtapa();
  const etapas = getEtapasByFaseId(faseId);

  const handleClick = (event) => {
    setIsDropdownActive(!isDropdownActive);
    event.stopPropagation();
  };

  return (
    <>
      {etapas.map((etapa, index) => (
        <>
          <ul className="fases-list">
            <li key={etapa.id} className="etapas-header fase-item">
              <p>
                Etapa 0{index + 1} - {etapa.prazo}
              </p>
              <div className="myDropdown">
                <PiDotsThreeOutlineDuotone
                  className={`more-icon dropbtn ${
                    isDropdownActive ? "block" : ""
                  }`}
                  onClick={handleClick}
                />
                <DropDown
                  etapaId={etapa.id}
                  isActive={isDropdownActive}
                  onClickOutside={() => {
                    setIsDropdownActive(false);
                  }}
                />
              </div>
            </li>
            <EntregaveisList etapaId={etapa.id} />
            <AddEntregavelItem etapaId={etapa.id} />
          </ul>
        </>
      ))}
    </>
  );
}
