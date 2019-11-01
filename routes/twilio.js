var express = require("express");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
var MyMongoLib = require("../MyMongoLib");
const myWaLib = MyWaLib();
const myMongoLib = MyMongoLib();

router.post("/newmessage", (req, res) => {
  const newMessage = req.body.Body;
  myMongoLib
    .insertDocument({ msg: newMessage })
    .then(() => console.log(newMesage))
    .catch(err => console.log(err));
  myWaLib.receiveMessage(newMessage, res);
});

module.exports = router;
