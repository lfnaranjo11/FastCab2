var express = require("express");
const argon2 = require('argon2');
var router = express.Router();
var MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();

router.post("/create", (req, res) => {
  let usuario = req.body.usuario;
  let contraseña = req.body.contraseña;
  let foto = req.body.foto;
  const salt = randomBytes(32);
  const passwordHashed = await argon2.hash(contraseña, { salt });
  myMongoLib
    .createUser({usuario: usuario, contraseña: passwordHashed, foto: foto, salt: salt.toString('hex')})
    .then(() => res.send({ msg: "Creo un usuario" }))
    .catch(err => res.send({ err: true, msg: err }));
});
