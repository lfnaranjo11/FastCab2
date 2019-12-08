var express = require("express");
const jwt = require("express-jwt");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
var MyMongoLib = require("../MyMongoLib");
const myWaLib = MyWaLib();
const myMongoLib = MyMongoLib();

let clientesEnEspera = {};

router.post("/newmessage", (req, res) => {
  const newMessage = req.body.Body;
  const usuario = req.body.From;
  if (
    (clientesEnEspera[usuario] &&
      clientesEnEspera[usuario].estado !== "aceptado") ||
    !clientesEnEspera[usuario]
  ) {
    let palabras = newMessage.split(" ");
    if (
      palabras[0] === "Recogerme" &&
      palabras[1] &&
      palabras[1] === "en" &&
      palabras[2]
    ) {
      let direccion = palabras[2];

      for (i = 3; i < palabras.length; i++) {
        direccion = direccion + " " + palabras[i];
      }
      clientesEnEspera[usuario] = {
        timestamp: new Date().getMilliseconds(),
        direccion: direccion,
        estado: "en espera"
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
*Recogerme en* seguido de tu dirección ${usuario}`,
        res
      );
    }
  } else {
    myWaLib.respondToMessage(
      `Tu conductor va en camino, si tienes dudas, usa el siguiente link para contactarle
      https://wa.me/57${clientesEnEspera[usuario].conductor}?text=Hola`,
      res
    );
  }
});

router.post("/accept", jwt({ secret: process.env.SECRET }), (req, res) => {
  let viaje = req.body.viaje;
  let conductor = req.body.conductor;
  myWaLib.sendMessage(
    `*¡Tu viaje hacia ${viaje.direccion} ha sido confirmado!*

*Información de tu conductor:*
Nombre: ${conductor.usuario}
Numero: ${conductor.numero}
Placa del carro: ${conductor.placa}
Modelo del carro: ${conductor.modelo}
Marca del carro: ${conductor.marca}`,
    viaje.numero
  );
  myMongoLib
    .acceptViaje(viaje, conductor.usuario)
    .then(res.send("ok"))
    .catch(res.send(err));
  clientesEnEspera[viaje.numero].estado = "confirmado";
  clientesEnEspera[viaje.numero].conductor = conductor.numero;
});

router.post("/llegue", jwt({ secret: process.env.SECRET }), (req, res) => {
  let viaje = req.body.viaje;
  let conductor = req.body.conductor;
  myWaLib.sendMessage(
    `*¡Tu conductor ha llegado!*
Por favor ve al punto de encuentro`,
    viaje.numero
  );
  myMongoLib
    .llegue(viaje)
    .then(res.send("ok"))
    .catch(res.send(err));
});

router.post("/recoger", jwt({ secret: process.env.SECRET }), (req, res) => {
  let viaje = req.body.viaje;
  let conductor = req.body.conductor;
  myWaLib.sendMessage(
    `*Vas en el taxi correcto*
¡Buen viaje!`,
    viaje.numero
  );
  myMongoLib
    .recoger(viaje)
    .then(res.send("ok"))
    .catch(res.send(err));
});

router.post("/terminar", jwt({ secret: process.env.SECRET }), (req, res) => {
  let viaje = req.body.viaje;
  let conductor = req.body.conductor;
  myWaLib.sendMessage(
    `*Viaje Terminado*
¡Gracias por usar FastCab!`,
    viaje.numero
  );
  myMongoLib
    .terminar(viaje, conductor.usuario)
    .then(res.send("ok"))
    .catch(res.send(err));
});

router.post("/cancelar", jwt({ secret: process.env.SECRET }), (req, res) => {
  let viaje = req.body.viaje;
  let conductor = req.body.conductor;
  myWaLib.sendMessage(
    `*Viaje Cancelado*
El taxista a cancelado tu viaje`,
    viaje.numero
  );
  myMongoLib
    .cancelar(viaje, conductor.usuario)
    .then(res.send("ok"))
    .catch(res.send(err));
});

router.post("/misviajes", jwt({ secret: process.env.SECRET }), (req, res) => {
  let conductor = req.body.conductor;
  myMongoLib
    .getViajesAceptados(conductor)
    .then(docs => {
      res.send(docs);
    })
    .catch(err =>
      res.send({ err: err, msg: "error al obtener los datos de la bd" })
    );
});

router.post("/position", jwt({ secret: process.env.SECRET }), (req, res) => {
  let lat = req.body.lat;
  let lon = req.body.lon;
  let conductor = req.body.conductor;
  myMongoLib
    .updateLocation(conductor, lat, lon)
    .then(res.send("ok"))
    .catch(err =>
      res.send({ err: err, msg: "error al actualizar la ubicacion" })
    );
});

module.exports = router;
