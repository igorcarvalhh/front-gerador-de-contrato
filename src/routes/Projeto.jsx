import axios from "axios";
import Form from "react-bootstrap/Form";
import useToken from "../useToken";
import { api } from "../../server/api";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

import Navigation from "../components/Navigation.jsx";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import FormHeader from "../components/FormHeader";
import Input from "../components/Input";
import { FiTrash2 } from "react-icons/fi";
import { calculateTextareaRows } from "../utils";
import Header from "../components/Header";
const containerStyle = {
  maxWidth: "610px",
  marginBottom: "120px",
};

export async function loader() {
  const projeto = await api.get("/projeto").then((res) => res.data);
  console.log(projeto);
  return { projeto };
}

export default function Projeto() {
  const { projeto } = useLoaderData();
  const [faseList, setFaseList] = useState(projeto.fases);
  const { apelido, tituloCompleto, objetivo } = projeto;
  const [apelidoData, setApelidoData] = useState(apelido);
  const [tituloCompletoData, setTituloCompletoData] = useState(tituloCompleto);
  const [objetivoData, setObjetivoData] = useState(objetivo);
  const [newFase, setNewFase] = useState(true);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setCodigoAneel("");
    setFaseCadeia("");
    setTrl(1);
    setShow(false);
  };
  const handleShow = () => {
    setNewFase(true);
    setShow(true);
  };

  const [codigoAneel, setCodigoAneel] = useState("");
  const [faseCadeia, setFaseCadeia] = useState("");
  const [trl, setTrl] = useState(1);
  const [id, setId] = useState(null);

  function openFaseDetail(fase) {
    setNewFase(false);
    setCodigoAneel(fase.codigoAneel);
    setFaseCadeia(fase.faseCadeia);
    setTrl(fase.trl);
    setId(fase.id);
    setShow(true);
  }
  async function deleteFase(faseId) {
    const fase = await api
      .delete(`/fase/${faseId}`)
      .then((res) => {
        toast.warning("Fase deletada");
        setFaseList(faseList.filter((fase) => fase.id !== faseId));
        return res.data;
      })
      .catch((e) => {
        toast.error("Ocorreu um erro ao deletar a fase");
      });
  }

  async function handleSubmit() {
    const faseData = {
      codigoAneel: codigoAneel,
      faseCadeia: faseCadeia,
      trl: trl,
    };
    console.log(trl);
    if (!trl | !faseCadeia | !codigoAneel) {
      toast.error("Preencha todos os campos");
      return 0;
    }
    if (newFase) {
      const fase = await api
        .post("/fase", faseData)
        .then((res) => {
          toast.success("Fase criada com sucesso");
          setFaseList([...faseList, res.data]);
          return res.data;
        })
        .catch((e) => {
          toast.error("Ocorreu um erro ao tentar criar a fase");
        });
    } else {
      const fase = await api
        .put(`/fase/${id}`, faseData)
        .then((res) => {
          toast.success("Fase atualizada com sucesso");
          console.log(faseList);
          console.log(res.data);
          console.log(typeof id);
          const newFaseList = faseList.map((fase) => {
            if (fase.id === id) {
              return res.data;
            } else {
              return fase;
            }
          });
          setFaseList(newFaseList);
          return res.data;
        })
        .catch((e) => {
          toast.error("Ocorreu um erro ao tentar atualizar a fase");
        });
    }
  }

  async function updateProjeto() {
    const data = {
      apelido: apelidoData,
      tituloCompleto: tituloCompletoData,
      objetivo: objetivoData,
    };
    const projeto = api.put("/projeto", data).then((res) => {
      navigate("/participantes");
    });
    toast.promise(projeto, {
      pending: "Salvando dados",
      error: "Ocorreu um erro ao terntar salvar os dados",
      success: "Dados salvos com sucesso",
    });
  }

  function calculateRows() {
    const rows =
      Math.floor((objetivoData !== null ? objetivoData.length : 60) / 60) + 1;
    return rows;
  }

  return (
    <>
      <Header />
      <Navigation />
      <main style={containerStyle} className="container">
        <FormHeader
          title={"Quantos e quais são as fases do projeto?"}
          subtitle={"Informe a quantidade de fases da cadeia de inovação."}
        />

        <h3 className="mb-3">Projeto</h3>

        <Input label={"Apelido"}>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Digite o apelido"
            value={apelidoData}
            onChange={(e) => setApelidoData(e.target.value)}
          />
        </Input>

        <Input label={"Título completo do projeto"}>
          <textarea
            rows={calculateTextareaRows(tituloCompletoData)}
            value={tituloCompletoData}
            onChange={(e) => setTituloCompletoData(e.target.value)}
            type="text-area"
            className="form-control "
            id="formGroupExampleInput2"
            placeholder="Digite o título"
          />
        </Input>

        <Input label={"Objetivo principal do projeto"}>
          <textarea
            rows={calculateRows}
            type="text-area"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Digite o objetivo"
            value={objetivoData}
            onChange={(e) => setObjetivoData(e.target.value)}
          />
        </Input>

        <label for="formGroupExampleInput2" className="form-label">
          Fase da cadeia de inovação
        </label>

        <ul className="list-group mb-3">
          {faseList.map((fase) => {
            return (
              <li
                style={{ cursor: "pointer" }}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                <span onClick={() => openFaseDetail(fase)}>
                  {fase?.codigoAneel} - TRL {fase?.trl} - {fase?.faseCadeia}
                </span>
                <span onClick={() => deleteFase(fase.id)}>
                  <FiTrash2 />
                </span>
              </li>
            );
          })}
        </ul>

        <div className="d-grid mb-5">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-outline-secondary"
            onClick={handleShow}
          >
            + Adicionar Fase
          </button>
        </div>

        <div className="d-flex flex-row-reverse mb-3">
          <button
            onClick={updateProjeto}
            type="button"
            className="btn btn-primary"
          >
            Salvar e Prosseguir
          </button>
        </div>

        {/* Nova fase Modal */}
        <Modal centered show={show} onHide={handleClose}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {newFase ? "Nova Fase" : "Editar Fase"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="recipient-name" className="form-label">
                    Código ANEEL:
                  </label>
                  <input
                    value={codigoAneel}
                    onChange={(e) => setCodigoAneel(e.target.value)}
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3">
                  <label for="message-text" className="form-label">
                    TRL:
                  </label>
                  <select
                    value={trl}
                    onChange={(e) => setTrl(Number(e.target.value))}
                    className="form-select"
                    id="message-text"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="message-text" className="form-label">
                    Fase da cadeia de inovação:
                  </label>
                  <input
                    value={faseCadeia}
                    onChange={(e) => setFaseCadeia(e.target.value)}
                    className="form-control"
                    id="message-text"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Salvar
              </button>
            </div>
          </div>
        </Modal>
      </main>
    </>
  );
}
