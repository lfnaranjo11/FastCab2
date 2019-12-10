import React from "react";
import "./Bienvenida.css";
import Logo from "./logo.svg";

function Bienvenida(props) {
  /*Sergio Naranjo Aunque esta solución funciona le podría sugerir usar react router para el trabajo de las rutas*/
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
      <div role="navigation"></div>

      <div role="contentinfo"></div>
      <div role="banner">
        <img className="logo" src={Logo} alt="logo" />
        <h1>¡Bienvenido a FastCab!</h1>
      </div>
      <div role="main" className="row justify-content-center">
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
