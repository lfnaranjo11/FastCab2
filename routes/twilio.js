var express = require("express");
var router = express.Router();
var MyWaLib = require("../MyWaLib");
const myWaLib = MyWaLib();

router.post("/newmessage", (req, res) => {
  const newMessage = req.body.Body;
  /**
  const twiml = new MessagingResponse();
  twiml.message("Bienvenido " + newMessage);
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
  */
  myWaLib.receiveMessage(newMessage);
});

module.exports = router;
