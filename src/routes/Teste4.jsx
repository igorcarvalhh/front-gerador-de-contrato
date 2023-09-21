import { useParams, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Label from "../components/Label/Label";
import Textarea from "../components/Textarea/Textarea";
import axios from "axios";
import FaseList from "../components/FasesList/FaseList";
import FormGroup from "../components/FormGroup/FormGroup";
import PageHeader from "../components/PageHeader/PageHeader";
import getHeaderData from "../data/pagesData";
import "../style/Teste4.css";
import Loading from "../components/Loading/Loading";
import DeleteFaseModal from "../components/Modal/DeleteFaseModal/DeleteFaseModal";
import EditFaseModal from "../components/Modal/EditFaseModal/EditFaseModal";
import { createContext } from "react";
import CreateFaseModal from "../components/Modal/CreateFaseModal/CreateFaseModal";
import { toast } from "react-toastify";
import { ProjetoContext } from "../context/ProjetoContext";
import { FaseContext } from "../context/FaseContext";
import FaseSection from "../components/FaseSection/FaseSection";
import { EtapaContext } from "../context/EtapaContext";
import { EntregavelContext } from "../context/EntregavelContext";
import { ParticipanteContext } from "../context/ParticipanteContext";
import { RepasseContext } from "../context/RepasseContext";
import Select from "react-select";
import Navigation from "../components/Navigation.jsx";
import Header from "../components/Header";

export const ModalContext = createContext(0);
const EmpresasContext = createContext(0);

function RepasseItem({ etapaId, recebedoraId, rubrica, ...props }) {
  const useRepasse = useContext(RepasseContext);
  const { getRepasse, changeRepasseValor, changeEmpresaValor } = useRepasse();
  const empresas = useContext(EmpresasContext);
  const repasse = getRepasse(etapaId, recebedoraId, rubrica);

  const formatAsBRL = (value) => {
    const formattedNumber = Number(value.toFixed(2));
    return formattedNumber.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  function insertPeriodPenultimate(str) {
    if (typeof str !== "string" || str.length < 2) {
      // Handle invalid input
      return str;
    }

    const penultimateIndex = str.length - 2;
    const result =
      str.slice(0, penultimateIndex) + "." + str.slice(penultimateIndex);
    return result;
  }

  const parseBRLToNumber = (formattedValue) => {
    // formattedValue = R$ 0.00
    // R$ 0.00 => 000 => 0.00
    // formattedValue = R$ 0.150
    // R$ 0.150 => 0150 => 01.50 => 1.50
    const removedNonNumbers = formattedValue.replace(/[^0-9]/g, "");
    const newNumber = insertPeriodPenultimate(removedNonNumbers);
    return Number(newNumber);
  };

  function handleChange(e) {
    const lastChar = e.target.value.slice(-1);
    if (!/\d/.test(lastChar)) return 0;
    const value = parseBRLToNumber(e.target.value);
    changeRepasseValor(repasse?.id, value);
  }
  function selectEmpresa(selectedOption) {
    const { id } = selectedOption;
    changeEmpresaValor(repasse?.id, id);
  }
  function selectValue(id) {
    const [empresa] = empresas.filter((empresa) => empresa.value === id);
    if (empresa) return empresa;
    return { value: null, label: "Select..." };
  }

  return (
    <>
      <div className="rubrica">
        <span>{rubrica}</span>
        <input
          className="myInput"
          onChange={handleChange}
          value={formatAsBRL(repasse?.valor)}
          placeholder="R$ 0,00"
        />
      </div>
      <Select
        onChange={selectEmpresa}
        value={selectValue(repasse?.pagadoraId)}
        options={empresas}
      />
    </>
  );
}

export default function Teste4() {
  // states
  const useProjeto = useContext(ProjetoContext);
  const useFase = useContext(FaseContext);
  const useEtapa = useContext(EtapaContext);
  const useEntregavel = useContext(EntregavelContext);
  const useParticipante = useContext(ParticipanteContext);
  const useRepasse = useContext(RepasseContext);

  const { fases, setFases, getFases } = useFase();
  const { projeto, setProjeto, getProjeto } = useProjeto();
  const {
    etapas,
    getEtapasByFaseId,
    fetchEtapas,
    selectedEtapaId,
    setSelectedEtapaId,
  } = useEtapa();
  const { fetchEntregaveis } = useEntregavel();
  const { fetchParticipantes, participantes, getExecutoras } =
    useParticipante();
  const { getRepasse, fetchRepasses, saveRepasses } = useRepasse();
  const [empresas, setEmpresas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedFase, setSelectedFase] = useState({});
  const [isSending, setIsSanding] = useState(false);
  const [wasModified, setWasModified] = useState(false);
  const { hash } = useParams();
  const location = useLocation();
  const headerData = getHeaderData("repasses");
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
    setWasModified(true);
    const newProject = projeto;
    newProject[e.target.name] = e.target.value;
    setProjeto(newProject);
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

  const handleSave = async (e) => {
    e.preventDefault();

    // if (!wasModified) return 0;
    // setIsSanding(true);
    // const { fases, contrato, ...rest } = projeto;

    try {
      const request = saveRepasses;
      toast.promise(request, {
        pending: "Salvando...",
        error: "Erro ao salvar alterações",
        success: "Salvo com sucesso",
      });
      // setWasModified(false);
    } catch (e) {
      console.log("houve um erro ao atualizar");
    }
    // setIsSanding(false);
  };

  // loading data
  const fetchData = async () => {
    setLoading(true);
    await getFases(hash);
    await fetchEtapas(hash);
    await fetchParticipantes(hash);
    await fetchRepasses(hash);
    await axios
      .get("http://192.168.127.128:3000/empresas")
      .then((response) => response.data)
      .then((empresas) => {
        return empresas.map((empresa) => {
          return { ...empresa, value: empresa.id, label: empresa.nome };
        });
      })
      .then((empresas) => setEmpresas(empresas));
    console.log("Primeira etapa");
    console.log(etapas);
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
      <EmpresasContext.Provider value={empresas}>
        <ModalContext.Provider value={{ openFaseModal, addFase, removeFase }}>
          <Header />
          <Navigation />
          <div className="content__container--large">
            <PageHeader {...headerData} />
            <form className="repasses-form">
              <div className="etapas-section">
                <h2 className="text-xl">Etapas</h2>
                <ul className="etapas-list">
                  {fases.map((fase) => {
                    return (
                      <>
                        <li>{fase.codigoAneel}</li>
                        {getEtapasByFaseId(fase.id).map((etapa, index) => (
                          <li
                            className={`etapa-item ${
                              selectedEtapaId === etapa.id ? "selected" : ""
                            }`}
                            onClick={() => {
                              setSelectedEtapaId(etapa.id);
                            }}
                          >
                            Etapa 0{index + 1}
                          </li>
                        ))}
                      </>
                    );
                  })}
                </ul>
              </div>
              <div className="repasses-section">
                <div>
                  <h2 className="text-xl">Custo interno</h2>
                  <div className="repasses-values">
                    <p>Valor</p>
                    <p>Empresa</p>

                    <RepasseItem
                      rubrica={"RH"}
                      etapaId={selectedEtapaId}
                      recebedoraId={null}
                    />
                    <RepasseItem
                      rubrica={"ST"}
                      etapaId={selectedEtapaId}
                      recebedoraId={null}
                    />
                    <RepasseItem
                      rubrica={"MC"}
                      etapaId={selectedEtapaId}
                      recebedoraId={null}
                    />
                    <RepasseItem
                      rubrica={"VD"}
                      etapaId={selectedEtapaId}
                      recebedoraId={null}
                    />
                    <RepasseItem
                      rubrica={"MV"}
                      etapaId={selectedEtapaId}
                      recebedoraId={null}
                    />
                    <RepasseItem
                      rubrica={"OU"}
                      etapaId={selectedEtapaId}
                      recebedoraId={null}
                    />
                  </div>
                </div>

                {getExecutoras().map((participante) => (
                  <div>
                    <h2 className="text-xl">
                      Executora {participante.empresa.nomeResumido} (recebedora)
                    </h2>
                    <div className="repasses-values">
                      <p>Valor</p>
                      <p>Empresa</p>
                      <RepasseItem
                        rubrica={"RH"}
                        etapaId={selectedEtapaId}
                        recebedoraId={participante.empresaId}
                      />
                      <RepasseItem
                        rubrica={"ST"}
                        etapaId={selectedEtapaId}
                        recebedoraId={participante.empresaId}
                      />
                      <RepasseItem
                        rubrica={"MC"}
                        etapaId={selectedEtapaId}
                        recebedoraId={participante.empresaId}
                      />
                      <RepasseItem
                        rubrica={"VD"}
                        etapaId={selectedEtapaId}
                        recebedoraId={participante.empresaId}
                      />
                      <RepasseItem
                        rubrica={"MV"}
                        etapaId={selectedEtapaId}
                        recebedoraId={participante.empresaId}
                      />
                      <RepasseItem
                        rubrica={"OU"}
                        etapaId={selectedEtapaId}
                        recebedoraId={participante.empresaId}
                      />
                    </div>
                  </div>
                ))}
                <button className="save-btn" onClick={handleSave}>
                  Salvar alterações
                </button>
              </div>
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
      </EmpresasContext.Provider>
    </>
  );
}
