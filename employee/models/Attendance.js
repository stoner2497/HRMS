const mongoose = require("mongoose ");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  emp: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  logged: {
    type: Boolean,
    default: false
  }
});

module.exports = Attend = mongoose.model("attend", AttendanceSchema);
