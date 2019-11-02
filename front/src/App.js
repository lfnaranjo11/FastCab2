import React, { useState, useEffect } from "react";
import ListaViajes from "./components/ListaViajes/ListaViajes";
import DetalleServicio from "./components/DetalleServicio/DetalleServicio";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [viajesNuevos, setViajesNuevos] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://taxis-whatsapp.herokuapp.com");
    //const ws = new WebSocket("ws://localhost:3001");

    //abre el socket
    ws.onopen = () => {
      console.log("open my ws");
      ws.onmessage = msg => {
        var x = [];

        var x = msg.data;
        setViajesNuevos(JSON.parse(msg.data));
      };
    };

    //pide los viajes nuevos
    fetch("data")
      .then(res => res.json())
      .then(data => {
        if (data.err) {
          setErr(JSON.stringify(data.err));
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
            component={() => <ListaViajes viajes={viajesNuevos} />}
          />
          <Route path="/servicio" component={() => <DetalleServicio />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
