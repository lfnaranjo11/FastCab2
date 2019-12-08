var express = require("express");
const jwt = require("express-jwt");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
var MyMongoLib = require("../MyMongoLib");
const myWaLib = MyWaLib();
const myMongoLib = MyMongoLib();

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
