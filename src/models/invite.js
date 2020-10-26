const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  event: {
    type: String,
    ref: 'Event',
    required: [true, 'Event must be provided']
  },
  receiver: {
    type: String,
    ref: 'User',
    required: [true, 'Receiver must be provided']
  },
  sender: {
    type: String,
    ref: 'User',
    required: [true, 'Sender must be provided']
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('Invite', schema)