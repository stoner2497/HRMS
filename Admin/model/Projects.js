const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proSchema = new Schema({
  projectName: {
    type: String,
    required: true
  },
  client: {
    type: String
  },
  Rate: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  projectLeader: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Pro = mongoose.model("project", proSchema);
