import React from "react";
import back from "./flecha.svg";

export default function MisViajes(props) {
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
