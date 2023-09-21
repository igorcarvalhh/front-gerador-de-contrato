import Header from "../components/Header";
import Navigation from "../components/Navigation.jsx";

const containerStyle = {
  maxWidth: "610px",
  marginBottom: "120px",
};

export async function loader() {
  return {};
}

export default function Editar() {
  return (
    <>
      <Header />
      <Navigation />
      <main style={containerStyle} className="container"></main>
    </>
  );
}
