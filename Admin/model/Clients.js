const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  Phone: {
    type: Number,
    reuired: true
  },
  companyName: {
    type: String,
    required: true
  }
});

module.exports = Client = mongoose.model("cli", clientSchema);
