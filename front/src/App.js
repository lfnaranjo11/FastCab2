import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState("");
  const renderDocs = () => docs.map(d => <div key={d._id}>{d.msg}</div>);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("open my ws");
      ws.onmessage = msg => {
        var x = [];

        var x = msg.data;
        //console.log("IS THIS", msg.data);
        setDocs(JSON.parse(msg.data));
        //JSON.parse(msg.data);
        //setDocs([]);

        //console.log("got ws data", msg.data);
      };
    };
    fetch("data")
      .then(res => res.json())
      .then(data => {
        console.log("got data", data);
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
