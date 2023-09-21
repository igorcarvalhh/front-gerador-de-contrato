import { useEffect, useRef, useState } from "react";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useOutsideClick } from "../../hooks/index";
import { useContext } from "react";
import { ModalContext } from "../../routes/Teste";
import axios from "axios";
import { ParticipanteContext } from "../../routes/Teste2";

const DropDown = (props) => {
  const { onClickOutside } = props;
  const ref = useOutsideClick(onClickOutside);
  const { removeParticipante } = useContext(ParticipanteContext);

  const editarFase = (e) => {
    onClickOutside();
    openFaseModal("edit", props.faseId);
  };
  const excluirParticipante = async (e) => {
    onClickOutside();
    try {
      await axios.delete(
        `http://192.168.127.128:3000/participantes/${props.participanteId}`
      );
      removeParticipante(props.participanteId);
    } catch (e) {
      console.log("erro ao excluir participante");
    }
    // openFaseModal("delete", props.faseId);
  };

  if (props.isActive) {
    return (
      <>
        <div ref={ref} class="dropdown-content">
          {/* <a onClick={editarFase}>
            <FiEdit3 />
            Editar fase
          </a> */}
          <a onClick={excluirParticipante}>
            <FiTrash2 />
            Excluir participante
          </a>
        </div>
      </>
    );
  }
  return <></>;
};

export default function ParticipanteItem({ participante }) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleClick = (event) => {
    setIsDropdownActive(!isDropdownActive);
    event.stopPropagation();
  };

  if (!participante) {
    return <></>;
  }

  return (
    <li className="flex items-center justify-between fase-item">
      <p className="m-0">{participante.empresa.nome}</p>
      <div className="dropdown">
        <PiDotsThreeOutlineDuotone
          className={`more-icon dropbtn ${isDropdownActive ? "block" : ""}`}
          onClick={handleClick}
        />
        <DropDown
          participanteId={participante.id}
          isActive={isDropdownActive}
          onClickOutside={() => {
            setIsDropdownActive(false);
          }}
        />
      </div>
    </li>
  );
}
