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

router.post("/login", (req, res) => {
  let usuario = req.body.usuario;
  let contraseña = req.body.contraseña;
  myMongoLib
    .findUser({
      usuario: usuario,
      contraseña: contraseña
    })
    .then(userRecord => {
      argon2
        .verify(
          "1$q6qAjPTQYf3oe2bz7XjaoupNrSEG4UVZuKHJ3QSNIi0$6s8+96j/tyyGqMIsoe/QMU/plg4mWcA1z3FWeNSe6o0",
          contraseña
        )
        .then(argon2Match => {
          res.send(argon2Match);
        })
        .catch(error => res.send("contraseña incorrecta"));
    })
    .catch(err =>
      res.send({ err: err, msg: `El usuario ${usuario} no existe` })
    );
});

module.exports = router;
