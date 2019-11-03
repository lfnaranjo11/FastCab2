import React, { useState, useEffect } from "react";
import Bienvenida from "./components/Bienvenida/Bienvenida";
import IniciarSesion from "./components/IniciarSesion/IniciarSesion";
import CrearCuenta from "./components/CrearCuenta/CrearCuenta";
import ListaViajes from "./components/ListaViajes/ListaViajes";
import DetalleServicio from "./components/DetalleServicio/DetalleServicio";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
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

    //pide los viajes nuevos
    fetch("data")
      .then(res => res.json())
      .then(data => {
        if (data.err) {
          console.log(JSON.stringify(data.err));
        } else {
          setViajesNuevos(data);
        }
      });
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={props => (
              <Bienvenida history={props.history} location={props.location} />
            )}
          />
          <Route
            path="/iniciarsesion"
            component={props => (
              <IniciarSesion
                history={props.history}
                location={props.location}
              />
            )}
          />
          <Route
            path="/crearcuenta"
            component={props => (
              <CrearCuenta history={props.history} location={props.location} />
            )}
          />
          <Route
            path="/viajes"
            component={props => (
              <ListaViajes
                viajes={viajesNuevos}
                history={props.history}
                location={props.location}
              />
            )}
          />
          <Route
            path="/servicio"
            component={props => (
              <DetalleServicio
                history={props.history}
                location={props.location}
              />
            )}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
