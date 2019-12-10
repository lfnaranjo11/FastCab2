import React from "react";
import "./CrearCuenta.css";

function CrearCuenta(props) {
  //no seria mejor hacer un componente controlado desde el state?
  let nombre = "";
  let numero = "";
  let cedula = "";
  let placa = "";
  let modelo = "";
  let foto = "";
  let contraseña = "";

  let handleCrear = () => {
    let newUser = {
      usuario: nombre,
      numero: numero,
      cedula: cedula,
      placa: placa,
      modelo: modelo,
      foto: foto,
      contraseña: contraseña
    };

    fetch("auth/create", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        res.json().then(data => {
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
      <div role="contentinfo"></div>

      <div role="banner" className="titulo2">
        <h1>Crear Cuenta</h1>
      </div>
      <div role="main">
        <form>
          <div className="form-group">
            <label className="label">
              Nombre de Usuario
              <input
                className="form-control"
                placeholder="Ingrese un nombre de usuario"
                onChange={e => (nombre = e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="label">
              Numero de Whatsapp
              <input
                className="form-control"
                placeholder="Ingrese su numero de Whatsapp"
                onChange={e => (numero = e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="label">
              Cedula
              <input
                className="form-control"
                placeholder="Ingrese su cedula"
                onChange={e => (cedula = e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="label">
              Placa
              <input
                className="form-control"
                placeholder="Ingrese la placa de su vehiculo"
                onChange={e => (placa = e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="label">
              Modelo del Vehiculo
              <input
                className="form-control"
                placeholder="Ingrese el modelo de su vehiculo"
                onChange={e => (modelo = e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="label">
              Contraseña
              <input
                type="password"
                className="form-control"
                placeholder="Ingrese una contraseña"
                onChange={e => (contraseña = e.target.value)}
              />
            </label>
          </div>
        </form>
      </div>
      <div className="row justify-content-center" role="navigation">
        <button
          className="botonAmarilloChiquito margen"
          onClick={() => handleCrear()}
        >
          Crear Cuenta
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

export default CrearCuenta;
