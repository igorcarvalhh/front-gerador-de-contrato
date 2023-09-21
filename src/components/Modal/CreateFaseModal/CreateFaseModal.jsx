// Modal.js
import React, { useEffect, useState } from "react";
import "../Modal.css";
import FormGroup from "../../FormGroup/FormGroup";
import Label from "../../Label/Label";
import axios from "axios";
import { useContext } from "react";
import { ModalContext } from "../../../routes/Teste";
import { toast } from "react-toastify";

const faseModel = {
  codigoAneel: "",
  faseCadeia: "",
  trl: 1,
};

function CreateFaseModal(props) {
  const [fase, setFase] = useState(faseModel);
  const { addFase } = useContext(ModalContext);

  const handleClose = () => {
    props.onClose("create");
  };

  const handleSave = async () => {
    try {
      const faseData = {
        ...fase,
        trl: Number(fase.trl),
        projetoId: props.projetoId,
      };
      await axios
        .post(`http://192.168.127.128:3000/fases`, faseData)
        .then((res) => addFase(res.data))
        .finally(() => handleClose());
    } catch (e) {
      toast.error("Erro ao criar nova fase");
      console.log("erro ao atualizar fase");
    }
  };

  const handleChange = (e) => {
    const newFase = fase;
    newFase[e.target.name] = e.target.value;
    setFase(newFase);
    console.log(fase);
  };

  useEffect(() => {
    console.log("useEffect()");
    setFase(faseModel);
  }, []);

  return (
    <div id="myModal" class="modal-overlay">
      <div class="modal-content">
        <div className="modal-header">Criar nova fase</div>
        <div className="modal-main">
          <FormGroup>
            <Label>Código aneel</Label>
            <input
              name="codigoAneel"
              defaultValue={fase?.codigoAneel}
              onChange={handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label>TRL</Label>
            <input
              name="trl"
              defaultValue={fase?.trl}
              onChange={handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label>Fase da cadeia de inovação</Label>
            <input
              name="faseCadeia"
              defaultValue={fase?.faseCadeia}
              onChange={handleChange}
              type="text"
            />
          </FormGroup>
        </div>
        <div className="modal-footer">
          <button className="save-btn" onClick={handleSave}>
            Salvar
          </button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default CreateFaseModal;
