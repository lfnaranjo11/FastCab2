import React, { Component } from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import "./DetalleServicio.css";
import userImage from "./user.svg";
import whatsappIcon from "./whatsapp.svg";

class DetalleServicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viaje: props.location.viaje
    };
  }

  handleRecoger = viaje => {
    fetch("taxistas/recoger", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({
        viaje: viaje,
        conductor: JSON.stringify({
          nombre: "Francisco Devia",
          cedula: "19431215",
          placa: "RGU-429",
          carro: "Chevrolet Spark"
        })
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.location.token
      }
    })
      .then(res => {})
      .catch(error => console.log("Error:", error));
    let newViaje = { ...this.state.viaje };
    newViaje.estado = "en curso";
    this.setState({ viaje: newViaje });
  };

  handleLlegue = viaje => {
    fetch("taxistas/llegue", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({
        viaje: viaje,
        conductor: JSON.stringify({
          nombre: "Francisco Devia",
          cedula: "19431215",
          placa: "RGU-429",
          carro: "Chevrolet Spark"
        })
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.location.token
      }
    })
      .then(res => {})
      .catch(error => console.log("Error:", error));
    let newViaje = { ...this.state.viaje };
    newViaje.estado = "esperando";
    this.setState({ viaje: newViaje });
  };

  handleTerminar = viaje => {
    fetch("taxistas/terminar", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({
        viaje: viaje,
        conductor: JSON.stringify({
          nombre: "Francisco Devia",
          cedula: "19431215",
          placa: "RGU-429",
          carro: "Chevrolet Spark"
        })
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.location.token
      }
    })
      .then(res => {})
      .catch(error => console.log("Error:", error));
    let newViaje = { ...this.state.viaje };
    newViaje.estado = "terminado";
    this.setState({ viaje: newViaje });
    this.props.history.push({
      pathname: "/viajes",
      conductor: this.props.location.conductor,
      token: this.props.location.token
    });
  };

  handleCancelar = viaje => {
    fetch("taxistas/cancelar", {
      method: "POST",
      body: JSON.stringify({
        viaje: viaje,
        conductor: this.props.location.conductor
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.location.token
      }
    })
      .then(res => {})
      .catch(error => console.log("Error:", error));
    let newViaje = { ...this.state.viaje };
    newViaje.estado = "cancelado";
    this.setState({ viaje: newViaje });
    this.props.history.push({
      pathname: "/viajes",
      conductor: this.props.location.conductor,
      token: this.props.location.token
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row" role="banner">
          <img className="fotoUsuario" src={userImage} alt="user icon" />
          <h1 className="nombreUsuario">
            {this.state.viaje.numero.split(":")[1]}
          </h1>
        </div>
        <div role="main">
          <h2>{this.state.viaje.direccion}</h2>
          <GoogleMap
            lat={5.6984895}
            lon={-74.03693240000001}
            direccion={this.state.viaje.direccion}
          />

          <a
            href={
              "https://wa.me/" + this.state.viaje.numero.split("whatsapp:+")[1]
            }
          >
            <div className="row">
              <div className="circuloverde">
                <img
                  className="iconoWhatsapp"
                  src={whatsappIcon}
                  alt="user icon"
                />
              </div>
              <p className="textoBoton">Enviar mensaje a Whatsapp</p>
            </div>
          </a>
          {this.state.viaje.estado === "confirmado" && (
            <button
              className="botonAmarillo margenAbajo"
              onClick={() => this.handleLlegue(this.state.viaje)}
            >
              Ya llegué
            </button>
          )}
          {this.state.viaje.estado === "esperando" && (
            <button
              className="botonAmarillo margenAbajo"
              onClick={() => this.handleRecoger(this.state.viaje)}
            >
              Ya recogí al usuario
            </button>
          )}
          {this.state.viaje.estado === "en curso" && (
            <button
              className="botonAmarillo margenAbajo"
              onClick={() => this.handleTerminar(this.state.viaje)}
            >
              Terminar Recorrido
            </button>
          )}
          <button
            className="botonGris margenAbajo"
            onClick={() => this.handleCancelar(this.state.viaje)}
          >
            Cancelar Viaje
          </button>
        </div>
      </div>
    );
  }
}

export default DetalleServicio;
