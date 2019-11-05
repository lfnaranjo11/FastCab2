import React from "react";
import "./NavBar.css";
import icon from "./user.svg";

function NavBar(props) {
  let handleMiPerfil = () => {
    console.log("hola");
    props.history.push({
      pathname: "/miperfil",
      conductor: props.location.conductor,
      token: props.location.token
    });
  };

  return (
    <div className="navBar">
      <img
        onClick={handleMiPerfil}
        onKeyPress={handleMiPerfil}
        className="iconoUser"
        src={icon}
        alt="user icon"
        tabIndex="0"
      />
    </div>
  );
}

export default NavBar;
