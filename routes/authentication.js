const express = require("express");
const argon2 = require("argon2");
const randomBytes = require("randombytes");
const router = express.Router();
const MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();

router.post("/create", (req, res) => {
  let usuario = req.body.usuario;
  let contraseña = req.body.contraseña;
  let foto = req.body.foto;
  const salt = randomBytes(32);
  argon2
    .hash(contraseña, { salt })
    .then(hash => {
      myMongoLib
        .createUser({
          usuario: usuario,
          contraseña: hash,
          foto: foto,
          salt: salt.toString("hex")
        })
        .then(() => res.send("Creo al usuario"))
        .catch(err =>
          res.send({ err: err, msg: "error al insertar en la bd" })
        );
    })
    .catch(err => res.send({ err: err, msg: "error al hacer el hash" }));
});

module.exports = router;
