const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//user model
const Emp = require("../models/Employee");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      Emp.findOne({ email: email }).then(emp => {
        if (!emp) {
          console.log("no user");
          return done(null, false, { message: "no user found" });
        }
        bcrypt.compare(password, emp.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, emp);
          } else {
            console.log("incoorect password");
            return done(null, false, { message: "incorrect password" });
          }
        });
      });
    })
  );
  passport.serializeUser((emp, done) => {
    done(null, emp.id);
  });
  passport.deserializeUser((id, done) => {
    Emp.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
