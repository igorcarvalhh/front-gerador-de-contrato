import { useState } from "react";
import Header from "../components/Header";
import { api } from "../../server/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../authContext";
import useToken from "../useToken";
import { timeout } from "../utils";
// import { useAuthContext } from "../authContext";

const containerStyle = {
  maxWidth: "480px",
  height: "calc(100vh - 56px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
};
// 5700040eafac758327534a8c2caaec95ebc8d02c38e9a8ab617ff87483fe3b1f
export default function ConsultarContrato() {
  const [hash, setHash] = useState();
  const auth = useAuthContext();
  const { token } = useToken();
  const navigate = useNavigate();
  async function handleSubimit() {
    const url = `/auth/validate`;
    const res = api
      .post(url, { hash: hash })
      .then(async (res) => {
        await timeout(2000);
        const { status, data } = res;
        console.log(status);
        if (status === 200) {
          const navURL = `/${hash}/projeto`;
          auth.setToken(data.hash);
          console.log(token);
          navigate(navURL);
        }
      })
      .catch(async (e) => {
        await timeout(2000);
        throw e;
      });
    toast.promise(res, {
      pending: "Verificando HASH",
      error: "Esse HASH não é válido",
      success: "HASH válido",
    });
  }

  return (
    <>
      <Header />
      <div style={containerStyle} class="container">
        <div method="GET" class="form-signin">
          <div class="text-center mb-4">
            <img
              class="d-block mx-auto mb-4"
              src="https://avatars.githubusercontent.com/u/50842644?s=280&v=4"
              alt=""
              width="100"
              height="100"
            />
            <h1 class="h3 mb-3 font-weight-normal">Contratos P,D&I</h1>
          </div>

          <div class="form-label-group mb-3">
            <label for="inputPassword" class="form-label">
              Código do contrato
            </label>
            <input
              name="hash"
              type="text"
              id="inputPassword"
              class="form-control"
              placeholder="Hash do contrato"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              required
            />
          </div>

          <div class="d-grid mb-5">
            <button onClick={handleSubimit} class="btn btn-primary">
              Consultar contrato
            </button>
          </div>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">
          &copy; Taesa 2023 - Todos os direitos reservados.
        </p>
      </div>
    </>
  );
}
