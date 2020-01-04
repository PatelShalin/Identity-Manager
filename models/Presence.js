const mongoose = require('mongoose');

const PresenceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  address: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'Personal'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('presence', PresenceSchema);
