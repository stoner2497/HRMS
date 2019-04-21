const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const revSchema = new Schema({});

module.exports = mongoose.model("rev", revSchema);
