import React, { useState, useEffect } from "react";
import back from "./flecha.svg";
import "./MisViajes.css";

export default function MisViajes(props) {
  const [misViajes, setMisViajes] = useState([]);

  useEffect(() => {
    fetch("taxistas/misviajes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.location.token
      },
      body: JSON.stringify({ conductor: "Mateo" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.err) {
          console.log(JSON.stringify(data.err));
        } else {
          console.log(data);
          setMisViajes(data);
        }
      });
  }, []);

  let goBack = () => {
    props.history.push({
      pathname: "/viajes",
      conductor: props.location.conductor,
      token: props.location.token
    });
  };
  return (
    <React.Fragment>
      <div className="fixed-top">
        <div className="navBar shadow-lg" role="banner">
          <div className="row">
            <img
              onClick={goBack}
              className="flechaAtras"
              src={back}
              alt="back icon"
              tabIndex="0"
            />
            <h1 className="tituloMiPerfil">Mis Viajes</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="contenedorMisViajes" role="main">
          {misViajes.map(viaje => (
            <div className="card shadow miViaje" key={viaje._id}>
              <div className="card-body">
                <h3 className="card-title">{viaje.ubicacion}</h3>
                <div className="container-fluid">
                  <div className="row">
                    <p className="titu">Fecha: </p>
                    <p> {viaje.fecha}</p>
                  </div>
                  <div className="row">
                    <p className="titu">Usuario: </p>
                    <p> {viaje.usuario.split(":")[1]}</p>
                  </div>
                </div>
                {viaje.estado === "terminado" && (
                  <div className="terminadoTag">{viaje.estado}</div>
                )}
                {viaje.estado === "cancelado" && (
                  <div className="canceladoTag">{viaje.estado}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
