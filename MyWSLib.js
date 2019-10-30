const WebSocket = require("WS");
const MyWsLib = function() {
  const MyWsLib = this || {};
  const clients = [];
  MyWsLib.setUpWS = server => {
    const wss = new WebSocket.Server({ server });
    console.log("setting up web socket ");
    wss.on("connection", ws => {
      console.log("acepting connection");
      //ws.send("hola");
      clients.push(ws);
    });
  };
  MyWsLib.notifyAll = data => {
    for (let ws of clients) {
      ws.send(data);
    }
  };
  return MyWsLib;
};

module.exports = MyWsLib;