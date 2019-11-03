import React from "react";
import "./IniciarSesion.css";

function IniciarSesion(props) {
  let handleIniciarSesion = () => {
    props.history.push({
      pathname: "/viajes"
    });
  };
  let handleRegresar = () => {
    props.history.goBack();
  };
  return (
    <div className="container">
      <div className="titulo">
        <h1>Iniciar Sesion</h1>
      </div>
      <form>
        <div className="form-group">
          <label>Nombre su Usuario</label>
          <input
            className="form-control"
            placeholder="Ingrese el nombre de usuario"
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingrese su contraseña"
          />
        </div>
      </form>
      <div className="row justify-content-center">
        <button
          className="botonAmarilloChiquito margen"
          onClick={() => handleIniciarSesion()}
        >
          Iniciar Sesion
        </button>
        <button
          className="botonGrisChiquito margen"
          onClick={() => handleRegresar()}
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

export default IniciarSesion;
