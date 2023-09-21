import React from "react";
import Form from "react-bootstrap/Form";

import Navigation from "../components/Navigation.jsx";
import FormHeader from "../components/FormHeader";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { api } from "../../server/api";
import { cnpjMask } from "../utils/mask";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { FiTrash2 } from "react-icons/fi";
import Header from "../components/Header.jsx";

const containerStyle = {
  maxWidth: "610px",
  marginBottom: "120px",
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getEmpresasDeEnergia = async (inputValue) => {
  await timeout(1000);
  const empresas = await api
    .get(`/empresas?nome=${inputValue}&de_energia=true`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => []);
  const newEmpresas = empresas.map((empresa) => {
    return { ...empresa, value: empresa.cnpj, label: empresa.nome };
  });

  return newEmpresas;
};

const getEmpresas = async (inputValue) => {
  await timeout(1000);
  const empresas = await api
    .get(`/empresas?nome=${inputValue}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => []);
  const newEmpresas = empresas.map((empresa) => {
    return { ...empresa, value: empresa.cnpj, label: empresa.nome };
  });

  return newEmpresas;
};

const loadEmpresasDeEnergia = async (inputValue, callback) => {
  await callback(getEmpresasDeEnergia(inputValue));
};

function filterEmpresas(empresaList, deEnergia = true) {
  return empresaList.filter((empresa) =>
    deEnergia ? empresa.deEnergia : !empresa.deEnergia
  );
}

export async function loader() {
  const empresas = await api.get("/empresas").then((res) => res.data);
  const participantes = await api.get("/participantes").then((res) => res.data);
  return { empresas, participantes };
}

export default function Participantes() {
  const [cooperadaValue, setCooperadaValue] = useState(null);
  const [executoraValue, setExecutoraValue] = useState(null);

  const { empresas, participantes } = useLoaderData();
  const [participantesList, setParticipantesList] = useState(participantes);
  const [empresasDeEnergiaList, setEmpresasDeEnergiaList] = useState(
    filterEmpresas(empresas)
  );
  const [empresasList, setEmpresasList] = useState(
    filterEmpresas(empresas, false)
  );

  const [cooperadas, setCooperadas] = useState([]);

  const [proponente] = participantesList.filter(
    (participante) => participante?.tipo === "PROPONENTE"
  );
  var newProponente = null;
  if (proponente) {
    newProponente = {
      ...proponente,
      value: proponente?.empresa.cnpj,
      label: proponente?.empresa.nome,
    };
  }
  const [proponenteValue, setProponenteValue] = useState(newProponente);

  const handleChangeProponente = async (
    inputValue,
    { action, prevInputValue }
  ) => {
    if (action === "select-option") {
      if (proponenteValue) {
        await deleteParticipante(proponenteValue.id);
      }
      await api
        .post("/participante", {
          empresaId: inputValue.id,
          tipo: "PROPONENTE",
        })
        .then((res) => {
          const participante = res.data;
          const newParticipante = {
            ...participante,
            value: participante?.empresa.cnpj,
            label: participante?.empresa.nome,
          };
          console.log("proponenteValue");
          console.log(proponenteValue);
          console.log("newProponente");
          setProponenteValue(newParticipante);
          console.log(newParticipante);
        });
    }
    if (action === "clear") {
      await deleteParticipante(proponenteValue.id);
      setProponenteValue(null);
      console.log("clear()");
    }
    return inputValue;
  };

  async function addParticipante(participante, tipo) {
    const empresa = await api
      .post("/participante", {
        empresaId: participante.id,
        tipo: tipo,
      })
      .then((res) => res.data);
    console.log(participantesList);

    setParticipantesList([...participantesList, empresa]);
  }

  async function deleteParticipante(id) {
    const participante = await api
      .delete(`/participante/${id}`)
      .then((res) => res.data);

    setParticipantesList(
      participantesList.filter((participante) => !(participante.id === id))
    );
  }
  return (
    <>
      <Header />
      <Navigation />
      <main style={containerStyle} class="container">
        <FormHeader
          title={"Quais são as empresas participantes?"}
          subtitle={"Selecione as empresas que participarão do contrato."}
        />

        <div class="mb-3">
          <h3 class="mb-3">Proponete</h3>
          <label for="formGroupExampleInput" class="form-label">
            Empresa
          </label>
          <AsyncSelect
            cacheOptions
            loadOptions={getEmpresasDeEnergia}
            defaultOptions
            value={proponenteValue ? proponenteValue : ""}
            isClearable={true}
            placeholder={"Selecionar empresa"}
            onChange={handleChangeProponente}
          />
        </div>
        <div class="mb-3">
          <h3 class="mb-3">Cooperadas</h3>
          <label for="formGroupExampleInput" class="form-label">
            Empresas
          </label>
          <ul class="list-group mb-3">
            {participantesList.map((participante) => {
              if (participante.tipo === "COOPERADA") {
                return (
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {participante?.empresa.nome}
                    <span onClick={() => deleteParticipante(participante.id)}>
                      <FiTrash2 />
                    </span>
                  </li>
                );
              }
            })}
          </ul>
          <AsyncSelect
            cacheOptions
            loadOptions={getEmpresasDeEnergia}
            defaultOptions
            defaultValue={{ label: "teste", value: "teste" }}
            isClearable={true}
            value={cooperadaValue}
            placeholder={"Adicionar empresa"}
            onChange={(inputValue, action) =>
              action.action === "select-option"
                ? addParticipante(inputValue, "COOPERADA")
                : inputValue
            }
          />
        </div>
        <div class="mb-3">
          <h3 class="mb-3">Executoras</h3>
          <label for="formGroupExampleInput" class="form-label">
            Empresas
          </label>
          <ul class="list-group mb-3">
            {participantesList.map((participante) => {
              if (participante.tipo === "EXECUTORA") {
                return (
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {participante?.empresa.nome}

                    <span onClick={() => deleteParticipante(participante.id)}>
                      <FiTrash2 />
                    </span>
                  </li>
                );
              }
            })}
          </ul>
          <AsyncSelect
            cacheOptions
            loadOptions={getEmpresas}
            defaultOptions
            defaultValue={{ label: "teste", value: "teste" }}
            isClearable={true}
            value={executoraValue}
            placeholder={"Adicionar empresa"}
            onChange={(inputValue, action) =>
              action.action === "select-option"
                ? addParticipante(inputValue, "EXECUTORA")
                : inputValue
            }
          />
        </div>

        <div class="d-flex flex-row-reverse mb-3 gap-2">
          <button type="button" class="btn btn-primary">
            Prosseguir
          </button>
          <button type="button" class="btn btn-outline-primary">
            Voltar
          </button>
        </div>
      </main>
    </>
  );
}
