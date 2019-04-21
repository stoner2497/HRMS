const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const revSchema = new Schema({
  emp: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("rev", revSchema);
