const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpSchema = new Schema({
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
  age: {
    type: Number,
    reuired: true
  },
  Designation: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = Emp = mongoose.model("emp", EmpSchema);
