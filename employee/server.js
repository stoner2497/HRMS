const express = require("express");
const exhb = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//
mongoose.Promise = global.Promise;
//connect to mongoose

//local
app.use("/public", express.static(path.join("./public")));

const keys = require("./config/keys").mongoURI;

mongoose
  .connect(keys, { useNewUrlParser: true })
  .then(() => console.log(`mongodb connected`));
const port = process.env.PORT || 5000;

//path

//passport config

require("./config/passport")(passport);

//setting middleware
app.engine(
  "handlebars",
  exhb({
    defaultLayout: "main"
  })
);
app.set("views", "./views");
app.set("view engine", "handlebars");
//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//Express ssions midleware
app.use(
  session({
    secret: "Stonned",
    resave: true,
    saveUninitialized: true
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//flash middleware
app.use(flash());
//global variable
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
const service = require("./routes/empservice");
const Emp = require("./routes/emp");
app.use("/emp", Emp, service);

app.listen(port, () => {
  console.log(`the server is runing on this ${port} shit...!!!`);
});
