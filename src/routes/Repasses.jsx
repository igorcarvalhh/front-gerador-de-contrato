import Navigation from "../components/Navigation.jsx";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import style from "./Repasses.module.css";
import FormHeader from "../components/FormHeader";
import AsyncSelect from "react-select/async";

const containerStyle = {
  maxWidth: "610px",
  marginBottom: "120px",
};

export async function loader() {
  return {};
}

export default function Repasses() {
  return (
    <>
      <NavBar />
      <Navigation />
      <div style={{ maxWidth: "610px", margin: "auto" }}>
        <FormHeader
          title={"Quais são os repasses de cada empresa?"}
          subtitle={
            "Para todas as etapas, defina o valor e a empresa que pagará/receberá cada rubrica referente aos custos do projeto."
          }
        />
      </div>
      <main className={style.main}>
        <div className={style.etapasContainer}>
          <h3 className="mb-3">Etapas</h3>
          <ul className="list-group">
            <li className="list-group-item">PD-07130-0047/2022</li>
            <li className="list-group-item">Etapa 01</li>
            <li className="list-group-item">Etapa 02</li>
            <li className="list-group-item">Etapa 03</li>
            <li className="list-group-item">Etapa 04</li>
            <li className="list-group-item">PD-07130-0047/2022</li>
            <li className="list-group-item">Etapa 01</li>
            <li className="list-group-item">Etapa 02</li>
            <li className="list-group-item">PD-07130-0047/2022</li>
            <li className="list-group-item">Etapa 01</li>
            <li className="list-group-item">Etapa 02</li>
            <li className="list-group-item">Etapa 03</li>
          </ul>
        </div>
        <div className={style.custosContainer}>
          <h3 className="mb-3">Custo interno</h3>
          <div className={style.custosItem}>
            <div className="mb-4">
              <label className="form-label">Valor </label>
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </div>
            </div>

            <div className={style.empresasContainer}>
              <label className="form-label">
                Empresa pagadora e recebedora
              </label>
              <div>
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
              </div>
            </div>
          </div>
          <h3 className="mb-3">Executora A (recebedora)</h3>
          <div className={style.custosItem}>
            <div className="mb-4">
              <label className="form-label">Valor </label>
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </div>
            </div>

            <div className={style.empresasContainer}>
              <label className="form-label">Empresa pagadora</label>
              <div>
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
              </div>
            </div>
          </div>
          <h3 className="mb-3">Executora B (recebedora)</h3>
          <div className={style.custosItem}>
            <div className="mb-4">
              <label className="form-label">Valor </label>
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">RH</InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </div>
            </div>

            <div className={style.empresasContainer}>
              <label className="form-label">Empresa pagadora</label>
              <div>
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
                <AsyncSelect className="mb-3" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
