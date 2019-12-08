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
    usuario: user.usuario
  };
  const signature = process.env.SECRET;
  const expiration = "8h";

  return jwt.sign({ data }, signature, { expiresIn: expiration });
};

router.post("/create", (req, res) => {
  let usuario = req.body.usuario;
  let numero = req.body.numero;
  let cedula = req.body.cedula;
  let placa = req.body.placa;
  let modelo = req.body.modelo;
  let foto = req.body.foto;
  let contraseña = req.body.contraseña;
  const salt = randomBytes(32);
  let newUser = {
    usuario: usuario,
    numero: numero,
    cedula: cedula,
    placa: placa,
    modelo: modelo,
    foto: foto
  };
  argon2
    .hash(contraseña, { salt })
    .then(hash => {
      myMongoLib
        .createUser({
          usuario: usuario,
          numero: numero,
          cedula: cedula,
          placa: placa,
          modelo: modelo,
          foto: foto,
          contraseña: hash,
          salt: salt.toString("hex")
        })
        .then(() => {
          let token = generateToken(newUser);
          res.send({ token: token, usuario: newUser });
        })
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
          let usuarioSimple = {
            usuario: userRecord.usuario,
            numero: userRecord.numero,
            placa: userRecord.placa,
            modelo: userRecord.modelo,
            marca: userRecord.marca
          };
          res.send({ token: token, usuario: usuarioSimple });
        })
        .catch(err => res.send({ err: err, msg: "contraseña incorrect" }));
    })
    .catch(err =>
      res.send({ err: err, msg: `El usuario ${usuario} no existe` })
    );
});

module.exports = router;
