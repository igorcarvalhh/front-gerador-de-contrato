import { useEffect, useRef, useState } from "react";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useOutsideClick } from "../../hooks/index";
import { useContext } from "react";
import { ModalContext } from "../../routes/Teste";

const DropDown = (props) => {
  const { onClickOutside } = props;
  const ref = useOutsideClick(onClickOutside);
  const { openFaseModal } = useContext(ModalContext);

  const editarFase = (e) => {
    onClickOutside();
    openFaseModal("edit", props.faseId);
  };

  const excluirFase = (e) => {
    onClickOutside();
    openFaseModal("delete", props.faseId);
  };

  if (props.isActive) {
    return (
      <>
        <div ref={ref} class="dropdown-content">
          <a onClick={editarFase}>
            <FiEdit3 />
            Editar fase
          </a>
          <a onClick={excluirFase}>
            <FiTrash2 />
            Excluir fase
          </a>
        </div>
      </>
    );
  }
  return <></>;
};

export default function FaseItem({ fase }) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleClick = (event) => {
    setIsDropdownActive(!isDropdownActive);
    event.stopPropagation();
  };

  if (!fase) {
    return <></>;
  }

  return (
    <li className="flex items-center justify-between fase-item">
      <p className="m-0">
        {fase.codigoAneel} - TRL {fase.trl} - {fase.faseCadeia}
      </p>
      <div className="myDropdown">
        <PiDotsThreeOutlineDuotone
          className={`more-icon dropbtn ${isDropdownActive ? "block" : ""}`}
          onClick={handleClick}
        />
        <DropDown
          faseId={fase.id}
          isActive={isDropdownActive}
          onClickOutside={() => {
            setIsDropdownActive(false);
          }}
        />
      </div>
    </li>
  );
}
