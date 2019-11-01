var express = require("express");
var router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;

router.post("/newmessage", (req, res) => {
  const newMessage = req.body.Body;
  const twiml = new MessagingResponse();
  twiml.message(JSON.stringify(req.body));
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

module.exports = router;
