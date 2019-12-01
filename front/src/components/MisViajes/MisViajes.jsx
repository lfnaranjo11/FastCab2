import React, { useState, useEffect } from "react";
import back from "./flecha.svg";

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
          console.log(misViajes);
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
    </React.Fragment>
  );
}
