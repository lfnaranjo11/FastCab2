import React, { Component } from "react";
import back from "./flecha.svg";
import "./MiPerfil.css";

class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCerrarSesion = () => {
    this.props.history.push({
      pathname: "/"
    });
  };

  goBack = () => {
    this.props.history.push({
      pathname: "/viajes",
      conductor: this.props.location.conductor,
      token: this.props.location.token
    });
  };

  render() {
    return (
      <div>
        <div className="navBar shadow-lg" role="banner">
          <div className="row">
            <img
              onClick={this.goBack}
              onKeyPress={this.goBack}
              className="flechaAtras"
              src={back}
              alt="back icon"
              tabIndex="0"
            />
            <h1 className="tituloMiPerfil">Mi Perfil</h1>
          </div>
        </div>
        <div className="container" role="main">
          <div className="titulo2">
            <h1>{this.props.location.conductor.usuario}</h1>
            <h2>Conductor Registrado</h2>
          </div>
          <br />
          <div>
            <h3>Numero de Whatsapp</h3>
            <label>3132803320</label>
          </div>
          <div>
            <h3>Cedula</h3>
            <label>{this.props.location.conductor.cedula}</label>
          </div>
          <div>
            <h3>Modelo del Vehiculo</h3>
            <label>{this.props.location.conductor.modelo}</label>
          </div>
          <div>
            <h3>Placa</h3>
            <label>{this.props.location.conductor.placa}</label>
          </div>
          <button className="botonAmarillo" onClick={this.handleCerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }
}

export default MiPerfil;
