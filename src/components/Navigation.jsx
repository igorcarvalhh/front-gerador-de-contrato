import { useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div class="nav-scroller bg-white box-shadow d-flex justify-content-center  ">
      <nav class="nav nav-underline d-flex align-items-center">
        <a
          className={`nav-link ${pathname === "/projeto" ? "active" : ""}`}
          href="./projeto"
        >
          Projeto
        </a>
        <span>&gt;</span>
        <a
          className={`nav-link ${
            pathname === "/participantes" ? "active" : ""
          }`}
          href="./participantes"
        >
          Participantes
        </a>
        <span>&gt;</span>
        <a
          className={`nav-link ${pathname === "/fases" ? "active" : ""}`}
          href="./etapas"
        >
          Fases
        </a>
        <span>&gt;</span>
        <a
          className={`nav-link ${pathname === "/repasses" ? "active" : ""}`}
          href="./repasses"
        >
          Repasses
        </a>
        {/* <span>&gt;</span>
        <a
          className={`nav-link ${pathname === "/editar" ? "active" : ""}`}
          href="/editar"
        >
          Editar
        </a> */}
        <span>&gt;</span>
        <a
          className={`nav-link ${
            pathname === "/gerar-contrato" ? "active" : ""
          }`}
          href="./gerar-contrato"
        >
          Gerar Contrato
        </a>
      </nav>
    </div>
  );
}
