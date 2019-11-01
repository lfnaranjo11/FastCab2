var express = require("express");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
var MyMongoLib = require("../MyMongoLib");
const myWaLib = MyWaLib();
const myMongoLib = MyMongoLib();

let status = 0;

router.post("/newmessage", (req, res) => {
  const newMessage = req.body.Body;
  myMongoLib
    .insertDocument({ msg: newMessage })
    .then(() => (status = status + 1))
    .catch(err => console.log(err));
  if (status === 0) {
    myWaLib.receiveMessage(newMessage, res);
  } else {
    myWaLib.receiveMessage("coloque su direccion", res);
  }
});

module.exports = router;
