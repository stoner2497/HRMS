const Schema = require("mongoose").Schema;

const Jobs = new Schema({
  Name: {
    type: String,
    required: true
  },
  Qualification: {
    type: String,
    required: true
  },
  College: {
    type: String,
    required: true
  },
  Hobbies: {
    type: String
  },
  Contact: {
    type: Number,
    required: true
  },
  Email: {
    type: String,
    required: true
  }
});

module.exports = Jobs = mongoose.model("job", Jobs);
