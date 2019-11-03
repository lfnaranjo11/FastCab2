import React from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import "./DetalleServicio.css";
import userImage from "./user.svg";
import whatsappIcon from "./whatsapp.svg";

function DetalleServicio(props) {
  let viaje = props.location.viaje || {
    direccion: "Universidad de los Andes",
    estado: "en curso",
    usuario: "Mateo Devia",
    numero: "whatsapp:+573132803320"
  };
  let handleRecoger = viaje => {
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
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log("Exito", res))
      .catch(error => console.log("Error:", error));
    viaje.estado = "en curso";
  };

  let handleLlegue = viaje => {
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
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log("Exito", res))
      .catch(error => console.log("Error:", error));
    viaje.estado = "esperando";
  };

  let handleTerminar = viaje => {
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
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log("Exito", res))
      .catch(error => console.log("Error:", error));
    viaje.estado = "en curso";
    props.history.goBack();
  };

  let handleCancelar = viaje => {
    fetch("taxistas/cancelar", {
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
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log("Exito", res))
      .catch(error => console.log("Error:", error));
    viaje.estado = "en curso";
    props.history.goBack();
  };

  return (
    <div className="container">
      <div className="row">
        <img className="fotoUsuario" src={userImage} alt="user icon" />
        <h1 className="nombreUsuario">{viaje.usuario}</h1>
      </div>
      <h2>{viaje.direccion}</h2>
      <GoogleMap lat={5.6984895} lon={-74.03693240000001} />
      <a href={"https://wa.me/" + viaje.numero.split("whatsapp:+")[1]}>
        <div className="row">
          <div className="circuloverde">
            <img className="iconoWhatsapp" src={whatsappIcon} alt="user icon" />
          </div>
          <h4 className="textoBoton">Enviar mensaje a Whatsapp</h4>
        </div>
      </a>
      {viaje.estado === "confirmado" && (
        <button
          className="botonAmarillo margen"
          onClick={() => handleLlegue(viaje)}
        >
          Ya llegué
        </button>
      )}
      {viaje.estado === "esperando" && (
        <button
          className="botonAmarillo margen"
          onClick={() => handleRecoger(viaje)}
        >
          Ya recogí al usuario
        </button>
      )}
      {viaje.estado === "en curso" && (
        <button
          className="botonAmarillo margen"
          onClick={() => handleTerminar(viaje)}
        >
          Terminar Recorrido
        </button>
      )}
      <button
        className="botonGris margen"
        onClick={() => handleCancelar(viaje)}
      >
        Cancelar Viaje
      </button>
    </div>
  );
}

export default DetalleServicio;
