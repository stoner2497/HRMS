const express = require("express");
const router = express.router();
const Jobs = require("../model/Jobs");

router.get("/carrer", (req, res) => {
  res.render("admin/carrer");
});

router.post("/carrer", (req, res) => {});

module.exports = router;
