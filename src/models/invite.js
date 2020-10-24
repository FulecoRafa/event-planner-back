const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  event: {
    type: String,
    ref: 'Event'
  }
})

module.exports = mongoose.model('Invite', schema)