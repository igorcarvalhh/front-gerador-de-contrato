import { useContext, useEffect } from "react";
import FormHeader from "../components/FormHeader";
import Navigation from "../components/Navigation.jsx";
import PageHeader from "../components/PageHeader/PageHeader";
import { ParticipanteContext } from "../context/ParticipanteContext";
import getHeaderData from "../data/pagesData";
import { useState } from "react";
import Loading from "../components/Loading/Loading";
import { useLocation, useParams } from "react-router-dom";
import "../style/GerarContrato.css";
import axios from "axios";
import Header from "../components/Header";

export async function loader() {
  return {};
}

export default function GerarContrato() {
  const [loading, setLoading] = useState(true);
  const headerData = getHeaderData("gerarContrato");
  const useParticipante = useContext(ParticipanteContext);
  const { fetchParticipantes, getExecutoras } = useParticipante();
  const location = useLocation();
  const { hash } = useParams();

  function handleSave(e) {
    e.preventDefault();
    axios
      .get("http://192.168.127.128:3000/gerar-contrato", {
        responseType: "blob",
      })
      .then((response) => {
        window.open(URL.createObjectURL(response.data));
      });
  }

  const fetchData = async () => {
    setLoading(true);
    await fetchParticipantes(hash);
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
      <Header />
      <Navigation />
      <main className="gerar-contrato content__container">
        <PageHeader {...headerData} />
        <div className="mb-3">
          <h3 className="mb-3 text-xl">Número SAP do contrato</h3>
          <input placeholder="Digite o número SAP" className="form-control" />
        </div>

        <h3 className="mb-3 text-xl">Dados bancários</h3>

        {getExecutoras().map((executora) => {
          return (
            <>
              <h3 className="mb-3 text-xl">{executora.empresa.nomeResumido}</h3>
              <div>
                <div className="mb-3">
                  <label className="form-label">Banco</label>
                  <input
                    placeholder="Digite nome do banco"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Agência</label>
                  <input
                    placeholder="Digite a agência"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Conta</label>
                  <input
                    placeholder="Digite o número conta bancária"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Titularidade</label>
                  <input
                    placeholder="Digite nome do titular"
                    className="form-control"
                  />
                </div>
              </div>
            </>
          );
        })}
        <button className="save-btn" onClick={handleSave}>
          Gerar contrato
        </button>
      </main>
    </>
  );
}
