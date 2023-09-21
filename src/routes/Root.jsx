import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../authContext";

import useToken from "../useToken";
import { useState } from "react";
import { api } from "../../server/api";
import { toast } from "react-toastify";
import Header from "../components/Header";

const containerStyle = {
  maxWidth: "480px",
  height: "calc(100vh - 56px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
};

export default function Root() {
  const [hash, setHash] = useState("");
  const auth = useAuthContext();
  const { token } = useToken();
  const navigate = useNavigate();

  async function handleClick() {
    console.log("entrou");
    const url = `/contrato`;
    const res = await api
      .post(url, {})
      .then((res) => {
        const { status, data } = res;
        console.log(status);
        if ((status === 200) & (data.status === "ABERTO")) {
          const navURL = `/projeto`;
          auth.setToken(data.hash);
          setHash(data.hash);
          navigate(navURL);
          toast.success(`Contrato criado com sucesso\n HASH: ${data.hash}`, {
            closeOnClick: false,
            draggable: false,
            autoClose: false,
          });
        }
      })
      .catch((e) => {
        throw e;
      });
  }
  return (
    <>
      <Header />
      <div style={containerStyle} className="container">
        <div className="form-signin">
          <div className="text-center mb-4">
            <img
              className="d-block mx-auto mb-4"
              src="https://avatars.githubusercontent.com/u/50842644?s=280&v=4"
              alt=""
              width="100"
              height="100"
            />
            <h1 className="h3 mb-5 font-weight-normal">Contratos P,D&I</h1>
          </div>

          <div className="row g-3">
            <div className="col">
              <div className="d-grid gap-2">
                <button onClick={handleClick} className="btn btn-primary">
                  Criar novo contrato
                </button>
              </div>
            </div>
            <div className="col">
              <div className="d-grid gap-2">
                <a
                  href="/consultar-contrato"
                  className="btn btn-outline-primary"
                >
                  Consultar contrato
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 mb-3 text-muted text-center">
          &copy; Taesa 2023 - Todos os direitos reservados.
        </p>
      </div>
    </>
  );
}
