const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

require("../model/Admin");
const Admin = mongoose.model("admin");

router.get("/", (req, res) => {
  res.render("admin/");
});

router.post("/", async (req, res, next) => {
  passport.authenticate("admin", {
    successRedirect: "dash",
    failureRedirect: "/",
    failureFlash: true
  })(req, res, next);
});

router.get("/register", (req, res) => {
  res.render("admin/register");
});

router.post("/register", (req, res) => {
  let regex = /^[a-zA-Z]+$/;
  let errors = [];
  if (regex.test(req.body.firstname) === false) {
    errors.push({ text: "please enter correct name" });
  }
  if (regex.test(req.body.lastname) === false) {
    errors.push({ text: "please enter correct name" });
  } else {
    Admin.findOne({ email: req.body.email }).then(admin => {
      if (admin) {
        req.flash("error_msg", "user exist");
      } else {
        const admin = new Admin({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) throw err;
            admin.password = hash;
            admin.save().then(() => {
              req.flash("success_msg", "Registered successfully");
              res.redirect("/");
            });
            console.log(`registered success`);
          });
        });
      }
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "you are logged out");
  res.redirect("/");
});
module.exports = router;
