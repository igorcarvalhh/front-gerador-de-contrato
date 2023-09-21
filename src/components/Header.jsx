import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary px-3"
    >
      <Navbar.Brand href="/">Contratos P,D&I</Navbar.Brand>
    </Navbar>
  );
}
