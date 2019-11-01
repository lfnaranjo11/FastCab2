var express = require("express");
var router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;

router.post("/newmessage", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Buenaaas");
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
  res.send("OK");
});

module.exports = router;
