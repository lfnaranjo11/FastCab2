import React from "react";
import "./CrearCuenta.css";

function CrearCuenta(props) {
  let handleCrear = () => {
    props.history.push({
      pathname: "/viajes"
    });
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
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingrese una contraseña"
          />
        </div>
        <div className="form-group">
          <label>Verificación de Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Vuelva a ingresar la contraseña"
          />
        </div>
        <div className="form-group">
          <label>Foto de Perfil</label>
          <input type="file" className="form-control-file" />
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
