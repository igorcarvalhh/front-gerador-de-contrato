import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Label from "../components/Label/Label";
import Textarea from "../components/Textarea/Textarea";
import axios from "axios";
import FaseList from "../components/FasesList/FaseList";
import FormGroup from "../components/FormGroup/FormGroup";
import PageHeader from "../components/PageHeader/PageHeader";
import getHeaderData from "../data/pagesData";
import "../style/Teste.css";
import Loading from "../components/Loading/Loading";
import DeleteFaseModal from "../components/Modal/DeleteFaseModal/DeleteFaseModal";
import EditFaseModal from "../components/Modal/EditFaseModal/EditFaseModal";
import { createContext } from "react";
import CreateFaseModal from "../components/Modal/CreateFaseModal/CreateFaseModal";
import { toast } from "react-toastify";
import Select from "react-select";
import ParticipanteList from "../components/ParticipanteList/ParticipanteList";
import Navigation from "../components/Navigation.jsx";
import Header from "../components/Header";

export const ParticipanteContext = createContext(0);

export default function Teste2() {
  // states
  const [empresas, setEmpresas] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const [projeto, setProjeto] = useState({});
  const [loading, setLoading] = useState(true);
  const { hash } = useParams();
  const location = useLocation();
  const headerData = getHeaderData("participantes");

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
  };

  const addParticipante = {
    proponente: (selectedOption) => {
      newParticipante(selectedOption, "PROPONENTE");
    },
    cooperada: (selectedOption) => {
      newParticipante(selectedOption, "COOPERADA");
    },
    executora: (selectedOption) => {
      newParticipante(selectedOption, "EXECUTORA");
    },
  };

  const newParticipante = async (selectedOption, tipo) => {
    const { id } = selectedOption;
    const data = { empresaId: id, tipo: tipo };
    try {
      axios
        .post("http://192.168.127.128:3000/participantes", data, {
          headers: { Hash: hash },
        })
        .then((res) => setParticipantes([...participantes, res.data]));
    } catch (e) {
      console.log("erro ao criar partiucipoante");
    }
  };

  const removeParticipante = (participanteId) => {
    setParticipantes(
      participantes.filter((participante) => participante.id !== participanteId)
    );
  };

  // loading data
  const fetchData = async () => {
    setLoading(true);
    await axios
      .get("http://192.168.127.128:3000/empresas")
      .then((response) => response.data)
      .then((empresas) => {
        return empresas.map((empresa) => {
          return { ...empresa, value: empresa.id, label: empresa.nome };
        });
      })
      .then((empresas) => setEmpresas(empresas));
    await axios
      .get("http://192.168.127.128:3000/participantes", {
        headers: { Hash: hash },
      })
      .then((response) => setParticipantes(response.data));
    setLoading(false);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(interval);
  }, [location]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <ParticipanteContext.Provider value={{ removeParticipante }}>
        <Header />
        <Navigation />
        <div className="content__container ">
          <PageHeader {...headerData} />
          <form className="projeto-form">
            <h2 className="text-xl">Proponente</h2>

            <FormGroup>
              <Label>Empresa</Label>
              <ParticipanteList
                participantes={participantes.filter(
                  (participante) => participante.tipo === "PROPONENTE"
                )}
              />
              <Select
                onChange={addParticipante.proponente}
                options={empresas}
              />
            </FormGroup>
            <h2 className="text-xl">Cooperadas</h2>
            <FormGroup>
              <Label>Empresas</Label>
              <ParticipanteList
                participantes={participantes.filter(
                  (participante) => participante.tipo === "COOPERADA"
                )}
              />
              <FaseList fases={projeto?.fases} />
              <Select onChange={addParticipante.cooperada} options={empresas} />
            </FormGroup>
            <FormGroup></FormGroup>
            <h2 className="text-xl">Executoras</h2>
            <FormGroup>
              <Label>Empresas</Label>
              <ParticipanteList
                participantes={participantes.filter(
                  (participante) => participante.tipo === "EXECUTORA"
                )}
              />
              <Select onChange={addParticipante.executora} options={empresas} />
            </FormGroup>
          </form>
        </div>
      </ParticipanteContext.Provider>
    </>
  );
}
