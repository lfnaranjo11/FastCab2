var express = require("express");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
var MyMongoLib = require("../MyMongoLib");
const myWaLib = MyWaLib();
const myMongoLib = MyMongoLib();

router.post("/accept", (req, res) => {
  let viaje = req.body.viaje;
  myWaLib.sendMessage("!Viaje Confirmado!", viaje.usuario);
  myMongoLib
    .acceptViaje(viaje)
    .then(res.send("ok"))
    .catch(res.send(err));
});

module.exports = router;
