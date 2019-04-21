const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("emp/");
});

router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "emp/dashboard",
    failureRedirect: "emp/",
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "you are logged out");
  res.redirect("/emp/");
});
module.exports = router;
