import React from "react";
import "./Bienvenida.css";
import Logo from "./logo.svg";

function Bienvenida(props) {
  let handleIniciarSesion = () => {
    props.history.push({
      pathname: "/iniciarsesion"
    });
  };
  let handleRegistrarse = () => {
    props.history.push({
      pathname: "/crearcuenta"
    });
  };
  return (
    <div className="centerPage container">
      <img className="logo" src={Logo} alt="logo" />
      <h1>¡Bienvenido a FastCab!</h1>
      <div className="row justify-content-center">
        <button
          className="botonAmarilloChiquito margen"
          onClick={() => handleIniciarSesion()}
        >
          Iniciar Sesion
        </button>
        <button
          className="botonGrisChiquito margen"
          onClick={() => handleRegistrarse()}
        >
          Crear Cuenta
        </button>
      </div>
    </div>
  );
}

export default Bienvenida;
