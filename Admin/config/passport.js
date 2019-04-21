const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../model/Employee");
require("../model/Admin");
const Emp = mongoose.model("emp");
const Admin = mongoose.model("admin");

module.exports = passport => {
  passport.use(
    "admin",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      Admin.findOne({ email: email }).then(admin => {
        if (!admin) {
          console.log("user not exist");
          return done(null, false, { message: "No user Found" });
        }
        bcrypt.compare(password, admin.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, admin);
          } else {
            return done(null, false, { message: "password not matched" });
          }
        });
      });
    })
  );

  passport.serializeUser(function(admin, done) {
    done(null, admin.id);
  });

  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
      done(err, admin);
    });
  });
};
