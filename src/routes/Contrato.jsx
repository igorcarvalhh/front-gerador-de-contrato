import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation.jsx";

export default function Contrato() {
  return (
    <>
      <Header />
      <Navigation />
      <Outlet />
    </>
  );
}
