import { useLoaderData } from "react-router-dom";
import { api } from "../../server/api";
import FormHeader from "../components/FormHeader";

import Navigation from "../components/Navigation.jsx";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import {
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import { calculateTextareaRows, formatQuantidadeEntregaveis } from "../utils";
import { toast } from "react-toastify";
import { AddEntregavel } from "../components/AddEntregavel";
import Header from "../components/Header";

const containerStyle = {
  maxWidth: "610px",
  marginBottom: "120px",
};

const QuantitySelector = ({ quantidade, isEditing, setQuantidade }) => {
  function handleIncrease() {
    setQuantidade(quantidade + 1);
    console.log(quantidade);
  }
  function handleDecrease() {
    if (quantidade > 1) setQuantidade(quantidade - 1);
    console.log(quantidade);
  }
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        {isEditing ? (
          <FiChevronUp
            role="button"
            className="user-select-none "
            style={{ height: "24px", width: "24px" }}
            onClick={handleIncrease}
          />
        ) : (
          <></>
        )}
        <span className="user-select-none fs-6">
          {formatQuantidadeEntregaveis(quantidade)}
        </span>
        {isEditing ? (
          <FiChevronDown
            role="button"
            className="user-select-none"
            style={{ height: "24px", width: "24px" }}
            onClick={handleDecrease}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

// ETAPA ITEM
const EtapaItem = ({ index, etapa, handleDeleteEtapa }) => {
  const [show, setShow] = useState(false);
  const [entregaveis, setEntregaveis] = useState(
    etapa.entregaveis ? etapa.entregaveis : []
  );
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  async function handleSave(fase) {
    await api
      .post(`/entregavel/etapa/${etapa.id}`, fase)
      .then((res) => res.data)
      .then((faseData) => setEntregaveis([...entregaveis, faseData]))
      .catch((e) => console.log("erro ao criar entregável"));
  }

  async function handleDelete(id) {
    await api
      .delete(`/entregavel/${id}`)
      .then(() =>
        setEntregaveis(entregaveis.filter((entregavel) => entregavel.id !== id))
      )
      .catch((e) => console.log(e));
  }

  async function deleteEtapa() {
    console.log("deleteEtapa(), entregaveis: ");
    console.log(entregaveis);
    if (entregaveis.length === 0) {
      handleDeleteEtapa(etapa.id);
    } else {
      toast.error("Não é possível apagar etapas que contém entregáveis.");
    }
  }

  return (
    <>
      <li
        style={{ backgroundColor: "#f3f3f3" }}
        class="list-group-item d-flex justify-content-between align-items-center  "
      >
        <span className="fs-5  ">
          Etapa {index} - {etapa.prazo}
        </span>

        <span style={{ cursor: "pointer" }} onClick={deleteEtapa}>
          <FiTrash2 style={{ height: "18px", width: "18px" }} />
        </span>
        {/* <button className="btn btn-outline-primary" onClick={handleShow}>
          Adicionar Entregável
        </button> */}
      </li>

      {entregaveis.map((entregavel) => {
        return (
          <EntregavelItem onDelete={handleDelete} entregavel={entregavel} />
        );
      })}
      {show ? (
        <EntregavelItem
          onSave={handleSave}
          onClose={handleClose}
          iseEditing={true}
        ></EntregavelItem>
      ) : (
        <></>
      )}
      <li class="list-group-item text-center d-flex justify-content-center">
        <AddEntregavel onClick={handleShow}>
          <div>
            <FiPlus />
          </div>
          Adicionar Entregável
        </AddEntregavel>
      </li>
    </>
  );
};

// ENTREGÁVEL ITEM
const EntregavelItem = ({
  onDelete,
  onSave,
  onClose,
  iseEditing,
  entregavel,
}) => {
  const [editing, setEditing] = useState(iseEditing ? iseEditing : false);
  const [descriptionValue, setDescriptionValue] = useState(
    entregavel ? entregavel.descricao : ""
  );
  const [quantidade, setQuantidade] = useState(
    entregavel ? entregavel.quantidade : 1
  );
  const handleClose = () => {
    setEditing(false);
  };
  const handleSave = async () => {
    const entregavelId = entregavel.id;
    const entregavelData = {
      quantidade: quantidade,
      descricao: descriptionValue,
    };
    await api
      .put(`/entregavel/${entregavelId}`, entregavelData)
      .then((res) => res.data.descricao)
      .then((descricao) => setDescriptionValue(descricao))
      .catch((e) => console.log(e));

    setEditing(false);
  };

  function cancelEntregavel() {
    setDescriptionValue("");
    setQuantidade(1);
    onClose();
  }

  async function createEntregavel() {
    if (descriptionValue) {
      const entregavel = {
        quantidade: quantidade,
        descricao: descriptionValue,
      };
      await onSave(entregavel).then(() => cancelEntregavel());
      return 0;
    }
    toast.error("A descrição do entregável não pode ser vazia.");
  }
  async function handleDelete() {
    const entregavelId = entregavel?.id;
    await onDelete(entregavelId).then();
  }

  return (
    <li class="list-group-item d-flex justify-content-between align-items-stretch gap-3">
      <QuantitySelector
        isEditing={editing}
        quantidade={quantidade}
        setQuantidade={setQuantidade}
      />
      <div className="flex-fill d-flex flex-column align-items-stretch justify-content-center">
        {editing ? (
          <>
            <textarea
              className="form-control mb-2"
              placeholder="Descrição do entregável"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              rows={calculateTextareaRows(descriptionValue)}
            />
            <div className="d-flex gap-2 justify-content-end flex-fill">
              {onDelete ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={handleDelete}
                >
                  Deletar
                </button>
              ) : (
                <></>
              )}

              <button
                className="btn btn-outline-primary"
                onClick={onClose ? cancelEntregavel : handleClose}
              >
                Cancelar
              </button>
              <button
                onClick={onSave ? createEntregavel : handleSave}
                className="btn btn-primary"
              >
                Salvar
              </button>
            </div>
          </>
        ) : (
          <span className="text-break" onClick={() => setEditing(true)}>
            {descriptionValue}
          </span>
        )}
      </div>
    </li>
  );
};
const EtapasList = (props) => {
  const [etapas, setEtapas] = useState(props.etapas ? props.etapas : []);

  function addEtapaToList(etapa) {
    const newEtapasList = [...etapas, etapa];
    setEtapas(newEtapasList);
  }
  function removeEtapaFromList(etapaId) {
    const filteredEtapas = etapas.filter((etapa) => etapa.id !== etapaId);
    setEtapas(filteredEtapas);
  }

  async function handleNewEtapa() {
    const numeroEtapas = props.fase.etapas.length;
    const etapaNumero = numeroEtapas + 1;
    const faseId = props.fase.id;
    const prazo = "6 Meses";
    const etapaData = { faseId: faseId, prazo: prazo, numero: etapaNumero };
    await api
      .post("/etapa", etapaData)
      .then((res) => res.data)
      .then((etapa) => addEtapaToList(etapa))
      .catch((e) => console.log(e));
  }

  async function deleteEtapa(etapaId) {
    await api
      .delete(`/etapa/${etapaId}`)
      .then(() => removeEtapaFromList(etapaId))
      .catch((e) => console.log(e));
  }

  return (
    <>
      <ul class="list-group mb-4">
        {etapas.map((etapa, index) => {
          return (
            <EtapaItem
              handleDeleteEtapa={deleteEtapa}
              etapa={etapa}
              index={index + 1}
            />
          );
        })}
      </ul>
      <button
        onClick={handleNewEtapa}
        className="btn btn btn-outline-secondary w-101"
      >
        + Adicionar Etapa
      </button>
    </>
  );
};
const FaseItem = ({ fase, children }) => {
  return (
    <div class="mb-4">
      <h5 class="mb-3">
        {fase.codigoAneel} - TRL {fase.trl} - {fase.faseCadeia}
      </h5>
      {children}
    </div>
  );
};
export async function loader() {
  const fases = await api.get("/fase").then((res) => res.data);
  return { fases };
}
export default function Etapas() {
  const { fases } = useLoaderData();
  const [show, setShow] = useState();
  function handleClose() {
    setShow(false);
  }
  function handleShow() {
    setShow(true);
  }
  return (
    <>
      <Header /> <Navigation />
      <main style={containerStyle} class="container">
        <FormHeader
          title={"Quais são as etapas do projeto?"}
          subtitle={"Descreva as etapas que compõem cada fase do projeto"}
        />
        {/* lista de fases */}
        {fases.map((fase) => {
          return (
            <FaseItem fase={fase}>
              <EtapasList fase={fase} etapas={fase.etapas}></EtapasList>
            </FaseItem>
          );
        })}
        <div class="d-flex flex-row-reverse mb-3 gap-2">
          <button type="button" class="btn btn-primary">
            Prosseguir
          </button>
          <button type="button" class="btn btn-outline-primary">
            Voltar
          </button>
        </div>
        <Modal show={show} backdrop="static" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nova Etapa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Número da etapa</Form.Label> <Form.Control />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Prazo</Form.Label> <Form.Control />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label> - </Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option> <option>Dia(s)</option>
                  <option>Semana(s)</option> <option>Mes(es)</option>
                  <option>Ano(s)</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col xs={1} className="d-flex">
                <FiX></FiX>
              </Col>
              <Col xs={2}>
                <Form.Control></Form.Control>
              </Col>
              <Col xs={9}>
                <Form.Control as={"textarea"}></Form.Control>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
}
