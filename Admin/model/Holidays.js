const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holiSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  holidayDate: {
    type: Date
  }
});

module.exports = Holiday = mongoose.model("holi", holiSchema);
