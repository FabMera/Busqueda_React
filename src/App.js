import { useState } from "react";
import { BaseColaboradores } from "./components/BaseColaboradores";

function App() {
  const [colaborador, setColaborador] = useState("");
  const [correoColaborador, setCorreoColaborador] = useState("");
  const [busqueda, setBusqueda] = useState([{}]);
  const [listaColaborador, setlistaColaborador] = useState(BaseColaboradores);
  const [search, setSearch] = useState("");

  /* onSubmit */
  const sendColaborador = (e) => {
    e.preventDefault();
    setlistaColaborador([
      ...listaColaborador,
      {
        id: crypto.randomUUID(),
        nombre: colaborador,
        correo: correoColaborador,
      },
    ]);
  };

  /* Eventos Onchange in input */

  const nameColaborador = (event) => {
    setColaborador(event.target.value);
  };

  const mailColaborador = (event) => {
    setCorreoColaborador(event.target.value);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    searchColaborador(e.target.value);
  };

  /*------------Filtro por nombre ----------------------*/

  const searchColaborador = (buscar) => {
    const listaFiltrada = listaColaborador.filter((elemento) => {
      if (elemento.nombre.toLowerCase().includes(buscar.toLowerCase())) {
        return elemento;
      }
    });
    setBusqueda(listaFiltrada);
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">Buscador de Colaboradores</a>
          <form className="d-flex">
            <input
              onChange={handleChange}
              className="form-control me-2"
              placeholder="Busca un colaborador"
              value={search}
            ></input>
          </form>
        </div>
      </nav>
      <form onSubmit={sendColaborador}>
        <div className="form-group">
          <label>Nombre del Colaborador:</label>
          <br></br>
          <input
            name="colaborador"
            onChange={nameColaborador}
            className="form-control"
            placeholder="ingrese nombre colaborador"
          />
        </div>
        <div className="form-group">
          <label>Ingrese el correo electronico:</label>
          <input
            onChange={mailColaborador}
            className="form-control"
            placeholder="ingrese correo electronico"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Agregar Colaborador
        </button>
        <hr></hr>
        <ul>
          {listaColaborador.map((ej) => (
            <li key={ej.id}>
              {ej.nombre} {ej.correo}
            </li>
          ))}
        </ul>
        <hr></hr>
        <h3>Resultado de busqueda:</h3>
        {busqueda.map((ele) => (
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>Nombre Colaborador</th>
                <th>Correo Colaborador</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ele.nombre}</td>
                <td>{ele.correo}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </form>
    </div>
  );
}

export default App;
