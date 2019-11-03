import React from "react";
import "./CrearCuenta.css";

function CrearCuenta(props) {
  let nombre = "";
  let cedula = "";
  let placa = "";
  let modelo = "";
  let foto = "";
  let contraseña = "";

  let handleCrear = () => {
    let newUser = {
      usuario: nombre,
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
          console.log(data);
          props.history.push({
            pathname: "/viajes",
            user: data.usuario,
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
      <div className="titulo2">
        <h1>Crear Cuenta</h1>
      </div>
      <form>
        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input
            className="form-control"
            placeholder="Ingrese un nombre de usuario"
            onChange={e => (nombre = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Cedula</label>
          <input
            className="form-control"
            placeholder="Ingrese su cedula"
            onChange={e => (cedula = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Placa</label>
          <input
            className="form-control"
            placeholder="Ingrese la placa de su vehiculo"
            onChange={e => (placa = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Modelo del Vehiculo</label>
          <input
            className="form-control"
            placeholder="Ingrese el modelo de su vehiculo"
            onChange={e => (modelo = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Foto de Perfil</label>
          <input type="file" className="form-control-file" />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingrese una contraseña"
            onChange={e => (contraseña = e.target.value)}
          />
        </div>
      </form>
      <div className="row justify-content-center">
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
