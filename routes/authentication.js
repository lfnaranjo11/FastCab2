const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const randomBytes = require("randombytes");
const router = express.Router();
const MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();

let generateToken = user => {
  const data = {
    _id: user._id,
    name: user.usuario
  };
  const signature = "proyectoWeb4";
  const expiration = "6h";

  return jwt.sign({ data }, signature, { expiresIn: expiration });
};

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
        .verify(userRecord.contraseña, contraseña)
        .then(argon2Match => {
          if (!argon2Match) {
            res.send("Credenciales invalidas");
          }
          let token = generateToken(userRecord);
          res.send(token);
        })
        .catch(err => res.send({ err: err, msg: "contraseña incorrect" }));
    })
    .catch(err =>
      res.send({ err: err, msg: `El usuario ${usuario} no existe` })
    );
});

module.exports = router;
