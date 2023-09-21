import { useParams, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import { FaseContext } from "../context/FaseContext";
import { ProjetoContext } from "../context/ProjetoContext";
import Navigation from "../components/Navigation.jsx";
import Header from "../components/Header";

export const ModalContext = createContext(0);

export default function Teste() {
  // states
  const useProjeto = useContext(ProjetoContext);
  const { projeto, setProjeto, getProjeto } = useProjeto();
  // const [projeto, setProjeto] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFase, setSelectedFase] = useState({});
  const [isSending, setIsSanding] = useState(false);
  const [wasModified, setWasModified] = useState(false);
  const { hash } = useParams();
  const location = useLocation();
  const headerData = getHeaderData("projeto");
  const [showFaseModal, setShowFaseModal] = useState({
    edit: false,
    delete: false,
    create: false,
  });

  // functions
  const getFaseById = (id) => {
    const faseList = projeto.fases ? projeto.fases : [];
    const [fase] = faseList.filter((fase) => fase.id === id);
    return fase;
  };

  const openFaseModal = (mode, faseId) => {
    setSelectedFase(getFaseById(faseId));
    setShowFaseModal({ ...showFaseModal, [mode]: true });
  };

  const closeFaseModal = (mode) => {
    setShowFaseModal({ ...showFaseModal, [mode]: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWasModified(true);
    setProjeto({ ...projeto, [name]: value });
  };

  const updateProjeto = async (projeto) => {
    const request = axios
      .put(`http://192.168.127.128:3000/projetos/${projeto.id}`, projeto)
      .then((response) => setProjeto(response.data));
    toast.promise(request, {
      pending: "Salvando...",
      error: "Erro ao salvar alterações",
      success: "Salvo com sucesso",
    });
  };

  const addFase = (fase) => {
    const newFaseList = [...projeto.fases, fase];
    setProjeto({ ...projeto, fases: newFaseList });
  };

  const removeFase = (faseId) => {
    const newFaseList = projeto.fases.filter((fase) => fase.id !== faseId);
    setProjeto({ ...projeto, fases: newFaseList });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!wasModified) return 0;
    setIsSanding(true);
    const { fases, contrato, ...rest } = projeto;

    try {
      updateProjeto(rest);
      setWasModified(false);
    } catch (e) {
      console.log("houve um erro ao atualizar");
    }
    setIsSanding(false);
  };

  const handleCreateFase = (e) => {
    e.preventDefault();
    setShowFaseModal({ ...showFaseModal, create: true });
  };

  // loading data
  const fetchData = async () => {
    setLoading(true);
    getProjeto(hash);
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
      <ModalContext.Provider value={{ openFaseModal, addFase, removeFase }}>
        <Header />
        <Navigation />
        <div className="content__container">
          <PageHeader {...headerData} />
          <form className="projeto-form">
            <h2 className="text-xl">Projeto</h2>

            <FormGroup>
              <Label required>Apelido do projeto</Label>
              <input
                className="myInput"
                name="apelido"
                onChange={handleChange}
                defaultValue={projeto?.apelido}
                type="text"
              />
            </FormGroup>

            <FormGroup>
              <Label>Título do projeto</Label>
              <Textarea
                className="myInput"
                name="tituloCompleto"
                onChange={handleChange}
                defaultValue={projeto?.tituloCompleto}
              />
            </FormGroup>

            <FormGroup>
              <Label>Objetivo principal do projeto</Label>
              <Textarea
                className="myInput"
                name="objetivo"
                onChange={handleChange}
                defaultValue={projeto?.objetivo}
              />
            </FormGroup>

            <FormGroup>
              <Label>Fases da cadeia de inovação</Label>

              <FaseList fases={projeto?.fases} />
              <button className="add-fase-btn" onClick={handleCreateFase}>
                Adicionar fase
              </button>
            </FormGroup>
            <button
              onClick={handleSave}
              className={wasModified ? "save-btn" : "save-btn-inactive"}
            >
              Salvar
            </button>
          </form>
        </div>

        {showFaseModal.edit && (
          <EditFaseModal fase={selectedFase} onClose={closeFaseModal} />
        )}
        {showFaseModal.delete && (
          <DeleteFaseModal
            fase={selectedFase}
            onClose={closeFaseModal}
          ></DeleteFaseModal>
        )}
        {showFaseModal.create && (
          <CreateFaseModal projetoId={projeto.id} onClose={closeFaseModal} />
        )}
      </ModalContext.Provider>
    </>
  );
}
