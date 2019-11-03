import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./ListaViajes.css";

function ListaViajes(props) {
  const [viajesNuevos, setViajesNuevos] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("wss://taxis-whatsapp.herokuapp.com");

    //abre el socket
    ws.onopen = () => {
      console.log("open my ws");
      ws.onmessage = msg => {
        setViajesNuevos(JSON.parse(msg.data));
      };
    };

    fetch("data", {
      headers: {
        Authorization: "Bearer " + props.location.token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.err) {
          console.log(JSON.stringify(data.err));
        } else {
          setViajesNuevos(data);
        }
      });
  }, []);

  let handleAccept = viaje => {
    let bod = JSON.stringify({
      viaje: viaje,
      conductor: props.location.user
    });

    console.log(bod);

    fetch("taxistas/accept", {
      method: "POST", // or 'PUT'
      body: bod,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log("Exito", res))
      .catch(error => console.log("Error:", error));
    viaje.estado = "confirmado";
    props.history.push({
      pathname: "/servicio",
      viaje: viaje,
      conductor: props.location.user
    });
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="container">
        {viajesNuevos.map(viaje => (
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
    </React.Fragment>
  );
}

export default ListaViajes;
