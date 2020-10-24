const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event must have name']
  },
  startStamp: {
    type: Date,
    required: [true, 'Event must have a starting date']
  },
  endStamp: {
    type: Date,
    required: [true, 'Event must have a starting date']
  },
  color: {
    type: String,
    required: true,
    default: 'blue'
  },
  users: {
    type: [String],
    ref: 'User'
  }
});

module.exports = mongoose.model('Event', schema);