import React from "react";
import Bienvenida from "./components/Bienvenida/Bienvenida";
import IniciarSesion from "./components/IniciarSesion/IniciarSesion";
import CrearCuenta from "./components/CrearCuenta/CrearCuenta";
import ListaViajes from "./components/ListaViajes/ListaViajes";
import DetalleServicio from "./components/DetalleServicio/DetalleServicio";
import MiPerfil from "./components/MiPerfil/MiPerfil";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
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
              <ListaViajes history={props.history} location={props.location} />
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
          <Route
            path="/miPerfil"
            component={props => (
              <MiPerfil history={props.history} location={props.location} />
            )}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
