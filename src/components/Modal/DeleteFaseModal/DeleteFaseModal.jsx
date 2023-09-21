// Modal.js
import React, { useContext } from "react";
import "../Modal.css";
import axios from "axios";
import { ModalContext } from "../../../routes/Teste";
import { toast } from "react-toastify";

function DeleteFaseModal(props) {
  const { removeFase } = useContext(ModalContext);

  const handleClose = () => {
    props.onClose("delete");
  };
  const handleDelete = async () => {
    try {
      await axios
        .delete(`http://192.168.127.128:3000/fases/${props.fase.id}`)
        .then(() => removeFase(props.fase.id))
        .finally(() => handleClose());
    } catch (e) {
      toast.error("Erro ao deletar fase");
      console.log("erro ao tentar deletar");
    }
  };
  return (
    <div id="myModal" class="modal-overlay">
      <div class="modal-content">
        <div className="modal-header">Deletar fase</div>
        <div className="modal-main">
          <p>Tem certeza que deseja excluir essa fase?</p>
        </div>
        <div className="modal-footer">
          <button className="delete-btn" onClick={handleDelete}>
            Deletar
          </button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteFaseModal;
