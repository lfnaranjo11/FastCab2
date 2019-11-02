import React from "react";
import "./ListaViajes.css";
import { withRouter } from "react-router-dom";

function ListaViajes(props) {
  let handleAccept = viaje => {
    fetch("accept", {
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

    props.history.push({
      pathname: "/servicio",
      param: {}
    });
  };

  return (
    <div className="container">
      {props.viajes.map(viaje => (
        <div className="card shadow" key={viaje._id}>
          <div className="card-body">
            <h4 className="card-title">{viaje.direccion}</h4>
            <button
              className="botonAmarillo"
              onClick={() => handleAccept(viaje)}
            >
              Aceptar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default withRouter(ListaViajes);
