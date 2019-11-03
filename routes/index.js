var express = require("express");
const jwt = require("express-jwt");
var router = express.Router();
var MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/data", jwt({ secret: "proyectoWeb4" }), (req, res) => {
  myMongoLib
    .getDocs()
    .then(docs => {
      res.send(req.user);
    })
    .catch(err =>
      res.send({ err: err, msg: "error al obtener los datos de la bd" })
    );
});

router.post("/insert", (req, res) => {
  let body = req.body;
  myMongoLib
    .insertDocument(body)
    .then(() => res.send({ msg: "Inserto" }))
    .catch(err => res.send({ err: true, msg: err }));
});

module.exports = router;
