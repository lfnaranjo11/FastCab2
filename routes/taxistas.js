var express = require("express");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
var MyMongoLib = require("../MyMongoLib");
const myWaLib = MyWaLib();
const myMongoLib = MyMongoLib();

router.post("/accept", (req, res) => {
  let viaje = req.body.viaje;
  let conductor = req.body.conductor;
  myWaLib.sendMessage(
    `*¡Tu viaje hacia ${viaje.direccion} ha sido confirmado!*

*Información de tu conductor:*
Nombre: ${conductor.usuario}
Numero: ${conductor.numero}
Cedula: ${conductor.cedula}
Placa del carro: ${conductor.placa}
Modelo del carro: ${conductor.modelo}`,
    viaje.numero
  );
  myMongoLib
    .acceptViaje(viaje)
    .then(res.send("ok"))
    .catch(res.send(err));
});

router.post("/llegue", (req, res) => {
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

router.post("/recoger", (req, res) => {
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

router.post("/terminar", (req, res) => {
  let viaje = req.body.viaje;
  let conductor = req.body.conductor;
  myWaLib.sendMessage(
    `*Viaje Terminado*
¡Gracias por usar FastCab!`,
    viaje.numero
  );
  myMongoLib
    .terminar(viaje)
    .then(res.send("ok"))
    .catch(res.send(err));
});

router.post("/cancelar", (req, res) => {
  let viaje = req.body.viaje;
  let conductor = req.body.conductor;
  myWaLib.sendMessage(
    `*Viaje Cancelado*
El taxista a cancelado tu viaje`,
    viaje.numero
  );
  myMongoLib
    .terminar(viaje)
    .then(res.send("ok"))
    .catch(res.send(err));
});

module.exports = router;
