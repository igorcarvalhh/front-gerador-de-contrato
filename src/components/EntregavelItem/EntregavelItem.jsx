import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useOutsideClick } from "../../hooks/index";
import "./EntregavelItem.css";
import { useContext, useState } from "react";
import { ModalContext } from "../../routes/Teste";
import { EntregavelContext } from "../../context/EntregavelContext";

const DropDown = ({ entregavelId, ...props }) => {
  const useEntregavel = useContext(EntregavelContext);
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
    removeEntregavel(entregavelId);
  };

  if (props.isActive) {
    return (
      <>
        <div ref={ref} class="dropdown-content">
          <a onClick={editarFase}>
            <FiEdit3 />
            Editar entregável
          </a>
          <a onClick={excluirFase}>
            <FiTrash2 />
            Excluir entregável
          </a>
        </div>
      </>
    );
  }
  return <></>;
};

export default function EntregavelItem({ entregavel, editing, ...props }) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleClick = (event) => {
    setIsDropdownActive(!isDropdownActive);
    event.stopPropagation();
  };

  return (
    <>
      <li className="entregavel-item  fase-item" key={entregavel.id}>
        <div className="entregavel-item-quantidade">
          {/* <FiChevronUp /> */}
          <span>{entregavel.quantidade}</span>
          {/* <FiChevronDown /> */}
        </div>
        <p>{entregavel.descricao}</p>
        <div className="myDropdown">
          <PiDotsThreeOutlineDuotone
            className={`more-icon dropbtn ${isDropdownActive ? "block" : ""}`}
            onClick={handleClick}
          />
          <DropDown
            entregavelId={entregavel.id}
            isActive={isDropdownActive}
            onClickOutside={() => {
              setIsDropdownActive(false);
            }}
          />
        </div>
      </li>
    </>
  );
}
