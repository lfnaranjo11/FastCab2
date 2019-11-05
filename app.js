/* Code review de Daniel Ramirez
En general es un buen proyecto, me gusta que trabajaron muy organizadamente y el codigo es facil de entender mientras se va leyendo.
Se nota el esfuerzo y dedicacion que le metieron al proyecto, algo tambien que me gusto es que manejan correctamente las variables de entorno,
algo que en mi proyecto no pudimos desarrollar bien, ya que al momento de desplegar nos causo problemas. Pero en general me parece que el
codigo esta bien manejado y se rige por las epecificaciones del profesor. El diseño en general me parecio muy bueno.
*/

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var taxistas = require("./routes/taxistas");
var wa = require("./routes/twilio");
var auth = require("./routes/authentication");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/taxistas", taxistas);
app.use("/wa", wa);
app.use("/auth", auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
