import React, { useState } from "react";
import "./NavBar.css";
import icon from "./user.svg";

function NavBar(props) {
  let [isOpen, setOpen] = useState(false);
  let [selected, setSelected] = useState("");

  let goToMisViajes = () => {
    props.history.push({
      pathname: "/misViajes",
      conductor: props.location.conductor,
      token: props.location.token
    });
  };

  let handleMiPerfil = () => {
    props.history.push({
      pathname: "/miperfil",
      conductor: props.location.conductor,
      token: props.location.token
    });
  };

  let handleHamburgerClick = () => {
    setOpen(!isOpen);
  };

  let titulos = [
    {
      nombre: "Mis Viajes",
      accion: goToMisViajes
    }
  ];

  return (
    <div className="fixed-top">
      <div className="navBar shadow-lg" role="banner">
        <div className="d-flex justify-content-between">
          <button className="hamburguer" onClick={handleHamburgerClick}>
            ☰
          </button>
          <h1 className="fastCab">FastCab</h1>
          <img
            onClick={handleMiPerfil}
            className="iconoUser"
            src={icon}
            alt="user icon"
            tabIndex="0"
          />
        </div>
      </div>
      <nav>
        {isOpen && (
          <ul className="titulosVertical">
            {titulos.map(titulo => {
              if (selected !== titulo.nombre) {
                return (
                  <li
                    className="tituloHam"
                    key={titulo.nombre}
                    onClick={titulo.accion}
                  >
                    {titulo.nombre}
                  </li>
                );
              }
            })}
          </ul>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
