var express = require("express");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
var MyMongoLib = require("../MyMongoLib");
const myWaLib = MyWaLib();
const myMongoLib = MyMongoLib();

router.post("/newmessage", (req, res) => {
  const newMessage = req.body.Body;
  let palabras = newMessage.split(" ");
  if (
    palabras[0] === "Recogerme" &&
    palabras[1] &&
    palabras[1] === "en" &&
    palabras[2]
  ) {
    myMongoLib
      .insertDocument({ msg: palabras[2] })
      .then(console.log("nuevo pedido"))
      .catch(err => console.log(err));
    myWaLib.receiveMessage(
      "Estamos buscando un conductor, te avisaremos apenas nos confirmen",
      res
    );
  } else {
    myWaLib.receiveMessage(
      "¡Bienvenido a FastCab!\n Para pedir un taxi porfavor escribe:\n'Recogerme en ' seguido de tu dirección",
      res
    );
  }
});

module.exports = router;
