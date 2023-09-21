import { useContext, useState } from "react";
import "./AddEntregavelItem.css";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { EntregavelContext } from "../../context/EntregavelContext";

export default function AddEntregavelItem({ etapaId, ...props }) {
  const [showAddEntregavel, setShowAddEntregavel] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const useEntregavel = useContext(EntregavelContext);
  const { addEntregavel } = useEntregavel();

  function resetStates() {
    setDescricao("");
    setQuantidade(1);
  }

  function increaseQuantidade() {
    setQuantidade(quantidade + 1);
  }
  function decreaseQuantidade() {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  }

  function handleChange(e) {
    setDescricao(e.target.value);
  }

  function handleSave() {
    const entregavel = { etapaId, quantidade, descricao };
    addEntregavel(entregavel);
    setShowAddEntregavel(false);
    resetStates();
  }

  function handleCancel() {
    setShowAddEntregavel(false);
    resetStates();
  }

  if (showAddEntregavel)
    return (
      <li className="add-entregavel-item">
        <div className="add-entregavel-data">
          <div>
            <FiChevronUp onClick={increaseQuantidade} />
            <span>{quantidade}</span>
            <FiChevronDown onClick={decreaseQuantidade} />
          </div>
          <textarea onChange={handleChange}>{descricao}</textarea>
        </div>
        <div className="add-entregavel-save">
          <button onClick={handleCancel}>Cancelar</button>
          <button onClick={handleSave}>Salvar</button>
        </div>
      </li>
    );
  return (
    <li
      onClick={() => {
        setShowAddEntregavel(true);
      }}
    >
      + Adicionar entregével
    </li>
  );
}
