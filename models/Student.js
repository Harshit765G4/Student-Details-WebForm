const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
   name: String,
   contact: String,
   gender: String,
   course: String,
   address: String,
   state: String,
   district: String,
   createdAt: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model("Student", studentSchema);
