import React from "react";
import "./NavBar.css";
import icon from "./user.svg";

function ListaViajes(props) {
  return (
    <div className="navBar">
      <a href="miPerfil">
        <img className="iconoUser" src={icon} alt="user icon" />
      </a>
    </div>
  );
}

export default ListaViajes;
