const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username:{
    type: String,
    trim: true,
    unique: [true, "Username already exists"],
    required: [true, "Username not provided!"]
  },
  passwd:{
    type: String,
    require: [true, "Password not provided!"]
  }
})

module.exports = mongoose.model('User', schema);