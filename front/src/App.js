import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState("");
  const renderDocs = () => docs.map(d => <div key={d._id}>{d.direccion}</div>);
  useEffect(() => {
    //const ws = new WebSocket("wss://taxis-whatsapp.herokuapp.com");
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("open my ws");
      ws.onmessage = msg => {
        var x = [];

        var x = msg.data;
        setDocs(JSON.parse(msg.data));
      };
    };
    fetch("data")
      .then(res => res.json())
      .then(data => {
        if (data.err) {
          setErr(JSON.stringify(data.msg));
        } else {
          setDocs(data);
        }
      });
  }, []);
  return (
    <div className="App">
      <h1>LISTADO DE CARRERAS DISPONIBLES</h1>
      <div>{err}</div>
      {renderDocs()}
    </div>
  );
}

export default App;
