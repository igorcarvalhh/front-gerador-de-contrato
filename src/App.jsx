// 5700040eafac758327534a8c2caaec95ebc8d02c38e9a8ab617ff87483fe3b1f
import "./App.css";

import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import ConsultarContrato from "./routes/ConsultarContrato";
import Contrato from "./routes/Contrato";

import Projeto from "./routes/Projeto";
import Participantes from "./routes/Participantes";
import Fases from "./routes/Fases";
import Repasses from "./routes/Repasses";
import Editar from "./routes/Editar";
import GerarContrato from "./routes/GerarContrato";
import ErrorPage from "./routes/ErrorPage";
import Teste from "./routes/Teste";

// import bootstrap style
import "bootstrap/dist/css/bootstrap.min.css";
import useToken from "./useToken";
import { AuthProvider } from "./authContext";
import RequireAuth from "./routes/RequireAuth";

import { loader as projetoLoader } from "./routes/Projeto";
import { loader as participantesLoader } from "./routes/Participantes";
import { loader as etapasLoader } from "./routes/Fases";
import { loader as repassesLoader } from "./routes/Repasses";
import { loader as editarLoader } from "./routes/Editar";
import { loader as gerarContratoLoader } from "./routes/GerarContrato";
import Teste2 from "./routes/Teste2";
import Teste3 from "./routes/Teste3";
import { FaseContextProvider } from "./context/FaseContext";
import { ProjetoContextProvider } from "./context/ProjetoContext";
import { EtapaContextProvider } from "./context/EtapaContext";
import { EntregavelContextProvider } from "./context/EntregavelContext";
import Teste4 from "./routes/Teste4";
import { RepasseContextProvider } from "./context/RepasseContext";
import { ParticipanteContextProvider } from "./context/ParticipanteContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/consultar-contrato",
    element: <ConsultarContrato />,
  },
  {
    path: "projeto",
    loader: projetoLoader,
    element: (
      <RequireAuth>
        <Projeto />
      </RequireAuth>
    ),
  },
  {
    path: "/participantes",
    loader: participantesLoader,
    element: <Participantes />,
  },
  {
    path: "fases",
    loader: etapasLoader,
    element: <Fases />,
  },
  {
    path: "repasses",
    loader: repassesLoader,
    element: <Repasses />,
  },
  {
    path: "editar",
    loader: editarLoader,
    element: <Editar />,
  },
  {
    path: "gerar-contrato",
    loader: gerarContratoLoader,
    element: <GerarContrato />,
  },
  {
    path: "/:hash/projeto",
    element: <Teste />,
  },
  {
    path: "/:hash/participantes",
    element: <Teste2 />,
  },
  {
    path: "/:hash/etapas",
    element: <Teste3 />,
  },
  {
    path: "/:hash/repasses",
    element: <Teste4 />,
  },
  {
    path: "/:hash/gerar-contrato",
    element: <GerarContrato />,
  },
  {
    path: "contrato/:id",
    element: <Contrato />,
    children: [],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <FaseContextProvider>
          <ProjetoContextProvider>
            <EtapaContextProvider>
              <EntregavelContextProvider>
                <RepasseContextProvider>
                  <ParticipanteContextProvider>
                    <RouterProvider router={router} />
                    <ToastContainer theme="colored" />
                  </ParticipanteContextProvider>
                </RepasseContextProvider>
              </EntregavelContextProvider>
            </EtapaContextProvider>
          </ProjetoContextProvider>
        </FaseContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
