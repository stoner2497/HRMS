const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leavesSchema = new Schema({
  leaveType: {
    type: String,
    required: true
  },
  from: {
    type: Date
  },
  to: {
    type: Date
  },
  Reason: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("leaves", leavesSchema);
