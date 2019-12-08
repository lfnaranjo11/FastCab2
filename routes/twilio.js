var express = require("express");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
var MyMongoLib = require("../MyMongoLib");
const myWaLib = MyWaLib();
const myMongoLib = MyMongoLib();

let clientesEnEspera = {};

router.post("/newmessage", (req, res) => {
  const newMessage = req.body.Body;
  const usuario = req.body.From;
  let palabras = newMessage.split(" ");
  if (
    palabras[0] === "Recogerme" &&
    palabras[1] &&
    palabras[1] === "en" &&
    palabras[2]
  ) {
    let direccion = newMessage.split("Recogerme en ")[1];

    for (i = 3; i < palabras.length; i++) {
      direccion = direccion + " " + palabras[i];
    }
    clientesEnEspera[usuario] = {
      timestamp: new Date().getMilliseconds(),
      direccion: direccion
    };

    let direccion2 = direccion.replace(" ", "%20");

    myWaLib.respondToMessage(
      `¿La dirección en la que quieres que te recojan es *${direccion}*?
Puedes verificarla en el siquiente enlace:
https://pick-me-here.herokuapp.com/?direccion=${direccion2}`,
      res
    );
  } else if (clientesEnEspera[usuario] && newMessage.toLowerCase() === "si") {
    myMongoLib
      .insertDocument({
        direccion: clientesEnEspera[usuario].direccion,
        estado: "en espera",
        numero: usuario,
        usuario: "Mateo Devia"
      })
      .then(console.log("nuevo pedido"))
      .catch(err => console.log(err));
    delete clientesEnEspera[usuario];
    myWaLib.respondToMessage(
      "Estamos buscando conductores disponibles, te avisaremos cuando nos confirmen",
      res
    );
  } else if (clientesEnEspera[usuario] && newMessage.toLowerCase() === "no") {
    clientesEnEspera[usuario].timestamp = new Date().getMilliseconds();
    myWaLib.respondToMessage(
      `Vuelve a ingresar la dirección, escribe:
*Recogerme en* seguido de tu dirección`,
      res
    );
  } else {
    myWaLib.respondToMessage(
      `*¡Bienvenido a FastCab!*

Para pedir un taxi porfavor escribe:
*Recogerme en* seguido de tu dirección`,
      res
    );
  }
});
module.exports = router;
