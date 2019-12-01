import React from "react";
import Bienvenida from "./components/Bienvenida/Bienvenida";
import IniciarSesion from "./components/IniciarSesion/IniciarSesion";
import CrearCuenta from "./components/CrearCuenta/CrearCuenta";
import ListaViajes from "./components/ListaViajes/ListaViajes";
import DetalleServicio from "./components/DetalleServicio/DetalleServicio";
import MiPerfil from "./components/MiPerfil/MiPerfil";
import MisViajes from "./components/MisViajes/MisViajes";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
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
          <Route
            path="/misViajes"
            component={props => (
              <MisViajes history={props.history} location={props.location} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
