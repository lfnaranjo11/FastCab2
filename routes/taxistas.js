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
    `¡Tu viaje hacia ${viaje.direccion} ha sido confirmado!

Esta es la información de tu conductor:
Nombre: ${conductor.nombre}
Cedula: ${conductor.cedula}
Placa del carro: ${conductor.placa}
Modelo del carro: ${conductor.carro}`,
    viaje.usuario
  );
  myMongoLib
    .acceptViaje(viaje)
    .then(res.send("ok"))
    .catch(res.send(err));
});

module.exports = router;
