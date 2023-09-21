// Modal.js
import React, { useEffect, useState } from "react";
import "../Modal.css";
import FormGroup from "../../FormGroup/FormGroup";
import Label from "../../Label/Label";
import axios from "axios";

function EditFaseModal(props) {
  const [fase, setFase] = useState(props.fase);
  const handleClose = () => {
    props.onClose("edit");
  };

  const handleSave = async () => {
    try {
      const { projetoId, id, ...projetoData } = fase;
      await axios.put(`http://192.168.127.128:3000/fases/${fase.id}`, {
        ...projetoData,
        trl: Number(projetoData.trl),
      });
    } catch (e) {
      console.log("erro ao atualizar fase");
    }
  };

  const handleChange = (e) => {
    const newFase = fase;
    newFase[e.target.name] = e.target.value;
    setFase(newFase);
  };

  useEffect(() => {
    console.log("useEffect()");
    setFase(props.fase);
  }, []);

  return (
    <div id="myModal" class="modal-overlay">
      <div class="modal-content">
        <div className="modal-header">Editar fase</div>
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

export default EditFaseModal;
