const WebSocket = require("WS");
const MyWsLib = function() {
  const MyWsLib = this || {};
  MyWsLib.setUpWS = server => {
    const wss = new WebSocket.Server({ server });
    console.log("setting up web socket ");
    wss.on("connection", ws => {
      console.log("acepting connection");
      ws.send("hola");
    });
  };
  return MyWsLib;
};

module.exports = MyWsLib;
