import React from "react";
import "./IniciarSesion.css";

function IniciarSesion(props) {
  let nombre = "";
  let contraseña = "";
  let handleIniciarSesion = () => {
    let newUser = {
      usuario: nombre,
      contraseña: contraseña
    };

    fetch("auth/login", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        res.json().then(data => {
          console.log(data);
          if (data.msg) {
            alert("Credenciales Invalidas");
            return;
          }
          props.history.push({
            pathname: "/viajes",
            conductor: data.usuario,
            token: data.token
          });
        });
      })
      .catch(error => console.log("Error:", error));
  };
  let handleRegresar = () => {
    props.history.goBack();
  };
  return (
    <div className="container">
      <div role="navigation"></div>
      <div className="titulo" role="banner">
        <h1>Iniciar Sesion</h1>
      </div>
      <div role="main">
        <form>
          <div className="form-group">
            <label className="label">
              Nombre su Usuario
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el nombre de usuario"
                onChange={e => (nombre = e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="label">
              Contraseña
              <input
                type="password"
                className="form-control"
                placeholder="Ingrese su contraseña"
                onChange={e => (contraseña = e.target.value)}
              />
            </label>
          </div>
        </form>
      </div>
      <div className="row justify-content-center" role="contentinfo">
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
