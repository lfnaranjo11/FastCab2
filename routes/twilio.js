var express = require("express");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
var MyMongoLib = require("../MyMongoLib");
const myWaLib = MyWaLib();
const myMongoLib = MyMongoLib();

router.post("/newmessage", (req, res) => {
  const newMessage = req.body.Body;
  myWaLib.receiveMessage(newMessage, res);
  myMongoLib
    .insertDocument(newMessage)
    .then(() => res.send({ msg: "Inserto" }))
    .catch(err => res.send({ err: true, msg: err }));
});

module.exports = router;
