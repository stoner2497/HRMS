const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require("../helpers/auth");
const router = express.Router();
require("../models/Leaves");
const Leaves = mongoose.model("leaves");
require("../models/Notice");
const Note = mongoose.model("notice");

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  Leaves.find({}).then(attend => {
    Note.find({}).then(note => {
      res.render("emp/dashboard", {
        attend: attend,
        note: note
      });
    });
  });
});

router.get("/leaves", ensureAuthenticated, (req, res) => {
  res.render("emp/leaves");
});

router.post("/leaves", ensureAuthenticated, (req, res) => {
  const leaves = new Leaves({
    emp: req.emp.id,
    leaveType: req.body.leaveType,
    from: req.body.from,
    to: req.body.to,
    Reason: req.body.Reason,
    status: req.body.status
  });
  //   console.log(leaves);
  leaves
    .save()
    .then(leaves => {
      console.log(leaves);
      res.redirect("emp/dashboard");
    })
    .catch(err => console.log(err));
});

const Pro = require("../models/Projects");

router.get("/projects", ensureAuthenticated, (req, res) => {
  Pro.find({}).then(pro => {
    res.render("emp/projects", {
      pro: pro
    });
  });
});
require("../models/Reviews");
const Rev = mongoose.model("rev");
router.get("/reviews", ensureAuthenticated, (req, res) => {
  Rev.find({ emp: req.user.id }).then(rev => {
    res.render("emp/reviews", {
      rev: rev
    });
  });
});

router.post("/reviews", ensureAuthenticated, (req, res) => {
  const comp = new Rev({
    emp: req.user.id,
    title: req.body.title,
    issue: req.body.issue
  });
  comp.save().then(comp => {
    res.redirect("/emp/reviews");
  });
});

router.delete("/reviews/:id", ensureAuthenticated, (req, res) => {
  Rev.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "idea has been removed ");
    res.redirect("/emp/reviews");
  });
});

module.exports = router;
